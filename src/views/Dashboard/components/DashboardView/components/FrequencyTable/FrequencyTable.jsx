import React from "react";
import { AppTableToolbar, TableContainer } from "components";
import { TableView } from "./components";

const FrequencyTable = () => {
  return (
    <TableContainer>
      <AppTableToolbar title="Frequency " />
      <TableView />
    </TableContainer>
  );
};

export default FrequencyTable;
