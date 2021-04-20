import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { SkeletonBreadcrumb } from "components";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: "37px",
    width: "100%",
    display: "flex",
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: "0px 10px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  tableContainer: {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    border: "1px solid #C8CED3",
    marginTop: "12px",
  },
}));

const SkeletonDashboardScreen = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
        <Grid item md={12} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} height={40} />
            </div>
            <Skeleton variant="react" width="100%" height="230px" />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SkeletonDashboardScreen;
