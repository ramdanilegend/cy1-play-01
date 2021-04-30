import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxHeight: 260,
    minHeight: 260,
    border: "1px solid #C8CED3",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
}));

const TableContainer = (props) => {
  const classes = useStyles();
  return <div className={classes.container}>{props.children}</div>;
};

export default TableContainer;
