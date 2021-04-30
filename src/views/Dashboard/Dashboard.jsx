import React from "react";
import { AppBreadcrumbs, AppWrapperBody } from "components";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";
// import { TableView } from "./components";
import { LinkBehavior } from "components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TabsView } from "./components";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import DonutLargeOutlinedIcon from "@material-ui/icons/DonutLargeOutlined";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DashboardContext from "context/DashboardContext";

const dataBreadcrumb = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Dashboard", color: "textPrimary", aktif: true },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "15px",
  },
  tableContainer: {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    border: "1px solid #C8CED3",
    marginTop: "12px",
  },
}));

const Dashboard = (props) => {
  const { state } = props.location;
  const classes = useStyles();
  // const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  return (
    <AppWrapperBody>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <AppBreadcrumbs data={dataBreadcrumb} />
        <Button
          variant="contained"
          component={LinkBehavior}
          to="/analysis-result"
        >
          Back
        </Button>
      </Box>

      <div className={classes.tableContainer}>
        <DashboardContext.Provider
          value={{
            state: state,
          }}
        >
          <TabsView />
        </DashboardContext.Provider>
      </div>
    </AppWrapperBody>
  );
};

export default Dashboard;
