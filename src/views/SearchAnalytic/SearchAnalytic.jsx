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
import { Box, Grid, Button } from "@material-ui/core";
import { AppPaginationRound } from "components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PhoneIcon from "@material-ui/icons/Phone";
import { AppTextIconField } from "components";
import EventIcon from "@material-ui/icons/Event";
import { AppDateRangeIconField } from "components";
import { SearchOutlined } from "@material-ui/icons";

const data = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Search & Analytic", color: "textPrimary", aktif: true },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "15px",
  },
  tableContainer: {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    border: "1px solid #C8CED3",
    marginTop: "50px",
  },
  btn: {
    backgroundColor: "#20A8D8",
    color: "#FFFFFF",
  },
}));

const SearchAnalytic = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  return (
    <AppWrapperBody>
      <AppBreadcrumbs data={data} />
      <Grid container>
        <Grid item xl={3} lg={3} md={3} sm={2} xs={12} />
        <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
          <div className={classes.tableContainer}>
            <AppTableToolbar
              title="Search & Analytic"
              icon={<CheckIcon fontSize="small" />}
              refresh={() => {
                console.log("test");
              }}
              context={TestContext}
            />
            <Box padding="10px 20px">
              Input
              <AppTextIconField label="MSISDN/IMEI/IMEI" icon={<PhoneIcon />} />
              <Box marginTop="5px"></Box>
              Date Range
              <AppDateRangeIconField
                label="MSISDN/IMEI/IMEI"
                icon={<EventIcon />}
              />
              <Box marginTop="10px" display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  endIcon={<SearchOutlined />}
                  className={classes.btn}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
    </AppWrapperBody>
  );
};

export default SearchAnalytic;
