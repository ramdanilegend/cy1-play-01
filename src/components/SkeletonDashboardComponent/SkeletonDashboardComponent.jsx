import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const SkeletonDashboardScreen = (props) => {
  const { height } = props;
  return (
    <React.Fragment>
      <Box
        color="#2196f3"
        width="100%"
        height={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="inherit" />
      </Box>
    </React.Fragment>
  );
};

export default SkeletonDashboardScreen;
