import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "15px",
  },
}));

const AppWrapperBody = (props) => {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

export default AppWrapperBody;
