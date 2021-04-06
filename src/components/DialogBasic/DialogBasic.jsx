import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  containerTitle: {
    backgroundColor: "#F0F3F5",
    padding: "10px 10px",
  },
  btnCloseIcon: {
    padding: "2px",
  },
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function AppDialogBasic(props) {
  const { open, handleClose, title, children } = props;
  const classes = useStyles();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <MuiDialogTitle
        id="customized-dialog-title"
        className={classes.containerTitle}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">{title}</Box>
          <Box>
            <IconButton className={classes.btnCloseIcon} onClick={handleClose}>
              <CloseIcon color="action" />
            </IconButton>
          </Box>
        </Box>
      </MuiDialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default AppDialogBasic;
