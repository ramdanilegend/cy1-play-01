import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
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
}));

const SkeletonDashboardScreen = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Skeleton variant="react" width="100%" height="190px" />
    </React.Fragment>
  );
};

export default SkeletonDashboardScreen;
