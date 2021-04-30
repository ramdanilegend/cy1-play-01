import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Table,
} from "@material-ui/core";
import DashboardContext from "context/DashboardContext";

import clsx from "clsx";
import { TableHeadView, TableRowsView } from "./components";
import { SkeletonDashboardComponent } from "components";

const columns = [
  {
    id: "siteName",
    numeric: false,
    disablePadding: true,
    label: "Site Name",
    minWidth: 500,
  },
  {
    id: "totalCall",
    numeric: false,
    disablePadding: true,
    label: "Total Call",
    minWidth: 190,
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: true,
    label: "Total Duration",
    minWidth: 190,
  },

  {
    id: "longlat",
    numeric: false,
    disablePadding: true,
    label: "Long/Lat",
    minWidth: 190,
  },
  {
    id: "Alaccid",
    numeric: false,
    disablePadding: true,
    label: "LAC-CI",
    minWidth: 190,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 220,
  },
  containerFull: {
    maxHeight: "80vh",
    minHeight: "80vh",
  },
  styledRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function TableView(props) {
  const { datasTable, pagination } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");
  const [error, setError] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dense = true;

  const dashboardContext = React.useContext(DashboardContext);
  const data = dashboardContext.state.dashboardView.dasboardMovement;
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    if (datasTable) {
      console.log(datasTable);
      setDatas(datasTable);
      setError(false);
    }
  }, [datasTable]);
  // const datas = datas ? datas : [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      {error ? (
        <SkeletonDashboardComponent height="220px" />
      ) : (
        <React.Fragment>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHeadView
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={datas.length}
                headCells={columns}
                action={false}
              />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRowsView
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={datas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </React.Fragment>
      )}
    </Paper>
  );
}

export default TableView;
