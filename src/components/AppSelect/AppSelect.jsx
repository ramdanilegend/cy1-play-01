import React from "react";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ClassRounded } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  select: {
    backgroundColor: "#20A8D8",
    minWidth: 170,
    borderRadius: "4px",
    ["&:hover"]: {
      backgroundColor: "#2076D8",
    },
  },
  selected: {
    backgroundColor: "#2076D8",
  },
  focus: {
    ["&:focus"]: {
      backgroundColor: "#2076D8",
      borderRadius: "4px",
    },
  },
  white: {
    color: "#ffffff",
  },
}));

const AppSelect = ({
  data,
  value = 0,
  handleChange,
  label,
  name,
  selected = false,
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.margin} variant="filled">
      <InputLabel
        htmlFor="demo-customized-textbox"
        color="primary"
        style={{ color: "#ffffff" }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="select-bootstrap"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disableUnderline
        displayEmpty
        className={clsx(classes.select, { [classes.selected]: selected })}
        classes={{ select: classes.focus, icon: classes.white }}
        inputProps={{ className: classes.white }}
        // input={<BootstrapInput />}
      >
        {data.map((value, index) => (
          <MenuItem value={value.value} key={index}>
            {value.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
