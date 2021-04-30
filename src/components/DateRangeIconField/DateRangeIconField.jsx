import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Box, Button, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import { DatePicker } from "@material-ui/pickers";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { useFormikContext } from "formik";
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
  const { icon, startId, endId } = props;
  const { values, setFieldValue } = useFormikContext();
  const [focus, setFocus] = React.useState(false);

  function onFocusChange(focusedInput) {
    setFocus(focusedInput);
  }

  const change = ({ startDate, endDate }) => {
    setFieldValue("startDate", startDate);
    setFieldValue("endDate", endDate);
  };
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
            onDatesChange={change}
            onFocusChange={onFocusChange}
            focusedInput={focus}
            startDate={values.startDate}
            endDate={values.endDate}
            small={true}
            block={true}
            startDateId={startId} // PropTypes.string.isRequired,
            endDateId={endId} // PropTypes.string.isRequired,
            minimumNights={0}
            showClearDates={true}
            enableOutsideDays={true}
            isOutsideRange={() => false}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default DateRangeIconField;
