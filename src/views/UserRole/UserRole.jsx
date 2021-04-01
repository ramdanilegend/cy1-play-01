import React from "react";
import {
  AppBreadcrumbs,
  AppWrapperBody,
  AppTableToolbar,
  AppSelectRowTable,
  AppSearchField,
} from "components";
import { makeStyles } from "@material-ui/core/styles";
import TestContext from "context/TestContext";
import CheckIcon from "@material-ui/icons/Check";
import { Box, TextField } from "@material-ui/core";
import { AppPaginationRound } from "components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TableToolbarView, TableView } from "./components";

const data = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "User Role", color: "textPrimary", aktif: true },
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

const UserRole = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  return (
    <AppWrapperBody>
      <AppBreadcrumbs data={data} />
      <div className={classes.tableContainer}>
        <AppTableToolbar
          title="User Role"
          icon={<CheckIcon fontSize="small" />}
          refresh={() => {
            console.log("test");
          }}
          context={TestContext}
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
    </AppWrapperBody>
  );
};

export default UserRole;
