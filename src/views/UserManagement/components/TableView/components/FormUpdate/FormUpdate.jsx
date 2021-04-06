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
import UserContext from "context/UserContext";
import Service from "services/UserService";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimal 3 Character")
    .max(30, "Maxsimal 30 Character")
    .required("Required"),
  password: Yup.string()
    .min(3, "Minimal 3 Character")
    .max(30, "Maxsimal 30 Character")
    .uppercase("1 Minimal Character Uppercase")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
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

const FormUpdate = (props) => {
  const { handleClose, data } = props;
  const classes = useStyles();
  const alertContext = React.useContext(AlertContext);
  const userContext = React.useContext(UserContext);
  const [showPassword, setShowPassword] = React.useState(false);

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
          initialValues={data}
          validate={(values) => {
            const errors = {};

            return errors;
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // console.log(values);
            // e.preventDefault();
            try {
              alertContext.updateState(true, false, "success", "");
              await Service.putData(values);
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
            // handleClose();
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
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={1}>
                <Grid item md={6} lg={6} xs={12}>
                  Name
                  <TextField
                    type="text"
                    name="name"
                    variant="outlined"
                    size="small"
                    placeholder="Input User Name"
                    onChange={handleChange}
                    error={errors.name ? true : false}
                    helperText={
                      errors.name && touched.name ? `${errors.name}` : null
                    }
                    // onBlur={handleBlur}
                    value={values.name}
                    fullWidth
                  />
                  User Role
                  <TextField
                    type="text"
                    name="id_role"
                    variant="outlined"
                    size="small"
                    select
                    // placeholder="Input User Name"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.id_role}
                    fullWidth
                  >
                    <MenuItem key={1} value={1}>
                      {"Admin"}
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                      {"Guest"}
                    </MenuItem>
                    <MenuItem key={3} value={3}>
                      {"Data Manager"}
                    </MenuItem>
                    <MenuItem key={4} value={4}>
                      {"Analyst"}
                    </MenuItem>
                  </TextField>
                  Email
                  <TextField
                    type="text"
                    name="email"
                    variant="outlined"
                    size="small"
                    error={errors.email ? true : false}
                    helperText={
                      errors.email && touched.email ? `${errors.email}` : null
                    }
                    placeholder="Input User Email"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.email}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  Police Identify Number
                  <TextField
                    type="text"
                    name="pin"
                    variant="outlined"
                    size="small"
                    placeholder="Input Police Identify Number"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.pin}
                    fullWidth
                  />
                  Phone Number
                  <TextField
                    type="text"
                    name="phone_number"
                    variant="outlined"
                    size="small"
                    placeholder="Input Phone Number"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.phone_number}
                    fullWidth
                  />
                  Password
                  <TextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    variant="outlined"
                    size="small"
                    error={errors.password ? true : false}
                    helperText={
                      errors.password && touched.password
                        ? `${errors.password}`
                        : null
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Input Password"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.password}
                    fullWidth
                  />
                </Grid>
              </Grid>

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

export default FormUpdate;
