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
import SettingContext from "context/SettingContext";
import { AppTableHead } from "components";
import { AppIconButton } from "components";
import clsx from "clsx";
import Logo from "assets/img/sampleLogo.png";
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
    backgroundColor: "#63C2DE",
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
    id: "#ID",
    numeric: false,
    disablePadding: false,
    label: "#ID",
  },
  {
    id: "categor",
    numeric: false,
    disablePadding: false,
    label: "Item",
  },
  {
    id: "categor",
    numeric: false,
    disablePadding: false,
    label: "Parameter",
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
  const [open, setOpen] = React.useState({
    openDelete: false,
    openUpdate: false,
    data: {},
  });

  const [page, setPage] = React.useState(0);
  const dense = true;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const alertContext = React.useContext(AlertContext);
  // const kantorPusatContext = React.useContext(SettingContext);
  const lowercasedFilter = "";
  const filteredData = [
    {
      id: "1",
      item: "Elasticsearch IP Address : Port",
      parameter: "192.168.100.100:9200",
    },
    {
      id: "2",
      item: "RDBMS IP Address : Port",
      parameter: "192.168.100.200:5601",
    },
    { id: "3", item: "Logo", parameter: Logo },
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
                        {row.id}
                      </TableCell>
                      <TableCell className={classes.cells}>
                        {row.item}
                      </TableCell>
                      <TableCell className={classes.cells}>
                        {index === 2 ? (
                          <img src={Logo} alt="logo gambar" />
                        ) : (
                          row.parameter
                        )}
                      </TableCell>

                      <TableCell padding="checkbox" className={classes.cells}>
                        <AppIconButton styleName={classes.chartIcon}>
                          <EditIcon color="action" fontSize="small" />
                        </AppIconButton>
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
    </div>
  );
}
