import React from "react";
import { TableView } from "./components";
import { Box } from "@material-ui/core";

const Detail = ({ data }) => {
  return (
    <Box overflow="auto" display="flex">
      <TableView datasTable={data} />
    </Box>
  );
};

export default Detail;
