import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import contextButton from "context/ButtonNavMainContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
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
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { className, ...rest } = props;

  const btn = React.useContext(contextButton);

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <React.Fragment>
        <ListItem className={classes.item} disableGutters key={props.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={btn.close}
            to={props.href}
          >
            <div className={classes.icon}>{props.icon}</div>
            {props.title}
          </Button>
        </ListItem>
      </React.Fragment>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
