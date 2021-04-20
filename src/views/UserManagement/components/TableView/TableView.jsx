import React from "react";
import AlertContext from "context/AlertContext";
import Service from "services/UserService";
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
import UserContext from "context/UserContext";
import { AppTableHead, AppDialogDelete, AppIconButton } from "components";

import clsx from "clsx";
// import FormUpdate from "./FormUpdate";

//icon
import TimelineIcon from "@material-ui/icons/Timeline";
import Pagination from "@material-ui/lab/Pagination";
import AppDialogBasic from "components/DialogBasic/DialogBasic";
import { FormUpdate } from "./components";

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
  categoryText: {
    padding: "1px 5px",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    minWidth: "120px",
    borderRadius: "15px",
    fontSize: "12px",
  },
  categoryAdmin: {
    backgroundColor: "#4DBD74",
  },
  categoryGuest: {
    backgroundColor: "#14A1EB",
  },
  categoryDataManager: {
    backgroundColor: "#FF9100",
  },
  categoryAnalyst: {
    backgroundColor: "#D82058",
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
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "pin",
    numeric: false,
    disablePadding: false,
    label: "Police Identify Number",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone_number",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
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
  const [orderBy, setOrderBy] = React.useState("name");
  const [open, setOpen] = React.useState({
    openDelete: false,
    openUpdate: false,
    data: {},
  });

  const handleOpenDelete = (data) => {
    setOpen({ ...open, openDelete: true, openUpdate: false, data: data });
  };
  const handleOpenUpdate = (data) => {
    setOpen({ ...open, openDelete: false, openUpdate: true, data: data });
  };
  const handleClose = () => {
    setOpen({ ...open, openDelete: false, openUpdate: false, data: {} });
  };

  const [page, setPage] = React.useState(1);
  const dense = true;

  const alertContext = React.useContext(AlertContext);
  const userContext = React.useContext(UserContext);
  const lowercasedFilter = query.toLowerCase();

  const filteredData = userContext.state.filter((value) => {
    return (
      value.name.toLowerCase().includes(lowercasedFilter) ||
      value.pin.toLowerCase().includes(lowercasedFilter) ||
      value.email.toLowerCase().includes(lowercasedFilter) ||
      value.phone_number.toLowerCase().includes(lowercasedFilter)
    );
  });

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
      alertContext.updateState(false, true, "success", "Data Deleted");
    } catch (ex) {
      if (!ex.response) {
        alertContext.updateState(false, true, "error", "Error 404");
        return true;
      }
      alertContext.updateState(false, true, "error", ex.response.data);
    }
    setOpen({ ...open, openDelete: false, data: "" });
    userContext.updateState();
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
            // stickyHeader
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
                        className={classes.cells}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.pin}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        {row.phone_number}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        className={classes.cells}
                      >
                        <div
                          className={clsx(classes.categoryText, {
                            [classes.categoryAdmin]: row.id_role === "1",
                            [classes.categoryGuest]: row.id_role === "2",
                            [classes.categoryDataManager]: row.id_role === "3",
                            [classes.categoryAnalyst]: row.id_role === "4",
                          })}
                        >
                          {clsx({
                            ["Admin"]: row.id_role === "1",
                            ["Guest"]: row.id_role === "2",
                            ["Data Manager"]: row.id_role === "3",
                            ["Analyst"]: row.id_role === "4",
                          })}
                        </div>
                        <Box display="flex"></Box>
                      </TableCell>

                      <TableCell padding="checkbox" className={classes.cells}>
                        <Box display="flex" margin="7px">
                          <Box marginRight="5px">
                            <AppIconButton
                              styleName={classes.editIcon}
                              onClick={() => {
                                handleOpenUpdate(row);
                              }}
                            >
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
      <AppDialogBasic
        open={open.openUpdate}
        handleClose={handleClose}
        title="Form Edit Case"
        icon={<EditIcon color="action" />}
      >
        <FormUpdate handleClose={handleClose} data={open.data} />
      </AppDialogBasic>
      <AppDialogDelete
        open={open.openDelete}
        handleClose={handleClose}
        handleDelete={handleDelete}
        title="Delete User"
        text="user"
      />
    </div>
  );
}
