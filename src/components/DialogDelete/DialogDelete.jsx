import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    width: "100%",
  },
}))(MuiDialogActions);

function AppDialogDelete(props) {
  const {
    open,
    handleClose,
    icon,
    title,
    text,
    handleDelete = () => {},
  } = props;
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
      <DialogContent>
        <div>{`Are you sure want to delete this ${text} ?`}</div>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          padding="0 10px"
        >
          <Box display="flex">
            <Button
              autoFocus
              onClick={handleClose}
              className={classes.btnCancel}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
          <Box display="flex">
            <Button
              autoFocus
              onClick={handleDelete}
              className={classes.btnSave}
              color="primary"
              variant="contained"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AppDialogDelete;
