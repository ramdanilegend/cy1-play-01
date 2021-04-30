import React from "react";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { IconButton, Box, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),

    backgroundColor: "#F0F3F5",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  dense: {
    minHeight: "37px",
  },
  btnCloseIcon: {
    padding: "2px",
  },
}));

function TableToolbarView(props) {
  const classes = useToolbarStyles();

  const { title, icon, handleClick } = props;

  return (
    <Toolbar
      className={classes.root}
      classes={{ dense: classes.dense }}
      variant="dense"
    >
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box display="flex">
          {icon ? icon : ""}
          {title}
        </Box>
        <Box>
          <IconButton className={classes.btnCloseIcon} onClick={handleClick}>
            <OpenInNewIcon color="action" />
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  );
}

// TableToolbarView.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default TableToolbarView;
