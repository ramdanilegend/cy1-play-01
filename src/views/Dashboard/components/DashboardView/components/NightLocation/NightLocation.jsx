import React from "react";
import { TableContainer, AppTableToolbar } from "components";
import { TableView } from "./components";

const NightLocation = () => {
  return (
    <TableContainer>
      <AppTableToolbar title="Night Location (18:01 - 05:59)" />
      {/* <TableView /> */}
    </TableContainer>
  );
};

export default NightLocation;
