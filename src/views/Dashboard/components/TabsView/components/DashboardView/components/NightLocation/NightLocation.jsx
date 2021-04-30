import React from "react";
import { TableContainer, AppDialogFull } from "components";
import { TableView, TableToolbarView } from "./components";

const NightLocation = () => {
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
          title="Night Location (18:01 - 05:59)"
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
      <AppDialogFull
        title={"Night Location (18:01 - 05:59)"}
        open={open}
        handleClose={handleClose}
      >
        <TableView
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

export default NightLocation;
