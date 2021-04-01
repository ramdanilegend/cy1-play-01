import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Box, Button, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { DatePicker } from "@material-ui/pickers";

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
  fieldRoot: {
    [`& fieldset`]: {
      borderRadius: "0",
    },
  },
  btnOutlinedArrow: {
    borderRadius: 0,
  },
  disabledArrow: {
    background: "#ffffff",
  },
  dateOutline: {
    [`& fieldset`]: {
      borderRadius: 0,
    },
  },
  dateOutline2: {
    [`& fieldset`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

const DateRangeIconField = (props) => {
  const classes = useStyles();
  const { label, icon } = props;
  const [selectedDate, handleDateChange] = React.useState(null);
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
      <DatePicker
        className={classes.datePicker}
        classes={{ root: classes.dateOutline }}
        // label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
        emptyLabel="........"
        inputVariant="outlined"
        size="small"
      />
      <Button
        variant="outlined"
        // color="default"
        disabled
        className={classes.btn}
        classes={{
          root: classes.btnRoot,
          outlined: classes.btnOutlinedArrow,
          disabled: classes.disabledArrow,
        }}
        size="small"
      >
        <ArrowForwardIcon />
      </Button>
      <DatePicker
        className={classes.datePicker}
        classes={{ root: classes.dateOutline2 }}
        // label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
        emptyLabel="........"
        inputVariant="outlined"
        size="small"
      />
    </Box>
  );
};

export default DateRangeIconField;
