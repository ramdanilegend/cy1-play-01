import React from "react";

import CheckIcon from "@material-ui/icons/Check";
import Service from "services/AnalysisService";
import AnalysisContext from "context/AnalysisContext";

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
  { title: "Analysis Result", color: "textPrimary", aktif: true },
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
  const [pageRows, setPageRows] = React.useState(5);
  const [query, setQuery] = React.useState("");
  const getData = async () => {
    const data = await Service.getDataAll();
    setData(data.data ? data.data : []);
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
    <AppWrapperBody>
      <AppBreadcrumbs data={dataBreadcrumbs} />
      <AnalysisContext.Provider
        value={{
          state: data,
          updateState: getData,
        }}
      >
        <div className={classes.tableContainer}>
          <AppTableToolbar
            title="Analysis Result"
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
              Show{" "}
              <AppSelectRowTable
                data={pageRows}
                handleChange={handleChangePageRows}
              />
              entries
            </Box>
            <Box display="flex" alignItems="center">
              <AppSearchField data={query} handleChange={handleChangeSearch} />
            </Box>
          </Box>
          <Box padding="5px 15px">
            <TableView pageRows={pageRows} query={query} />
          </Box>
        </div>
      </AnalysisContext.Provider>
    </AppWrapperBody>
  );
};

export default AnalysisResult;
