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
}));

function AppTableToolbar(props) {
  const classes = useToolbarStyles();

  const { refresh, title, context, icon } = props;
  const contextSearch = React.useContext(context);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Toolbar
      className={classes.root}
      classes={{ dense: classes.dense }}
      variant="dense"
    >
      <Box display="flex">
        <Box display="flex">
          {icon}
          {title}
        </Box>
      </Box>
    </Toolbar>
  );
}

// AppTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default AppTableToolbar;
