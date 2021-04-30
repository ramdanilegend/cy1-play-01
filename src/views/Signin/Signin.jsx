import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img from "assets/img/login-image.jpg";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Redirect } from "react-router-dom";
import auth from "services/AuthService";
import { Formik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Logo from "assets/img/ria.png";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  username: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(3, "Minimal 3 Character")
    .max(30, "Maxsimal 30 Character")
    .required("Required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${img})`,
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "150vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
    },
  },
  titleBox: {
    width: "100%",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "center",
    fontSize: "30px",
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "100vh",
      backgroundColor: "#000000",
      display: "flex",
      justifyContent: "center",
      fontSize: "40px",
    },
  },
  title: {
    paddingTop: "130px",
    color: "#4caf50",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8px",
    },
  },
  titleSub: {
    color: "#ffc107",
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "8px",
    },
  },
  loginBox: {
    width: "100%",
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    // backgroundImage: `url(${img})`,
    [theme.breakpoints.down("md")]: {
      marginTop: "50px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "0",
      alignItems: "center",
      height: "100vh",
    },
  },
  loginCard: {
    width: "300px",
    opacity: "0.8",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "15px",
    filter: "blur(0.06px)",
    padding: "25px",
  },
  btn: {
    display: "flex",
  },
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/analysis-result" {...props} />
));

const Signin = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  if (auth.getCurrentUser()) return <Redirect to="/analysis-result" />;
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <div className={classes.titleBox}>
            <div>
              <div className={classes.title}>
                <img src={Logo} alt="Logo App" width="200" height="auto" />
              </div>
              <div className={classes.titleSub}>CDR Analytic System</div>
            </div>
          </div>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            validationSchema={UserSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await auth.login(values);
                window.location = "/cdr-analytic-system";
                auth.loginWithJwt(response.headers["Authorization"]);
              } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                }
              }
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={classes.loginBox}>
                  <div className={classes.loginCard}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Welcome !
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      marginBottom="20px"
                    >
                      Sign In to You're Account
                    </Box>

                    <TextField
                      id="standard-basic"
                      label="Email"
                      type="text"
                      name="username"
                      placeholder="Input Email"
                      error={errors.username ? true : false}
                      helperText={
                        errors.username && touched.username
                          ? `${errors.username}`
                          : null
                      }
                      value={values.username}
                      onChange={handleChange}
                    />
                    <TextField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      error={errors.password ? true : false}
                      helperText={
                        errors.password && touched.password
                          ? `${errors.password}`
                          : null
                      }
                      variant="standard"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Input Password"
                      label="Password"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.password}
                      fullWidth
                    />

                    {/* <TextField
                      id="standard-basic"
                      label="Password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    /> */}
                    <Box paddingTop="30px"></Box>

                    <Button className={classes.btn} type="submit">
                      Masuk
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
