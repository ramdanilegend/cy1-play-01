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
    id: "caller",
    numeric: false,
    disablePadding: true,
    label: "Caller",
    minWidth: 140,
  },
  {
    id: "called",
    numeric: false,
    disablePadding: true,
    label: "Called",
    minWidth: 140,
  },
  {
    id: "callDate",
    numeric: false,
    disablePadding: true,
    label: "Call Date",
    minWidth: 160,
  },
  {
    id: "callTime",
    numeric: false,
    disablePadding: true,
    label: "Call Time",
    minWidth: 150,
  },
  {
    id: "callType",
    numeric: false,
    disablePadding: true,
    label: "Call Type",
    minWidth: 190,
  },
  {
    id: "ASiteName",
    numeric: false,
    disablePadding: true,
    label: "Site Name",
    minWidth: 500,
  },
  {
    id: "Alongitude",
    numeric: false,
    disablePadding: true,
    label: "Long/Lat",
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
  const [error, setError] = React.useState(false);

  const dense = true;

  const dashboardContext = React.useContext(DashboardContext);
  const data = dashboardContext.state.dashboardView.dasboardMovement;
  // const [datas, setDatas] = React.useState(data ? data : []);
  // React.useEffect(() => {
  //   if (dashboardContext.state.dashboardView.dasboardMovement) {
  //     setDatas(dashboardContext.state.dashboardView.dasboardMovement);
  //     setError(false);
  //   }
  // }, []);
  const filteredData = data ? data : [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    (pagination ? rowsPerPage : filteredData.length) -
    Math.min(
      pagination ? rowsPerPage : filteredData.length,
      filteredData.length -
        page * (pagination ? rowsPerPage : filteredData.length)
    );

  return (
    <Paper className={classes.root}>
      {error ? (
        <SkeletonDashboardComponent height="220px" />
      ) : (
        <React.Fragment>
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
                    page * (pagination ? rowsPerPage : filteredData.length),
                    page * (pagination ? rowsPerPage : filteredData.length) +
                      (pagination ? rowsPerPage : filteredData.length)
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
            </Table>
          </TableContainer>
          {pagination && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredData.length}
              rowsPerPage={pagination ? rowsPerPage : filteredData.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </React.Fragment>
      )}
    </Paper>
  );
}

export default TableView;
