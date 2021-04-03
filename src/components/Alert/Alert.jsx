import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 6000,
    color: "blue",
  },
  snackbar: {
    zIndex: 6000,
  },
}));

function AlertMUI(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Alert(props) {
  const classes = useStyles();
  const { backdrop, snackbar, updateState, variant, message } = props;

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        className={classes.snackbar}
        open={snackbar}
        autoHideDuration={6000}
        onClose={updateState}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AlertMUI onClose={updateState} severity={variant}>
          {message}
        </AlertMUI>
      </Snackbar>
    </React.Fragment>
  );
}

export default Alert;
