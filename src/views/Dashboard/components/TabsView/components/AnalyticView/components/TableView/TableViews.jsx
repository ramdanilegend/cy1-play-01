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
import AnalyticService from "services/AnalyticService";

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
    id: "totalCall",
    numeric: false,
    disablePadding: true,
    label: "Total Call",
    minWidth: 120,
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: true,
    label: "Total Talk Time",
    minWidth: 200,
  },
  {
    id: "firstCall",
    numeric: false,
    disablePadding: true,
    label: "First Call",
    minWidth: 150,
  },
  {
    id: "lastCall",
    numeric: false,
    disablePadding: true,
    label: "Last Call",
    minWidth: 120,
  },
  {
    id: "deltaDate",
    numeric: false,
    disablePadding: true,
    label: "Day Difference",
    minWidth: 120,
  },
  {
    id: "SMS",
    numeric: false,
    disablePadding: true,
    label: "SMS OUT",
    minWidth: 120,
  },
  {
    id: "VOICE",
    numeric: false,
    disablePadding: true,
    label: "VOICE-OUT",
    minWidth: 120,
  },
  {
    id: "CFW",
    numeric: false,
    disablePadding: true,
    label: "CFW",
    minWidth: 120,
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

  const dense = true;

  const dashboardContext = React.useContext(DashboardContext);
  const [dataRespone, setDataRespone] = React.useState([{ caller: "dasdsa" }]);
  React.useEffect(async () => {
    try {
      const respone = await AnalyticService.postDetailCaller(
        dashboardContext.state
      );
      console.log(dashboardContext.state);
      setDataRespone(respone.data.analyticFrequencyDetail);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
  }, []);
  const datas = dataRespone;

  // const [datas, setDatasRespone] = React.useState([]);
  const [error, setError] = React.useState(false);
  // React.useEffect(() => {
  //   if (dashboardContext.state.dashboardView.dashboardFrequency) {
  //     setDatas(dashboardContext.state.dashboardView.dashboardFrequency);
  //     setError(false);
  //   }
  // }, []);
  // const datas = datas;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    (pagination ? rowsPerPage : datas.length) -
    Math.min(
      pagination ? rowsPerPage : datas.length,
      datas.length - page * (pagination ? rowsPerPage : datas.length)
    );

  return (
    <React.Fragment>
      {error ? (
        <SkeletonDashboardComponent height="220px" />
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
                rowCount={datas.length}
                headCells={columns}
                action={false}
              />
              <TableBody>
                {stableSort(datas, getComparator(order, orderBy))
                  .slice(
                    page * (pagination ? rowsPerPage : datas.length),
                    page * (pagination ? rowsPerPage : datas.length) +
                      (pagination ? rowsPerPage : datas.length)
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
              count={datas.length}
              rowsPerPage={pagination ? rowsPerPage : datas.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
    </React.Fragment>
  );
}

export default TableView;
