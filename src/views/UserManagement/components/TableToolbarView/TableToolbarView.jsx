import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AppDialogBasic from "components/DialogBasic/DialogBasic";
import { FormAdd } from "./components";

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
  btnColor: {
    backgroundColor: "#4420D8",
  },
  btnText: {
    color: "#ffffff",
  },
}));

function TableToolbarView(props) {
  const { title, icon } = props;
  const classes = useToolbarStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpenAdd = (data) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
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
              classes={{ contained: classes.btnColor, label: classes.btnText }}
              onClick={handleOpenAdd}
            >
              Add User
            </Button>
          </Box>
        </div>
      </Toolbar>
      <AppDialogBasic
        open={open}
        handleClose={handleClose}
        title="Form Case"
        icon={<AddIcon color="action" />}
      >
        <FormAdd handleClose={handleClose} />
      </AppDialogBasic>
    </React.Fragment>
  );
}

// TableToolbarView.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default TableToolbarView;
