import React from "react";

import CheckIcon from "@material-ui/icons/Check";
import Service from "services/AnalysisService";
import AnalysisContext from "context/AnalysisContext";
import AlertContext from "context/AlertContext";

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
import { SkeletonTableScreen, AppDialogSessionEnd } from "components";

const dataBreadcrumbs = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Recent Analytic", color: "textPrimary", aktif: true },
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

const AnalysisResult = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageRows, setPageRows] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState(true);
  const [session, setSession] = React.useState(false);
  const getData = async () => {
    try {
      const data = await Service.getDataAll();
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
    setPage(1);
  };
  const handleChangeSearch = (event) => {
    setQuery(event.target.value);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
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
            <AnalysisContext.Provider
              value={{
                state: data,
                updateState: getData,
              }}
            >
              <div className={classes.tableContainer}>
                <AppTableToolbar
                  title="Recent Analytic"
                  icon={<CheckIcon fontSize="small" />}
                  refresh={() => {
                    console.log("test");
                  }}
                  context={AnalysisContext}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding="5px 15px"
                  flexDirection={matches ? "column-reverse" : "row"}
                >
                  <Box display="flex" alignItems="center">
                    Show
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
                  <TableView
                    pageRows={pageRows}
                    query={query}
                    page={page}
                    handleChangePage={handleChangePage}
                  />
                </Box>
              </div>
            </AnalysisContext.Provider>
          </React.Fragment>
        )}
      </AppWrapperBody>
      <AppDialogSessionEnd open={session} />
    </React.Fragment>
  );
};

export default AnalysisResult;
