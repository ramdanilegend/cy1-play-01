import React from "react";
import { TableContainer, AppDialogFull } from "components";
import { TableView, TableToolbarView } from "./components";

const Movement = () => {
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
  return (
    <React.Fragment>
      <TableContainer>
        <TableToolbarView
          title="Movement"
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
        title={"Movement"}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
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

export default Movement;
