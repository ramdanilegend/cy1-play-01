import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import AuthService from "services/AuthService";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  containerTitle: {
    backgroundColor: "#F0F3F5",
    padding: "10px 10px",
  },

  btnCancel: {
    backgroundColor: "#4420D8",
    color: "#FFFFFF",
    minWidth: "110px",
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    width: "100%",
  },
}))(MuiDialogActions);

function AppDialogSessionEnd(props) {
  const { open } = props;
  const classes = useStyles();
  const handleAction = () => {
    AuthService.sessionEnd();
    window.location = "/";
  };
  if (!AuthService.getCurrentUser()) return <Redirect to="/" />;
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={open}>
      <MuiDialogTitle
        id="customized-dialog-title"
        className={classes.containerTitle}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">Session End</Box>
        </Box>
      </MuiDialogTitle>
      <DialogContent>
        <div>
          You already login in another device, please re-login <br />
          if you want still use app in this device !
        </div>
      </DialogContent>
      <DialogActions>
        {/* <Divider /> */}
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          padding="0 10px"
        >
          <Box display="flex">
            <Button
              autoFocus
              onClick={handleAction}
              className={classes.btnCancel}
              color="primary"
              variant="contained"
            >
              Ok
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AppDialogSessionEnd;
