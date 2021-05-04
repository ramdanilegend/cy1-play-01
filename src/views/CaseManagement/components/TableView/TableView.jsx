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
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CaseContext from "context/CaseContext";
import { AppTableHead, AppDialogDelete, AppIconButton } from "components";

// import FormUpdate from "./FormUpdate";

//icon
import AddIcon from "@material-ui/icons/Add";
import TimelineIcon from "@material-ui/icons/Timeline";
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";
import AppDialogBasic from "components/DialogBasic/DialogBasic";
import FormAdd from "./components/FormAdd/FormAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: "100%",
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
  cellCaseName: {
    minWidth: "200px",
  },
  cellDescription: {
    minWidth: "500px",
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
    id: "case_name",
    numeric: false,
    disablePadding: false,
    label: "Case Name",
  },
  {
    id: "letter_number",
    numeric: false,
    disablePadding: false,
    label: "Letter Number",
  },
  {
    id: "clause_reference",
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
    id: "created_at",
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

export default function TableView(props) {
  const { pageRows, query } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");
  const [page, setPage] = React.useState(1);

  const [open, setOpen] = React.useState({
    openDelete: false,
    openAdd: false,
    data: {},
  });
  const dense = true;

  const alertContext = React.useContext(AlertContext);
  const caseContext = React.useContext(CaseContext);
  const lowercasedFilter = query.toLowerCase();
  const filteredData = caseContext.state.filter((value) => {
    return value.case_name.toLowerCase().includes(lowercasedFilter);
  });

  const handleOpenDelete = (data) => {
    setOpen({ ...open, openDelete: true, openAdd: false, data: data });
  };

  const handleClose = () => {
    setOpen({ ...open, openDelete: false, openAdd: false, data: "" });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    pageRows - Math.min(pageRows, filteredData.length - (page - 1) * pageRows);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      alertContext.updateState(true, false, "success", "");
      await Service.deleteData(open.data.id);
      alertContext.updateState(false, true, "success", "Data Analysis Deleted");
    } catch (ex) {
      if (!ex.response) {
        alertContext.updateState(false, true, "error", "Error 404");
        return true;
      }
      alertContext.updateState(false, true, "error", ex.response.data);
    }
    handleClose();
    caseContext.updateState();
  };

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
                .slice((page - 1) * pageRows, (page - 1) * pageRows + pageRows)
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
                        className={clsx(classes.cells, classes.cellCaseName)}
                      >
                        {row.case_name}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.letter_number}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.clause_reference}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={clsx(classes.cells, classes.cellDescription)}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        <Link
                          href={`https://www.google.com/maps/?q=${row.longlat}`}
                          target="_blank"
                        >
                          Link
                        </Link>
                      </TableCell>
                      <TableCell className={classes.cells}>
                        {row.created_at}
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
                            onClick={() => {
                              handleOpenDelete(row);
                            }}
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
      <Box
        display="flex"
        justifyContent="flex-end"
        marginTop="10px"
        marginBottom="10px"
      >
        <Pagination
          page={page}
          count={Math.ceil(filteredData.length / pageRows)}
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
          // boundaryCount={2}
          onChange={handleChangePage}
        />
      </Box>

      <AppDialogDelete
        open={open.openDelete}
        handleClose={handleClose}
        title="Delete Case"
        text="case"
        handleDelete={handleDelete}
      />
    </div>
  );
}
