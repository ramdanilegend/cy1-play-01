import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#F0F3F5",
  },
  btnOutlined: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  },
  btnRoot: {
    padding: "3px",
    minWidth: "40px",
  },
  fieldRoot: {
    [`& fieldset`]: {
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
    },
  },
  disabled: {
    background: "#F0F3F5",
  },
}));

const TextIconField = (props) => {
  const classes = useStyles();
  const { label, icon } = props;
  return (
    <Box display="flex">
      <Button
        variant="outlined"
        // color="default"
        disabled
        className={classes.btn}
        classes={{
          root: classes.btnRoot,
          outlined: classes.btnOutlined,
          disabled: classes.disabled,
        }}
        size="small"
      >
        {icon}
      </Button>
      <TextField
        id="search-input"
        label={label}
        variant="outlined"
        size="small"
        fullWidth
        // className={classes.fieldRoot}
        classes={{ root: classes.fieldRoot }}
      />
    </Box>
  );
};

export default TextIconField;
