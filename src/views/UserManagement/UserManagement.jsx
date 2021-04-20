import React from "react";

import UserContext from "context/UserContext";
import Service from "services/UserService";
import CheckIcon from "@material-ui/icons/Check";

import {
  AppBreadcrumbs,
  AppWrapperBody,
  AppSelectRowTable,
  AppSearchField,
  AppDialogSessionEnd,
} from "components";
import { Box, useMediaQuery } from "@material-ui/core";
import { TableToolbarView, TableView } from "./components";
import { makeStyles } from "@material-ui/core/styles";
import { SkeletonTableScreen } from "components";
import { Redirect } from "react-router";

const dataBreadcrumbs = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "User Management", color: "textPrimary", aktif: true },
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

const UserManagement = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [data, setData] = React.useState([]);
  const [pageRows, setPageRows] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState(true);
  const [session, setSession] = React.useState(false);
  const getData = async () => {
    try {
      const dataGet = await Service.getDataAll();
      setData(dataGet.data ? dataGet.data : []);
      setError(false);
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 401) {
          setSession(true);
        }
        setError(true);
        return true;
      }
    }
  };
  const addDataRow = (dataUpdate) => {
    setData([...data, dataUpdate]);
  };
  const handleChangePageRows = (event) => {
    setPageRows(event.target.value);
  };
  const handleChangeSearch = (event) => {
    setQuery(event.target.value);
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <AppWrapperBody>
        {error ? (
          <SkeletonTableScreen />
        ) : (
          <React.Fragment>
            <AppBreadcrumbs data={dataBreadcrumbs} />
            <UserContext.Provider
              value={{
                state: data,
                updateState: getData,
                // addState: addDataRow,
              }}
            >
              <div className={classes.tableContainer}>
                <TableToolbarView
                  title="User Management"
                  icon={<CheckIcon fontSize="small" />}
                  refresh={() => {
                    console.log("test");
                  }}
                  context={UserContext}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding="5px 15px"
                  flexDirection={matches ? "column-reverse" : "row"}
                >
                  <Box display="flex" alignItems="center">
                    Show{" "}
                    <AppSelectRowTable
                      data={pageRows}
                      handleChange={handleChangePageRows}
                    />
                    entries
                  </Box>
                  <Box display="flex" alignItems="center">
                    <AppSearchField
                      data={query}
                      handleChange={handleChangeSearch}
                    />
                  </Box>
                </Box>
                <Box padding="5px 15px">
                  <TableView pageRows={pageRows} query={query} />
                </Box>
              </div>
            </UserContext.Provider>
          </React.Fragment>
        )}
      </AppWrapperBody>
      <AppDialogSessionEnd open={session} />
    </React.Fragment>
  );
};

export default UserManagement;
