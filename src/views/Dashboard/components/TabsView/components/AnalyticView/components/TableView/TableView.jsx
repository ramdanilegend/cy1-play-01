import React from "react";
import AlertContext from "context/AlertContext";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  Box,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  TableHeadView,
  TableRowsView,
  TableRowsCall,
  RowsWeeklyCall,
  RowsMonthlyCall,
  RowsHourlyCall,
  RowsDailyCalled,
  RowsDetailImeiCall,
  RowsHourlyImei,
  RowsSimPhone,
  RowsWeeklyCalled,
  RowsMonthlyCalled,
} from "./components";

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableView(props) {
  const {
    pageRows,
    query,
    page,
    handleChangePage,
    data,
    tableSelect,
    column,
    detail,
  } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kode_asuransi");

  const [open, setOpen] = React.useState({
    openDelete: false,
    openAdd: false,
    data: {},
  });
  const dense = true;

  const alertContext = React.useContext(AlertContext);

  const lowercasedFilter = query.toLowerCase();

  // .filter((value) => {
  //   return value.totalCall.toString().toLowerCase().includes(lowercasedFilter);
  // });
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      setDatas(data);
    }
  }, [data]);

  const filteredData = datas.filter((value) => {
    if (tableSelect.detailCall) {
      if (value.caller) {
        return (
          value.caller.toLowerCase().includes(lowercasedFilter) ||
          value.firstCall.toLowerCase().includes(lowercasedFilter) ||
          value.lastCall.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value.duration.toString().toLowerCase().includes(lowercasedFilter) ||
          value.VOICE.toString().toLowerCase().includes(lowercasedFilter) ||
          value.SMS.toString().toLowerCase().includes(lowercasedFilter) ||
          value.CFW.toString().toLowerCase().includes(lowercasedFilter) ||
          value.deltaDate.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.dailyCall) {
      if (value.caller) {
        return (
          value.caller.toLowerCase().includes(lowercasedFilter) ||
          value.callDate.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value.totalTalkTime
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter) ||
          value.VOICE.toString().toLowerCase().includes(lowercasedFilter) ||
          value.SMS.toString().toLowerCase().includes(lowercasedFilter) ||
          value.CFW.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.weeklyCall) {
      if (value.caller) {
        return (
          value.caller.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter) ||
          value[13].toString().toLowerCase().includes(lowercasedFilter) ||
          value[14].toString().toLowerCase().includes(lowercasedFilter) ||
          value[15].toString().toLowerCase().includes(lowercasedFilter) ||
          value[16].toString().toLowerCase().includes(lowercasedFilter) ||
          value[17].toString().toLowerCase().includes(lowercasedFilter) ||
          value[18].toString().toLowerCase().includes(lowercasedFilter) ||
          value[19].toString().toLowerCase().includes(lowercasedFilter) ||
          value[20].toString().toLowerCase().includes(lowercasedFilter) ||
          value[21].toString().toLowerCase().includes(lowercasedFilter) ||
          value[22].toString().toLowerCase().includes(lowercasedFilter) ||
          value[23].toString().toLowerCase().includes(lowercasedFilter) ||
          value[24].toString().toLowerCase().includes(lowercasedFilter) ||
          value[25].toString().toLowerCase().includes(lowercasedFilter) ||
          value[26].toString().toLowerCase().includes(lowercasedFilter) ||
          value[27].toString().toLowerCase().includes(lowercasedFilter) ||
          value[28].toString().toLowerCase().includes(lowercasedFilter) ||
          value[29].toString().toLowerCase().includes(lowercasedFilter) ||
          value[30].toString().toLowerCase().includes(lowercasedFilter) ||
          value[31].toString().toLowerCase().includes(lowercasedFilter) ||
          value[32].toString().toLowerCase().includes(lowercasedFilter) ||
          value[33].toString().toLowerCase().includes(lowercasedFilter) ||
          value[34].toString().toLowerCase().includes(lowercasedFilter) ||
          value[35].toString().toLowerCase().includes(lowercasedFilter) ||
          value[36].toString().toLowerCase().includes(lowercasedFilter) ||
          value[37].toString().toLowerCase().includes(lowercasedFilter) ||
          value[38].toString().toLowerCase().includes(lowercasedFilter) ||
          value[39].toString().toLowerCase().includes(lowercasedFilter) ||
          value[40].toString().toLowerCase().includes(lowercasedFilter) ||
          value[41].toString().toLowerCase().includes(lowercasedFilter) ||
          value[42].toString().toLowerCase().includes(lowercasedFilter) ||
          value[43].toString().toLowerCase().includes(lowercasedFilter) ||
          value[44].toString().toLowerCase().includes(lowercasedFilter) ||
          value[45].toString().toLowerCase().includes(lowercasedFilter) ||
          value[46].toString().toLowerCase().includes(lowercasedFilter) ||
          value[47].toString().toLowerCase().includes(lowercasedFilter) ||
          value[48].toString().toLowerCase().includes(lowercasedFilter) ||
          value[49].toString().toLowerCase().includes(lowercasedFilter) ||
          value[50].toString().toLowerCase().includes(lowercasedFilter) ||
          value[51].toString().toLowerCase().includes(lowercasedFilter) ||
          value[52].toString().toLowerCase().includes(lowercasedFilter) ||
          value[53].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }

    if (tableSelect.monthlyCall) {
      if (value.caller) {
        return (
          value.caller.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.hourlyCall) {
      if (value.caller) {
        return (
          value.caller.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[0].toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter) ||
          value[13].toString().toLowerCase().includes(lowercasedFilter) ||
          value[14].toString().toLowerCase().includes(lowercasedFilter) ||
          value[15].toString().toLowerCase().includes(lowercasedFilter) ||
          value[16].toString().toLowerCase().includes(lowercasedFilter) ||
          value[17].toString().toLowerCase().includes(lowercasedFilter) ||
          value[18].toString().toLowerCase().includes(lowercasedFilter) ||
          value[19].toString().toLowerCase().includes(lowercasedFilter) ||
          value[20].toString().toLowerCase().includes(lowercasedFilter) ||
          value[21].toString().toLowerCase().includes(lowercasedFilter) ||
          value[22].toString().toLowerCase().includes(lowercasedFilter) ||
          value[23].toString().toLowerCase().includes(lowercasedFilter) ||
          value[24].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.detailCalled) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.firstCall.toLowerCase().includes(lowercasedFilter) ||
          value.lastCall.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value.duration.toString().toLowerCase().includes(lowercasedFilter) ||
          value.VOICE.toString().toLowerCase().includes(lowercasedFilter) ||
          value.SMS.toString().toLowerCase().includes(lowercasedFilter) ||
          value.CFW.toString().toLowerCase().includes(lowercasedFilter) ||
          value.deltaDate.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.dailyCalled) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.callDate.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value.totalTalkTime
            .toString()
            .toLowerCase()
            .includes(lowercasedFilter) ||
          value.VOICE.toString().toLowerCase().includes(lowercasedFilter) ||
          value.SMS.toString().toLowerCase().includes(lowercasedFilter) ||
          value.CFW.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.weeklyCalled) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter) ||
          value[13].toString().toLowerCase().includes(lowercasedFilter) ||
          value[14].toString().toLowerCase().includes(lowercasedFilter) ||
          value[15].toString().toLowerCase().includes(lowercasedFilter) ||
          value[16].toString().toLowerCase().includes(lowercasedFilter) ||
          value[17].toString().toLowerCase().includes(lowercasedFilter) ||
          value[18].toString().toLowerCase().includes(lowercasedFilter) ||
          value[19].toString().toLowerCase().includes(lowercasedFilter) ||
          value[20].toString().toLowerCase().includes(lowercasedFilter) ||
          value[21].toString().toLowerCase().includes(lowercasedFilter) ||
          value[22].toString().toLowerCase().includes(lowercasedFilter) ||
          value[23].toString().toLowerCase().includes(lowercasedFilter) ||
          value[24].toString().toLowerCase().includes(lowercasedFilter) ||
          value[25].toString().toLowerCase().includes(lowercasedFilter) ||
          value[26].toString().toLowerCase().includes(lowercasedFilter) ||
          value[27].toString().toLowerCase().includes(lowercasedFilter) ||
          value[28].toString().toLowerCase().includes(lowercasedFilter) ||
          value[29].toString().toLowerCase().includes(lowercasedFilter) ||
          value[30].toString().toLowerCase().includes(lowercasedFilter) ||
          value[31].toString().toLowerCase().includes(lowercasedFilter) ||
          value[32].toString().toLowerCase().includes(lowercasedFilter) ||
          value[33].toString().toLowerCase().includes(lowercasedFilter) ||
          value[34].toString().toLowerCase().includes(lowercasedFilter) ||
          value[35].toString().toLowerCase().includes(lowercasedFilter) ||
          value[36].toString().toLowerCase().includes(lowercasedFilter) ||
          value[37].toString().toLowerCase().includes(lowercasedFilter) ||
          value[38].toString().toLowerCase().includes(lowercasedFilter) ||
          value[39].toString().toLowerCase().includes(lowercasedFilter) ||
          value[40].toString().toLowerCase().includes(lowercasedFilter) ||
          value[41].toString().toLowerCase().includes(lowercasedFilter) ||
          value[42].toString().toLowerCase().includes(lowercasedFilter) ||
          value[43].toString().toLowerCase().includes(lowercasedFilter) ||
          value[44].toString().toLowerCase().includes(lowercasedFilter) ||
          value[45].toString().toLowerCase().includes(lowercasedFilter) ||
          value[46].toString().toLowerCase().includes(lowercasedFilter) ||
          value[47].toString().toLowerCase().includes(lowercasedFilter) ||
          value[48].toString().toLowerCase().includes(lowercasedFilter) ||
          value[49].toString().toLowerCase().includes(lowercasedFilter) ||
          value[50].toString().toLowerCase().includes(lowercasedFilter) ||
          value[51].toString().toLowerCase().includes(lowercasedFilter) ||
          value[52].toString().toLowerCase().includes(lowercasedFilter) ||
          value[53].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }

    if (tableSelect.monthlyCalled) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.hourlyCalled) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[0].toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter) ||
          value[13].toString().toLowerCase().includes(lowercasedFilter) ||
          value[14].toString().toLowerCase().includes(lowercasedFilter) ||
          value[15].toString().toLowerCase().includes(lowercasedFilter) ||
          value[16].toString().toLowerCase().includes(lowercasedFilter) ||
          value[17].toString().toLowerCase().includes(lowercasedFilter) ||
          value[18].toString().toLowerCase().includes(lowercasedFilter) ||
          value[19].toString().toLowerCase().includes(lowercasedFilter) ||
          value[20].toString().toLowerCase().includes(lowercasedFilter) ||
          value[21].toString().toLowerCase().includes(lowercasedFilter) ||
          value[22].toString().toLowerCase().includes(lowercasedFilter) ||
          value[23].toString().toLowerCase().includes(lowercasedFilter) ||
          value[24].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.detailImeiCaller) {
      if (value.callerImei) {
        return (
          value.callerImei.toLowerCase().includes(lowercasedFilter) ||
          value.firstCall.toLowerCase().includes(lowercasedFilter) ||
          value.lastCall.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value.duration.toString().toLowerCase().includes(lowercasedFilter) ||
          value.VOICE.toString().toLowerCase().includes(lowercasedFilter) ||
          value.SMS.toString().toLowerCase().includes(lowercasedFilter) ||
          value.CFW.toString().toLowerCase().includes(lowercasedFilter) ||
          value.deltaDate.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.hourlyImeiCaller) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[0].toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter) ||
          value[13].toString().toLowerCase().includes(lowercasedFilter) ||
          value[14].toString().toLowerCase().includes(lowercasedFilter) ||
          value[15].toString().toLowerCase().includes(lowercasedFilter) ||
          value[16].toString().toLowerCase().includes(lowercasedFilter) ||
          value[17].toString().toLowerCase().includes(lowercasedFilter) ||
          value[18].toString().toLowerCase().includes(lowercasedFilter) ||
          value[19].toString().toLowerCase().includes(lowercasedFilter) ||
          value[20].toString().toLowerCase().includes(lowercasedFilter) ||
          value[21].toString().toLowerCase().includes(lowercasedFilter) ||
          value[22].toString().toLowerCase().includes(lowercasedFilter) ||
          value[23].toString().toLowerCase().includes(lowercasedFilter) ||
          value[24].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.detailImeiCalled) {
      if (value.calledImei) {
        return (
          value.calledImei.toLowerCase().includes(lowercasedFilter) ||
          value.firstCall.toLowerCase().includes(lowercasedFilter) ||
          value.lastCall.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value.duration.toString().toLowerCase().includes(lowercasedFilter) ||
          value.VOICE.toString().toLowerCase().includes(lowercasedFilter) ||
          value.SMS.toString().toLowerCase().includes(lowercasedFilter) ||
          value.CFW.toString().toLowerCase().includes(lowercasedFilter) ||
          value.deltaDate.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.hourlyImeiCalled) {
      if (value.called) {
        return (
          value.called.toLowerCase().includes(lowercasedFilter) ||
          value.totalCall.toString().toLowerCase().includes(lowercasedFilter) ||
          value[0].toString().toLowerCase().includes(lowercasedFilter) ||
          value[1].toString().toLowerCase().includes(lowercasedFilter) ||
          value[2].toString().toLowerCase().includes(lowercasedFilter) ||
          value[3].toString().toLowerCase().includes(lowercasedFilter) ||
          value[4].toString().toLowerCase().includes(lowercasedFilter) ||
          value[5].toString().toLowerCase().includes(lowercasedFilter) ||
          value[6].toString().toLowerCase().includes(lowercasedFilter) ||
          value[7].toString().toLowerCase().includes(lowercasedFilter) ||
          value[8].toString().toLowerCase().includes(lowercasedFilter) ||
          value[9].toString().toLowerCase().includes(lowercasedFilter) ||
          value[10].toString().toLowerCase().includes(lowercasedFilter) ||
          value[11].toString().toLowerCase().includes(lowercasedFilter) ||
          value[12].toString().toLowerCase().includes(lowercasedFilter) ||
          value[13].toString().toLowerCase().includes(lowercasedFilter) ||
          value[14].toString().toLowerCase().includes(lowercasedFilter) ||
          value[15].toString().toLowerCase().includes(lowercasedFilter) ||
          value[16].toString().toLowerCase().includes(lowercasedFilter) ||
          value[17].toString().toLowerCase().includes(lowercasedFilter) ||
          value[18].toString().toLowerCase().includes(lowercasedFilter) ||
          value[19].toString().toLowerCase().includes(lowercasedFilter) ||
          value[20].toString().toLowerCase().includes(lowercasedFilter) ||
          value[21].toString().toLowerCase().includes(lowercasedFilter) ||
          value[22].toString().toLowerCase().includes(lowercasedFilter) ||
          value[23].toString().toLowerCase().includes(lowercasedFilter) ||
          value[24].toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    if (tableSelect.simPhone) {
      if (value.caller) {
        return (
          value.caller.toLowerCase().includes(lowercasedFilter) ||
          value.imeiName.toLowerCase().includes(lowercasedFilter) ||
          value.totalImei.toString().toLowerCase().includes(lowercasedFilter)
        );
      }
    }
    return value;
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

  const emptyRows =
    pageRows - Math.min(pageRows, filteredData.length - (page - 1) * pageRows);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHeadView
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
              headCells={column}
              action={false}
              detail={detail}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice((page - 1) * pageRows, (page - 1) * pageRows + pageRows)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  if (tableSelect.detailCall) {
                    return (
                      <TableRowsView
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.dailyCall) {
                    return (
                      <TableRowsCall
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.weeklyCall) {
                    return (
                      <RowsWeeklyCall
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.monthlyCall) {
                    return (
                      <RowsMonthlyCall
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.hourlyCall) {
                    return (
                      <RowsHourlyCall
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.detailCalled) {
                    return (
                      <TableRowsView
                        row={row}
                        index={index}
                        labelId={labelId}
                        caller={false}
                      />
                    );
                  }
                  if (tableSelect.dailyCalled) {
                    return (
                      <RowsDailyCalled
                        row={row}
                        index={index}
                        labelId={labelId}
                        caller={false}
                      />
                    );
                  }
                  if (tableSelect.weeklyCalled) {
                    return (
                      <RowsWeeklyCalled
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.monthlyCalled) {
                    return (
                      <RowsMonthlyCalled
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.hourlyCalled) {
                    return (
                      <RowsHourlyCall
                        row={row}
                        index={index}
                        labelId={labelId}
                        caller={false}
                      />
                    );
                  }
                  if (tableSelect.detailImeiCaller) {
                    return (
                      <RowsDetailImeiCall
                        row={row}
                        index={index}
                        labelId={labelId}
                        caller={true}
                      />
                    );
                  }
                  if (tableSelect.hourlyImeiCaller) {
                    return (
                      <RowsHourlyImei
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.detailImeiCalled) {
                    return (
                      <RowsDetailImeiCall
                        row={row}
                        index={index}
                        labelId={labelId}
                        caller={false}
                      />
                    );
                  }
                  if (tableSelect.hourlyImeiCalled) {
                    return (
                      <RowsHourlyImei
                        row={row}
                        index={index}
                        labelId={labelId}
                      />
                    );
                  }
                  if (tableSelect.simPhone) {
                    return (
                      <RowsSimPhone row={row} index={index} labelId={labelId} />
                    );
                  }
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
    </div>
  );
}
