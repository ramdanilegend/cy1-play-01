import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListItem,
  Collapse,
  Typography,
  Button,
  Box,
  colors,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {},
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "20px",
  },
  button: {
    color: "ffffff",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    display: "flex",
    flexDirection: "column",
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
      color: theme.palette.secondary.main,
    },
  },
  title: {
    color: "#ffffff",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  text: {
    color: "#ffffff",
  },
}));

const SidebarExpand = (props) => {
  const { openSidebar, title, icon, className, children } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        className={classes.item}
        // disableGutters
        key={title}
        onClick={handleClick}
      >
        {openSidebar ? (
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex">
              <ListItemIcon>{props.icon}</ListItemIcon>
              <ListItemText
                primary={props.title}
                className={classes.text}
                classes={{ primary: classes.text }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              {open ? (
                <ExpandLess color="secondary" />
              ) : (
                <ExpandMore color="secondary" />
              )}
            </Box>{" "}
          </Box>
        ) : (
          <ListItemIcon>
            {icon}
            {open ? (
              <ExpandLess color="secondary" />
            ) : (
              <ExpandMore color="secondary" />
            )}
          </ListItemIcon>
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default SidebarExpand;
