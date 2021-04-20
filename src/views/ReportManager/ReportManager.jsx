import React from "react";

import ReportContext from "context/ReportContext";
import ReportService from "services/ReportService";
import CheckIcon from "@material-ui/icons/Check";

import {
  AppBreadcrumbs,
  AppWrapperBody,
  AppTableToolbar,
  AppSelectRowTable,
  AppSearchField,
  AppDialogSessionEnd,
} from "components";
import { Box, useMediaQuery } from "@material-ui/core";
import { TableView } from "./components";
import { makeStyles } from "@material-ui/core/styles";
import { SkeletonTableScreen } from "components";

const dataBreadcrumbs = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Report Manager", color: "textPrimary", aktif: true },
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

const ReportManager = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [data, setData] = React.useState([]);
  const [pageRows, setPageRows] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState(true);
  const [session, setSession] = React.useState(false);
  const getData = async () => {
    try {
      const data = await ReportService.getDataAll();
      setData(data.data ? data.data : []);
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
            <ReportContext.Provider
              value={{
                state: data,
                updateState: getData,
              }}
            >
              <div className={classes.tableContainer}>
                <AppTableToolbar
                  title="Report Manager"
                  icon={<CheckIcon fontSize="small" />}
                  refresh={() => {
                    console.log("test");
                  }}
                  context={ReportContext}
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
            </ReportContext.Provider>
          </React.Fragment>
        )}
      </AppWrapperBody>
      <AppDialogSessionEnd open={session} />
    </React.Fragment>
  );
};

export default ReportManager;
