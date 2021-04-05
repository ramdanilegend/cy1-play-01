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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ReportContext from "context/ReportContext";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { AppTableHead, AppDialogDelete, AppIconButton } from "components";

import clsx from "clsx";
// import FormUpdate from "./FormUpdate";

//icon
import TimelineIcon from "@material-ui/icons/Timeline";
import Pagination from "@material-ui/lab/Pagination";

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
  categoryCase: {
    backgroundColor: "#4DBD74",
  },
  categoryAnalytic: {
    backgroundColor: "#14A1EB",
  },
  categoryLink: {
    backgroundColor: "#FF9100",
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
    id: "report_name",
    numeric: false,
    disablePadding: false,
    label: "Report Result",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
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
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const dense = true;

  // const alertContext = React.useContext(AlertContext);
  const reportContext = React.useContext(ReportContext);
  const lowercasedFilter = query.toLowerCase();
  const filteredData = reportContext.state.filter((value) => {
    return value.report_name.toLowerCase().includes(lowercasedFilter);
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                        className={classes.cells}
                      >
                        {row.report_name}
                      </TableCell>
                      <TableCell className={classes.cells}>
                        <Box display="flex">
                          <div
                            className={clsx(classes.categoryText, {
                              [classes.categoryCase]: row.category === "1",
                              [classes.categoryAnalytic]: row.category === "2",
                              [classes.categoryLink]: row.category === "3",
                            })}
                          >
                            {clsx({
                              ["Case Management"]: row.category === "1",
                              ["Search & Analytic"]: row.category === "2",
                              ["Link Analysis"]: row.category === "3",
                            })}
                          </div>
                          <Box display="flex"></Box>
                        </Box>
                      </TableCell>

                      <TableCell padding="checkbox" className={classes.cells}>
                        <Box display="flex" margin="7px">
                          <Box marginRight="5px">
                            <AppIconButton styleName={classes.chartIcon}>
                              <PictureAsPdfIcon
                                color="secondary"
                                fontSize="small"
                              />
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
      <AppDialogDelete
        open={open}
        handleClose={handleClose}
        title="Delete Report"
        text="report"
      />
    </div>
  );
}
