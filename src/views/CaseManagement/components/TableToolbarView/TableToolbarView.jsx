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
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),

    backgroundColor: "#F0F3F5",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    display: "flex",
    width: "100%",
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
  containerTool: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  btnAdd: {
    padding: "5px",
    // margin: 0,
  },
}));

function TableToolbarView(props) {
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
      <div className={classes.containerTool}>
        <Box display="flex">
          {icon}
          {title}
        </Box>
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<AddIcon color="secondary" />}
            // classes={{ contained: classes.btnAdd }}
          >
            Add Case
          </Button>
        </Box>
      </div>
    </Toolbar>
  );
}

// TableToolbarView.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default TableToolbarView;
