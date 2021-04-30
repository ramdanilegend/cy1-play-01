import React from "react";
import {
  AppBreadcrumbs,
  AppWrapperBody,
  AppTableToolbar,
  AppDialogSessionEnd,
} from "components";
import { makeStyles } from "@material-ui/core/styles";
import TestContext from "context/TestContext";
import CheckIcon from "@material-ui/icons/Check";
import { Box, Grid, Button, CircularProgress } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PhoneIcon from "@material-ui/icons/Phone";
import { AppTextIconField } from "components";
import EventIcon from "@material-ui/icons/Event";
import { AppDateRangeIconField } from "components";
import { SearchOutlined } from "@material-ui/icons";
import { SkeletonView } from "./components";
import Service from "services/AuthService";
import { Formik } from "formik";
import DashboardService from "services/DashboardService";
// import history from "history";

const data = [
  { title: "Home", color: "textPrimary", aktif: false },
  { title: "Admin", color: "textPrimary", aktif: false },
  { title: "Search & Analytic", color: "textPrimary", aktif: true },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "15px",
  },
  wrapperButton: {
    margin: theme.spacing(1),
    position: "relative",
    color: "#2196f3",
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
  buttonProgress: {
    // color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SearchAnalytic = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [error, setError] = React.useState(true);
  const [session, setSession] = React.useState(false);
  const getData = async () => {
    try {
      await Service.getAuth();
      // console.log(ff.data);
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
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <AppWrapperBody>
        {error ? (
          <SkeletonView />
        ) : (
          <React.Fragment>
            <AppBreadcrumbs data={data} />
            <Grid container>
              <Grid item xl={3} lg={3} md={3} sm={2} xs={12} />
              <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
                <div className={classes.tableContainer}>
                  <AppTableToolbar
                    title="Search & Analytic"
                    icon={<CheckIcon fontSize="small" />}
                    context={TestContext}
                  />

                  <Box padding="10px 20px">
                    <Formik
                      initialValues={{
                        msisdn: "",
                        daterangepicker: "",
                        startDate: null,
                        endDate: null,
                      }}
                      validate={(values) => {
                        const errors = {};
                        return errors;
                      }}
                      onSubmit={async (values, { setSubmitting }) => {
                        // console.log(values.startDate.format("MM/D/YYYY"));
                        try {
                          const response = await DashboardService.postSearchAnalytic(
                            values.msisdn,
                            `${values.startDate.format(
                              "MM/D/YYYY"
                            )} - ${values.endDate.format("MM/D/YYYY")}`
                          );
                          props.history.push({
                            pathname: "/dashboard",
                            state: {
                              msisdn: response.data.msisdn,
                              daterangepicker: response.data.daterangepicker,
                              dashboardView: response.data,
                            }, // your data array of objects
                          });
                        } catch (ex) {
                          if (ex.response) {
                            if (ex.response.status === 401) {
                            }
                          }
                        }
                        setSubmitting(false);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit} autoComplete="off">
                          Input
                          <AppTextIconField
                            label="MSISDN/IMSI/IMEI"
                            icon={<PhoneIcon />}
                            name="msisdn"
                            value={values.msisdn}
                            handleChange={handleChange}
                          />
                          <Box marginTop="5px"></Box>
                          Date Range
                          <AppDateRangeIconField
                            label="MSISDN/IMSI/IMEI"
                            icon={<EventIcon />}
                            startId="searchAnalyticStart"
                            endId="searchAnalyticEnd"
                            startDate={values.startDate}
                            enDate={values.endDate}
                            handleChange={({ startDate, endDate }) => {
                              setFieldValue("startDate", {
                                startDate,
                              });
                              setFieldValue("endDate", {
                                endDate,
                              });
                            }}
                          />
                          <Box
                            marginTop="10px"
                            display="flex"
                            justifyContent="center"
                          >
                            <div className={classes.wrapperButton}>
                              <Button
                                variant="contained"
                                endIcon={<SearchOutlined />}
                                className={classes.btn}
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Search
                              </Button>
                              {isSubmitting && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                  color="inherit"
                                />
                              )}
                            </div>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </Box>
                </div>
                <Box height="500px" />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </AppWrapperBody>
      <AppDialogSessionEnd open={session} />
    </React.Fragment>
  );
};

export default SearchAnalytic;
