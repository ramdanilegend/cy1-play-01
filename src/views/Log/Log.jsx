import React from "react";

import LoggerContext from "context/LoggerContext";
import Service from "services/LoggerService";
import CheckIcon from "@material-ui/icons/Check";

import {
  AppBreadcrumbs,
  AppWrapperBody,
  AppTableToolbar,
  AppSelectRowTable,
  AppSearchField,
  AppPaginationRound,
} from "components";
import { Box, useMediaQuery } from "@material-ui/core";
import { TableView } from "./components";
import { makeStyles } from "@material-ui/core/styles";

const dataBreadcrumbs = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Logs", color: "textPrimary", aktif: true },
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

const Log = () => {
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
      <LoggerContext.Provider
        value={{
          state: data,
          updateState: getData,
        }}
      >
        <div className={classes.tableContainer}>
          <AppTableToolbar
            title="Logs"
            icon={<CheckIcon fontSize="small" />}
            refresh={() => {
              console.log("test");
            }}
            context={LoggerContext}
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
      </LoggerContext.Provider>
    </AppWrapperBody>
  );
};

export default Log;
