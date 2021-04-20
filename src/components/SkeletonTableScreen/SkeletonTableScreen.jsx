import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { SkeletonBreadcrumb } from "components";
import { Box } from "@material-ui/core";
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

const SkeletonTableScreen = () => {
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
      <div className={classes.tableContainer}>
        <div className={classes.toolbar}>
          <Skeleton variant="text" width={70} />
        </div>
        <Skeleton variant="react" width="100%" height="350px" />
      </div>
    </React.Fragment>
  );
};

export default SkeletonTableScreen;
