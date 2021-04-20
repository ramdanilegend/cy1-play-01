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

const SkeletonView = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box display="flex">
        <Box padding="0 10px">
          <Skeleton variant="text" width={70} />{" "}
        </Box>
        /
        <Box padding="0 10px">
          <Skeleton variant="text" width={70} />{" "}
        </Box>{" "}
        /
        <Box padding="0 10px">
          <Skeleton variant="text" width={70} />{" "}
        </Box>
      </Box>
      <Grid container>
        <Grid item xl={3} lg={3} md={3} sm={2} xs={12} />
        <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
          <Box padding="20px 0" />
          <div className={classes.tableContainer}>
            <div className={classes.toolbar}>
              <Skeleton variant="text" width={70} />
            </div>
            <Skeleton variant="react" width="100%" height="170px" />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SkeletonView;
