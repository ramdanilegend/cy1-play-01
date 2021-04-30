import React from "react";
import AlertContext from "context/AlertContext";
import Service from "services/CaseService";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Table,
  Box,
  IconButton,
  Collapse,
  Typography,
  TableHead,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DashboardContext from "context/DashboardContext";
import { AppTableHead, AppDialogDelete, AppIconButton } from "components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// import FormUpdate from "./FormUpdate";

//icon
import AddIcon from "@material-ui/icons/Add";
import TimelineIcon from "@material-ui/icons/Timeline";
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";
import AppDialogBasic from "components/DialogBasic/DialogBasic";
// import FormAdd from "./components/FormAdd/FormAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    // marginBottom: theme.spacing(2),
  },
  table: {
    // maxWidth: 750,
    minHeight: 200,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  btnGroup: {
    margin: "5px 7px",
  },
  chartIcon: {
    backgroundColor: "#4DBD74",
  },
  deleteIcon: {
    backgroundColor: "#F86C6B",
  },
  editIcon: {
    backgroundColor: "#20A8D8",
  },
  cells: {
    borderRight: "1px solid #eeeeee",
    // minWidth: "180px",
  },
  cellBorders: {
    borderRight: "1px solid #eeeeee",
    minWidth: 0,
  },
  container: {
    maxHeight: 200,
  },
}));

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

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

const headCells = [
  {
    id: "0",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "caller",
    numeric: false,
    disablePadding: false,
    label: "Caller",
  },
  {
    id: "called",
    numeric: false,
    disablePadding: false,
    label: "Called",
  },
  {
    id: "totalCall",
    numeric: false,
    disablePadding: false,
    label: "Total Calls",
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: false,
    label: "Total Duration ",
  },
  {
    id: "callType",
    numeric: false,
    disablePadding: false,
    label: "Call Type",
  },
  {
    id: "firstCall",
    numeric: false,
    disablePadding: false,
    label: "First Call",
  },
  {
    id: "lastCall",
    numeric: false,
    disablePadding: false,
    label: "Last Call",
  },
  {
    id: "deltaDate",
    numeric: false,
    disablePadding: false,
    label: "<>",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableRowView = (props) => {
  const { row, index, labelId, classes } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
        <TableCell
          style={{ minWidth: 0 }}
          component="th"
          id={labelId}
          scope="row"
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.caller}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.called}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.totalCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.duration}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.callType}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.firstCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.lastCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.deltaDate}
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                          {rows.history.map((historyRow) => (
                            <TableRow key={historyRow.date}>
                              <TableCell component="th" scope="row">
                                {historyRow.date}
                              </TableCell>
                              <TableCell>{historyRow.customerId}</TableCell>
                              <TableCell align="right">
                                {historyRow.amount}
                              </TableCell>
                              <TableCell align="right">
                                {Math.round(
                                  historyRow.amount * rows.price * 100
                                ) / 100}
                              </TableCell>
                            </TableRow> */}
                {/* ))} */}
                {/* </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function TableView(props) {
  // const { data } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");
  const [page, setPage] = React.useState(0);

  const dense = true;

  // const alertContext = React.useContext(AlertContext);
  const dashboardContext = React.useContext(DashboardContext);
  // const lowercasedFilter = query.toLowerCase();
  // console.log(dashboardContext.state);
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    if (dashboardContext.state.dashboardFrequency) {
      setDatas(dashboardContext.state.dashboardFrequency);
    }
  }, [dashboardContext.state.dashboardFrequency]);
  const filteredData = datas;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);
  // console.log(rows);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer classname={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <AppTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
              headCells={headCells}
              action={false}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRowView
                      row={row}
                      index={index}
                      labelId={labelId}
                      classes={classes}
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
          rowsPerPageOptions={[filteredData.length]}
          component="div"
          count={filteredData.length}
          rowsPerPage={filteredData.length}
          page={page}
          onChangePage={handleChangePage}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
