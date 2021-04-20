import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Box, Button, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import { DatePicker } from "@material-ui/pickers";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [focus, setFocus] = React.useState(false);
  function onDatesChange({ startDate, endDate }) {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  function onFocusChange(focusedInput) {
    setFocus(focusedInput);
  }
  return (
    <React.Fragment>
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
        <Box display="block" width="100%">
          <DateRangePicker
            // {...props}
            onDatesChange={onDatesChange}
            onFocusChange={onFocusChange}
            focusedInput={focus}
            startDate={startDate}
            endDate={endDate}
            small={true}
            block={true}
            customArrowIcon={<ArrowForwardIcon />}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default DateRangeIconField;
