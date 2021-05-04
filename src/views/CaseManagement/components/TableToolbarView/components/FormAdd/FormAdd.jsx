import React from "react";
import { Formik } from "formik";
import {
  Grid,
  TextField,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogActions,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertContext from "context/AlertContext";
import CaseContext from "context/CaseContext";
import Service from "services/CaseService";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as Yup from "yup";
import { Mapbox } from "components";
import { Autocomplete } from "@material-ui/lab";
import { Wrapper } from "@googlemaps/react-wrapper";
import { apiGoogleMap } from "config.json";
import { MapAutocomplete } from "components";

const CaseSchema = Yup.object().shape({
  case_name: Yup.string().max(30, "Maxsimal 30 Character").required("Required"),
  letter_number: Yup.string()
    .max(30, "Maxsimal 30 Character")
    .required("Required"),
  clause_reference: Yup.string().required("required"),
  description: Yup.string()
    .max(254, "Maxsimal 254 Character")
    .required("Required"),
  longlat: Yup.string().required("Required"),
  location_address: Yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
  btnCancel: {
    backgroundColor: "#4420D8",
    color: "#FFFFFF",
    minWidth: "110px",
  },
  btnSave: {
    backgroundColor: "#D82058",
    color: "#FFFFFF",
    minWidth: "110px",
  },
  mapHeader: {
    borderRadius: "4px",
    padding: "0 10px",
    height: "23px",
    display: "flex",
    backgroundColor: "#F0F3F5",
    alignItems: "center",
  },
}));

const pasals = [
  "123 KUHP",
  "111 KUHP (1)",
  "111 KUHP (2)",
  "104 KUHP",
  "108 KUHP (1)",
  "108 KUHP (2)",
  "104 KUHP (1)",
  "104 KUHP (2)",
  "104 KUHP (3)",
  "134 KUHP",
  "466 KUHP",
  "122 KUHP",
  "111bis KUHP (1)",
  "106 KUHP",
  "107 KUHP (1)",
  "107 KUHP (2))",
  "126 KUHP (2))",
];

const FormAdd = (props) => {
  const { handleClose } = props;
  const classes = useStyles();
  const alertContext = React.useContext(AlertContext);
  const userContext = React.useContext(CaseContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [option, setOption] = React.useState(pasals[0]);
  const [dataMap, setDataMap] = React.useState({ value: null });
  const [longLat, setLongLat] = React.useState("long,lat");
  const [options, setOptions] = React.useState([]);
  // const [inputValue, setInputValue] = React.useState("");
  const [location, setLocation] = React.useState({
    lng: 106.84513,
    lat: -6.21462,
  });
  // const { setFieldValue } = useFormikContext();

  const setOptionAuto = (value) => {
    setOptions(value);
  };
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          ...location,
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      function (error) {
        setLocation({
          lng: 106.84513,
          lat: -6.21462,
        });
      }
    );
  }

  const onMapAutocompleteChange = (event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setDataMap({ ...dataMap, value: newValue });
    console.log(newValue);
  };
  const setAutoValue = (newValue) => {
    setDataMap({ ...dataMap, value: newValue });
  };
  React.useEffect(() => {
    getLocation();
  }, []);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const setMapHeader = (value) => {
    setLongLat(value);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" fixed>
        <Formik
          initialValues={{
            case_name: "",
            letter_number: "",
            clause_reference: "",
            description: "",
            longlat: ``,
            location_address: "",
          }}
          validationSchema={CaseSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            try {
              alertContext.updateState(true, false, "success", "");
              await Service.postData(values);
              alertContext.updateState(
                false,
                true,
                "success",
                "Membuat Data berhasil"
              );
            } catch (ex) {
              if (!ex.response) {
                alertContext.updateState(false, true, "error", "Error 404");
                return true;
              }
              alertContext.updateState(false, true, "error", ex.response.data);
            }
            userContext.updateState();
            handleClose();
            resetForm({
              values: {
                case_name: "",
                letter_number: "",
                clause_reference: "",
                description: "",
                longlat: ``,
                location_address: "",
              },
            });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={3}>
                <Grid item md={6} lg={6} xs={12}>
                  <Box marginTop="23px" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    // justifyContent="space-between"
                    width="100%"
                    height="215px"
                  >
                    Case Name
                    <TextField
                      type="text"
                      name="case_name"
                      error={errors.case_name ? true : false}
                      helperText={
                        errors.case_name && touched.case_name
                          ? `${errors.case_name}`
                          : null
                      }
                      variant="outlined"
                      size="small"
                      placeholder="Enter Case Name"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.case_name}
                      fullWidth
                    />
                    <Box marginTop="10px" />
                    Case Letter Number
                    <TextField
                      type="text"
                      name="letter_number"
                      variant="outlined"
                      size="small"
                      error={errors.letter_number ? true : false}
                      helperText={
                        errors.letter_number && touched.letter_number
                          ? `${errors.letter_number}`
                          : null
                      }
                      placeholder="Enter Letter Number"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.letter_number}
                      fullWidth
                    />
                    <Box marginTop="10px" />
                    Case Clause Reference
                    <Box marginTop="6px" />
                    <Autocomplete
                      value={option}
                      onChange={(event, newValue) => {
                        setOption(newValue);
                      }}
                      inputValue={values.clause_reference}
                      onInputChange={(event, newInputValue) => {
                        setFieldValue("clause_reference", newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={pasals}
                      // style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={errors.clause_reference ? true : false}
                          fullWidth
                          // label="Controllable"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                  <Box marginTop="10px" />
                  Case Description
                  <Box marginTop="10px">
                    <TextField
                      type="text"
                      name="description"
                      variant="outlined"
                      size="small"
                      error={errors.description ? true : false}
                      helperText={
                        errors.description && touched.description
                          ? `${errors.description}`
                          : null
                      }
                      multiline
                      rows={5}
                      placeholder="Enter Description"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.description}
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <div className={classes.mapHeader}>{longLat}</div>
                  <Box
                    position="relative"
                    width="100%"
                    height="215px"
                    marginBottom="10px"
                  >
                    <Mapbox
                      setMapHeader={setMapHeader}
                      setAutoValue={setAutoValue}
                      address={dataMap.value ? dataMap.value.description : null}
                    />
                  </Box>
                  Case Location Address
                  <Box marginTop="10px">
                    <MapAutocomplete
                      value={dataMap.value}
                      onMapAutocompleteChange={onMapAutocompleteChange}
                      setOptionAuto={setOptionAuto}
                      options={options}
                    />
                  </Box>
                  {/* <TextField
                    type="text"
                    name="location_address"
                    variant="outlined"
                    size="small"
                    placeholder="Enter Case Location Address"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.location_address}
                    fullWidth
                  /> */}
                </Grid>
              </Grid>
              <Box marginTop="10px" />
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                padding="10px 0"
              >
                <Box display="flex">
                  <Button
                    autoFocus
                    variant="contained"
                    onClick={handleClose}
                    className={classes.btnSave}
                    color="primary"
                  >
                    Back
                  </Button>
                </Box>
                <Box display="flex">
                  <Button
                    type="submit"
                    autoFocus
                    variant="contained"
                    color="primary"
                    className={classes.btnCancel}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default FormAdd;
