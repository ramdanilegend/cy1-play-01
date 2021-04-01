import React from "react";
// import AlertContext from "context/AlertContext";
// import service from "services/KantorPusatService";
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
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import KantorPusatContext from "context/KantorPusatContext";
import { AppTableHead, AppDialogDelete, AppIconButton } from "components";
import clsx from "clsx";
// import FormUpdate from "./FormUpdate";

//icon
import TimelineIcon from "@material-ui/icons/Timeline";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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

const headCells = [
  {
    id: "case-name",
    numeric: false,
    disablePadding: false,
    label: "Case Name",
  },
  {
    id: "letter-number",
    numeric: false,
    disablePadding: false,
    label: "Letter Number",
  },
  {
    id: "clause-reference",
    numeric: false,
    disablePadding: false,
    label: "Clause Reference",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "created-at",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableView() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [page, setPage] = React.useState(0);
  const dense = true;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const alertContext = React.useContext(AlertContext);
  // const kantorPusatContext = React.useContext(KantorPusatContext);
  const lowercasedFilter = "";
  const filteredData = [
    {
      case: "Murder Case",
      letterNumber: "LP/597/VV/2009",
      clauseReference: "KUHP Pasal 116 (2)",
      description:
        "On Tuesday, the six accused sat masked and a metre apart from one another as Mpembe’s lawyer, Jan Ellis, painstakingly cross-examined Masinya. ",
      link: "d",
      createdAt: "2020-08-13 11:40:40",
    },
    {
      case: "Murder Case",
      letterNumber: "LP/597/VV/2009",
      clauseReference: "KUHP Pasal 116 (2)",
      description:
        "On Tuesday, the six accused sat masked and a metre apart from one another as Mpembe’s lawyer, Jan Ellis, painstakingly cross-examined Masinya. ",
      link: "d",
      createdAt: "2020-08-13 11:40:40",
    },
    {
      case: "Murder Case",
      letterNumber: "LP/597/VV/2009",
      clauseReference: "KUHP Pasal 116 (2)",
      description:
        "On Tuesday, the six accused sat masked and a metre apart from one another as Mpembe’s lawyer, Jan Ellis, painstakingly cross-examined Masinya. ",
      link: "d",
      createdAt: "2020-08-13 11:40:40",
    },
    {
      case: "Murder Case",
      letterNumber: "LP/597/VV/2009",
      clauseReference: "KUHP Pasal 116 (2)",
      description:
        "On Tuesday, the six accused sat masked and a metre apart from one another as Mpembe’s lawyer, Jan Ellis, painstakingly cross-examined Masinya. ",
      link: "d",
      createdAt: "2020-08-13 11:40:40",
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

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
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.case}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.letterNumber}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.clauseReference}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.link}
                      </TableCell>
                      <TableCell className={classes.cells}>
                        {row.createdAt}
                      </TableCell>

                      <TableCell padding="checkbox" className={classes.cells}>
                        <Box display="flex" margin="7px">
                          <Box marginRight="5px">
                            <AppIconButton styleName={classes.chartIcon}>
                              <SearchIcon color="secondary" fontSize="small" />
                            </AppIconButton>
                          </Box>
                          <Box marginRight="5px">
                            <AppIconButton styleName={classes.editIcon}>
                              <EditIcon color="action" fontSize="small" />
                            </AppIconButton>
                          </Box>
                          <AppIconButton
                            styleName={classes.deleteIcon}
                            onClick={handleClickOpen}
                          >
                            <DeleteForeverIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </AppIconButton>
                        </Box>
                      </TableCell>
                    </StyledTableRow>
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
      </Paper>
      <AppDialogDelete
        open={open}
        handleClose={handleClose}
        title="Delete Case"
        text="case"
      />
    </div>
  );
}
