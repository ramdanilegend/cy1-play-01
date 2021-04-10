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

const CaseSchema = Yup.object().shape({
  case_name: Yup.string()
    .min(3, "Minimal 3 Character")
    .max(30, "Maxsimal 30 Character")
    .required("Required"),
  letter_number: Yup.string()
    .min(3, "Minimal 3 Character")
    .max(30, "Maxsimal 30 Character")
    .required("Required"),
  // clause_reference: Yup.string().required(),
  description: Yup.string()
    .min(3, "Minimal 3 Character")
    .max(254, "Maxsimal 254 Character")
    .required("Required"),
  // longlat: Yup.string().required(),
  location_address: Yup.string().required(),
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

// const MyInput = () => {
//   return (
//     <Autocomplete
//       value={option}
//       onChange={(event, newValue) => {
//         setOption(newValue);
//       }}
//       inputValue={inputValue}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       id="controllable-states-demo"
//       options={pasals}
//       style={{ width: 300 }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           name="clause_reference"
//           // label="Controllable"
//           variant="outlined"
//         />
//       )}
//     />
//   );
// };

const FormAdd = (props) => {
  const { handleClose } = props;
  const classes = useStyles();
  const alertContext = React.useContext(AlertContext);
  const userContext = React.useContext(CaseContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [option, setOption] = React.useState(pasals[0]);
  // const [inputValue, setInputValue] = React.useState("");
  const [location, setLocation] = React.useState({
    lng: 106.84513,
    lat: -6.21462,
  });
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          ...location,
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        console.log(position.coords.longitude);
      },
      function (error) {
        setLocation({
          lng: 106.84513,
          lat: -6.21462,
        });
      }
    );
  }
  React.useEffect(() => {
    getLocation();
  }, []);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            longlat: `${location.lng},${location.lat}`,
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
                longlat: `${location.lng},${location.lat}`,
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
                  <Box
                    display="flex"
                    flexDirection="column"
                    // justifyContent="space-between"
                    width="100%"
                    height="250px"
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
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label="Controllable"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                  <Box marginTop="10px" />
                  Case Description
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
                    placeholder="Enter Description"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.description}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <Box
                    position="relative"
                    width="100%"
                    height="215px"
                    marginBottom="10px"
                  >
                    <Wrapper apiKey={apiGoogleMap}>
                      <Mapbox lngUser={location.lng} latUser={location.lat} />
                    </Wrapper>
                  </Box>
                  Case Location Address
                  <TextField
                    type="text"
                    name="location_address"
                    variant="outlined"
                    size="small"
                    placeholder="Enter Case Location Address"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.location_address}
                    fullWidth
                  />
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
