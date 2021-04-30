import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import RefreshIcon from "@material-ui/icons/Refresh";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import NightsStayIcon from "@material-ui/icons/NightsStay";
// import PopOver from "components/PopOver";
import { lighten, makeStyles } from "@material-ui/core/styles";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),

    backgroundColor: "#F0F3F5",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  title: {
    color: theme.palette.black,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      paddingTop: "10px",
    },
  },
  dense: {
    minHeight: "37px",
  },
  selected: {
    backgroundColor: "#757575",
    padding: "0 5px",
    borderRadius: "0",
    color: "#ffffff",
    ["&:hover"]: {
      color: "#000000",
    },
  },
  non: {
    borderRadius: "0",
  },
}));

function ToolbarView(props) {
  const classes = useToolbarStyles();

  const {
    title,
    dayNight,
    day,
    night,
    selected = { dayNight: true, day: false, night: false },
  } = props;

  return (
    <Toolbar
      className={classes.root}
      classes={{ dense: classes.dense }}
      variant="dense"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex">{title}</Box>
        <Box display="flex">
          <Tooltip title="Filter Day & Night" placement="top">
            <IconButton
              className={selected.dayNight ? classes.selected : classes.none}
              onClick={dayNight}
            >
              <Brightness6Icon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter Day Only" placement="top">
            <IconButton
              onClick={day}
              className={selected.day ? classes.selected : classes.none}
            >
              <Brightness5Icon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter Night Only" placement="top">
            <IconButton
              onClick={night}
              className={selected.night ? classes.selected : classes.none}
            >
              <NightsStayIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  );
}

// ToolbarView.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default ToolbarView;
