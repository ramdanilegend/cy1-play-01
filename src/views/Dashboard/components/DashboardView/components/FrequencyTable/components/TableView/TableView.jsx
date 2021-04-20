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
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "",
    minWidth: 20,
  },
  {
    id: "caller",
    numeric: false,
    disablePadding: true,
    label: "Caller",
    minWidth: 120,
  },
  {
    id: "called",
    numeric: false,
    disablePadding: true,
    label: "Called",
    minWidth: 120,
  },
  {
    id: "totalCall",
    numeric: false,
    disablePadding: true,
    label: "Total Calls",
    minWidth: 140,
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: true,
    label: "Total Duration ",
    minWidth: 150,
  },
  {
    id: "callType",
    numeric: false,
    disablePadding: true,
    label: "Call Type",
    minWidth: 120,
  },
  {
    id: "firstCall",
    numeric: false,
    disablePadding: true,
    label: "First Call",
    minWidth: 120,
  },
  {
    id: "lastCall",
    numeric: false,
    disablePadding: true,
    label: "Last Call",
    minWidth: 120,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 190,
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
  const {
    pagination,
    rowsPerPage,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
  } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");

  const dense = true;

  const dashboardContext = React.useContext(DashboardContext);

  const [datas, setDatas] = React.useState([]);
  const [error, setError] = React.useState(true);
  React.useEffect(() => {
    if (dashboardContext.state.dashboardFrequency) {
      setDatas(dashboardContext.state.dashboardFrequency);
      setError(false);
    }
  }, [dashboardContext.state.dashboardFrequency]);
  const filteredData = datas;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    filteredData.length -
    Math.min(
      filteredData.length,
      filteredData.length - page * filteredData.length
    );

  return (
    <React.Fragment>
      {error ? (
        <SkeletonDashboardComponent />
      ) : (
        <Paper className={classes.root}>
          <TableContainer
            className={clsx({
              [classes.containerFull]: pagination,
              [classes.container]: !pagination,
            })}
          >
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHeadView
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={filteredData.length}
                headCells={columns}
                action={false}
              />
              <TableBody>
                {stableSort(filteredData, getComparator(order, orderBy))
                  .slice(
                    page * filteredData.length,
                    page * filteredData.length + filteredData.length
                  )
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
              {/* <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}
              {/* <TableBody className={classes.container}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody> */}
            </Table>
          </TableContainer>
        </Paper>
      )}
    </React.Fragment>
  );
}

export default TableView;
