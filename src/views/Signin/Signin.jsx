import React from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img from "assets/img/login-image.jpg";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <div className={classes.titleBox}>
            <div>
              <div className={classes.title}>ark of intelligence</div>
              <div className={classes.titleSub}>CDR Analytic System</div>
            </div>
          </div>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <div className={classes.loginBox}>
            <div className={classes.loginCard}>
              <Box display="flex" alignItems="center" justifyContent="center">
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

              <TextField id="standard-basic" label="Username" />

              <TextField id="standard-basic" label="Password" type="password" />
              <Box paddingTop="30px"></Box>

              <Button className={classes.btn} component={LinkBehavior}>
                Masuk
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
