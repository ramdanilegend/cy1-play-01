import React from "react";
import { TableContainer, AppDialogFull } from "components";
import { TableView, TableToolbarView, TableViewDialog } from "./components";

const FrequencyTable = () => {
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setOpen(false);
    setPage(0);
  };

  return (
    <React.Fragment>
      <TableContainer>
        <TableToolbarView
          title="Frequency "
          handleClick={() => {
            setOpen(true);
          }}
        />
        <TableView
          pagination={open}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        />
      </TableContainer>
      <AppDialogFull title={"Frequency"} open={open} handleClose={handleClose}>
        <TableViewDialog
          pagination={open}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
        />
      </AppDialogFull>
    </React.Fragment>
  );
};

export default FrequencyTable;
