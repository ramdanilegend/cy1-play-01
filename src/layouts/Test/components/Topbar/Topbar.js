import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Avatar from "@material-ui/core/Avatar";
import Logo from "assets/img/core-ui-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "-1px 2px 3px 1px rgba(199,196,196,0.75)",
    backgroundColor: "#ffffff",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  btnMenu: {
    color: "#2E343A",
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);
  // const [notifications] = useState([]);

  const [openLogout, setOpenLogout] = React.useState(false);

  const handleClickOpen = () => {
    setOpenLogout(true);
  };

  const handleClose = () => {
    setOpenLogout(false);
  };
  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src={Logo} width="100px" height="auto" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleClickOpen}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton onClick={onSidebarOpen}>
            <MenuIcon color="action" />
          </IconButton>
        </Hidden>
        {/* <Dialog
          open={openLogout}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" color="secondary">
            {"Log Out"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Anda Yakin Untuk Keluar Dari Aplikasi ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Tidak
            </Button>
            <RouterLink to="/sign-out/675213hdsbjjsankdig6723">
              <Button onClick={handleClose} color="secondary" autoFocus>
                Ya
              </Button>
            </RouterLink>
          </DialogActions>
        </Dialog> */}
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
