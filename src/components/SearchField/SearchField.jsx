import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#F0F3F5",
  },
  btnOutlined: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
  btnRoot: {
    padding: "3px",
    minWidth: "40px",
  },
  fieldRoot: {
    [`& fieldset`]: {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    },
  },
}));

const SearchField = (props) => {
  const { data, handleChange = () => {} } = props;
  const classes = useStyles();
  return (
    <Box display="flex">
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        name="search"
        value={data}
        onChange={handleChange}
        size="small"
        // className={classes.fieldRoot}
        classes={{ root: classes.fieldRoot }}
      />
      <Button
        variant="outlined"
        // color="default"
        className={classes.btn}
        classes={{ root: classes.btnRoot, outlined: classes.btnOutlined }}
        size="small"
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchField;
