import React from "react";

import CheckIcon from "@material-ui/icons/Check";
import Service from "services/CaseService";
import CaseContext from "context/CaseContext";

import {
  AppBreadcrumbs,
  AppWrapperBody,
  AppSelectRowTable,
  AppSearchField,
  AppPaginationRound,
} from "components";
import { Box, useMediaQuery } from "@material-ui/core";
import { TableToolbarView, TableView } from "./components";
import { makeStyles } from "@material-ui/core/styles";

const dataBreadcrumbs = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Case Management", color: "textPrimary", aktif: true },
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

const CaseManagement = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [data, setData] = React.useState([]);
  const getData = async () => {
    const data = await Service.getDataAll();
    setData(data.data ? data.data : []);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <AppWrapperBody>
      <AppBreadcrumbs data={dataBreadcrumbs} />
      <CaseContext.Provider
        value={{
          state: data,
          updateState: getData,
        }}
      >
        <div className={classes.tableContainer}>
          <TableToolbarView
            title="Case Management"
            icon={<CheckIcon fontSize="small" />}
            refresh={() => {
              console.log("test");
            }}
            context={CaseContext}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            padding="5px 15px"
            flexDirection={matches ? "column-reverse" : "row"}
          >
            <Box display="flex" alignItems="center">
              Show <AppSelectRowTable />
              entries
            </Box>
            <Box display="flex" alignItems="center">
              <AppSearchField />
            </Box>
          </Box>
          <Box padding="5px 15px">
            <TableView />
            <Box display="flex" justifyContent="flex-end" marginBottom="10px">
              <AppPaginationRound />
            </Box>
          </Box>
        </div>
      </CaseContext.Provider>
    </AppWrapperBody>
  );
};

export default CaseManagement;
