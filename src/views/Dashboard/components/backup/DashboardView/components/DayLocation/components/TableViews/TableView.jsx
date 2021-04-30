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
  ButtonGroup,
  Button,
  Tooltip,
  Box,
  Link,
  IconButton,
  Collapse,
  Typography,
  TableHead,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
    maxWidth: 750,
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
  cellSeparate: {
    borderRight: "1px solid #eeeeee",
    minWidth: 180,
  },
  cells: {
    borderRight: "1px solid #eeeeee",
  },
  cellBorders: {
    borderRight: "1px solid #eeeeee",
    minWidth: 0,
  },
  cellSitename: {
    minWidth: 500,
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
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "siteName",
    numeric: false,
    disablePadding: false,
    label: "Site Name",
  },
  {
    id: "totalCall",
    numeric: false,
    disablePadding: false,
    label: "Total Call",
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: false,
    label: "Total Duration",
  },
  {
    id: "long",
    numeric: false,
    disablePadding: false,
    label: "Long/Lat",
  },
  {
    id: "AlaccId",
    numeric: false,
    disablePadding: false,
    label: "LAC-CI",
  },
  {
    id: "link",
    numeric: false,
    disablePadding: false,
    label: "Link",
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
          className={clsx(classes.cellSeparate, classes.cellSitename)}
        >
          {row.siteName}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cellSeparate}
        >
          {row.totalCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cellSeparate}
        >
          {row.duration}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cellSeparate}
        >
          {clsx({
            [row.long + "," + row.lat]: row.long && row.lat,
            ["," + row.lat]: !row.long && row.lat,
            [row.long + ","]: !row.lat && row.long,
            [""]: !row.long && !row.lat,
          })}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cellSeparate}
        >
          {row.AlaccId}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cellSeparate}
        >
          {"Link"}
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
  // const {  query } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");
  const [page, setPage] = React.useState(0);

  const dense = true;

  // const alertContext = React.useContext(AlertContext);
  const dashboardContext = React.useContext(DashboardContext);
  // const lowercasedFilter = query.toLowerCase();
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    if (dashboardContext.state.dashboardNightLocation) {
      setDatas(dashboardContext.state.dashboardNightLocation);
    }
  }, [dashboardContext.state.dashboardNightLocation]);
  const filteredData = datas;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = 3 - Math.min(3, filteredData.length - (page - 1) * 3);
  // console.log(rows);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
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
                .slice(page * 3, page * 3 + 3)
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
          rowsPerPageOptions={[3]}
          component="div"
          count={filteredData.length}
          rowsPerPage={3}
          page={page}
          onChangePage={handleChangePage}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <Box
        display="flex"
        justifyContent="flex-end"
        marginTop="10px"
        marginBottom="10px"
      >
        <Pagination
          page={page}
          count={Math.ceil(filteredData.length / 3)}
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
          // boundaryCount={2}
          onChange={handleChangePage}
        />
      </Box> */}
    </div>
  );
}
