import React from "react";

import CloseIcon from "@material-ui/icons/Close";

import { Box, Dialog, IconButton, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnCloseIcon: {
    padding: "2px",
  },
  container: {
    backgroundColor: "#F0F3F5",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 20px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogFull = (props) => {
  const { title, open, handleClose, children } = props;
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={classes.container}>
        <Box display="flex">{title}</Box>
        <Box>
          <IconButton className={classes.btnCloseIcon} onClick={handleClose}>
            <CloseIcon color="action" />
          </IconButton>
        </Box>
      </div>
      <Box>{children}</Box>
    </Dialog>
  );
};

export default DialogFull;
