import React from "react";
import { TableContainer, AppTableToolbar } from "components";
import { TableView } from "./components";

const DayLocation = () => {
  return (
    <TableContainer>
      <AppTableToolbar title="Day Location (06:00 - 18:00)" />
      {/* <TableView /> */}
    </TableContainer>
  );
};

export default DayLocation;
