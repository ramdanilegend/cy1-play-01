import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import contextButton from "context/ButtonNavMainContext";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    marginLeft: "30px",
    paddingBottom: 0,
  },
  button: {
    color: "#ffffff",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
    backgroundColor: "#3A4248",
  },

  hide: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3A4248",
  },
  toolbarOpen: {
    justifyContent: "flex-end",
  },
  toolbarClose: {
    justifyContent: "center",
  },
  show: {
    display: "flex",
  },
  divider: {
    backgroundColor: "#3A4248",
  },
  text: {
    color: "#ffffff",
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarExpandItem = (props) => {
  const { className, href, icon, title, ...rest } = props;

  const btn = React.useContext(contextButton);

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <React.Fragment>
        <ListItem
          button
          disableGutters
          key={"text"}
          activeClassName={classes.active}
          component={CustomRouterLink}
          // onClick={btn.close}
          to={href}
        >
          <ListItemIcon className={classes.item}>{icon}</ListItemIcon>
          <ListItemText
            primary={title}
            className={classes.text}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      </React.Fragment>
    </List>
  );
};

SidebarExpandItem.propTypes = {
  className: PropTypes.string,
};

export default SidebarExpandItem;
