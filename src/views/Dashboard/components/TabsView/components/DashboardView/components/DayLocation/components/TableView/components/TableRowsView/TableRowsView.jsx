import React from "react";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import {
  TableCell,
  TableRow,
  Table,
  Box,
  IconButton,
  Collapse,
  Typography,
  TableBody,
  TableHead,
  Link,
  CircularProgress,
  TableContainer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import DashboardService from "services/DashboardService";
import DashboardContext from "context/DashboardContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  container: {
    maxHeight: 300,
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
  cells: {
    borderRight: "1px solid #eeeeee",
  },
  tableHeadExpand: {
    // backgroundColor: "#000000",
    borderBottom: "1px solid #000000",
  },
  tableContainer: {
    width: "100%",
    maxHeight: 250,
    // maxWidth: 700,
    overflowX: "hidden",
    direction: "rtl",
  },
  tableExpand: {
    direction: "ltr",
  },
}));

const TableRowsView = (props) => {
  const { row, index, labelId } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [datas, setDatas] = React.useState([]);
  const [error, setError] = React.useState(true);
  const dashboardContext = React.useContext(DashboardContext);

  const getDropdownDetail = async (data) => {
    setOpen(!open);
    try {
      const response = await DashboardService.postDropdownDay({
        msisdn: dashboardContext.state.msisdn,
        daterangepicker: dashboardContext.state.daterangepicker,
        ASitename: data.siteName,
      });
      setDatas(response.data.tabledatahits);
      setError(false);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
  };

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              getDropdownDetail(row);
            }}
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
          {row.siteName}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row.totalCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row.duration}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
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
          className={classes.cells}
        >
          {row.AlaccId}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="center"
          className={classes.cells}
        >
          <Link
            href={`https://www.google.com/maps/?q=${row.lat},${row.long}`}
            target="_blank"
          >
            Link
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {error ? (
              <Box
                margin={1}
                display="flex"
                alignItems="center"
                color="#2196f3"
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <Box margin={1} width="100%" display="flex" maxHeight={700}>
                <TableContainer className={classes.tableContainer}>
                  <Table
                    stickyHeader
                    size="small"
                    aria-label="dropdown detail"
                    className={classes.tableExpand}
                  >
                    <TableHead className={classes.tableHeadExpand}>
                      <TableRow>
                        <TableCell>Caller</TableCell>
                        <TableCell>Called</TableCell>
                        <TableCell align="right">Call Date</TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Call Time
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Call Type
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Caller Imei
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Called Imei
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Caller Imsi
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Called Imsi
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: 500 }}>
                          Site Name
                        </TableCell>
                        <TableCell align="right">Total Call</TableCell>
                        <TableCell align="right">Long/Lat</TableCell>
                        <TableCell align="right">Link</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {datas.map((dataRow) => (
                        <TableRow key={dataRow.date}>
                          <TableCell component="th" scope="row">
                            {dataRow.caller}
                          </TableCell>
                          <TableCell>{dataRow.called}</TableCell>
                          <TableCell align="right">
                            {dataRow.callDate}
                          </TableCell>
                          <TableCell align="right">
                            {dataRow.callTime}
                          </TableCell>
                          <TableCell align="right">
                            {dataRow.callType}
                          </TableCell>
                          <TableCell align="right">{dataRow.AImei}</TableCell>
                          <TableCell align="right">{dataRow.BImei}</TableCell>
                          <TableCell align="right">{dataRow.AImsi}</TableCell>
                          <TableCell align="right">{dataRow.BImsi}</TableCell>
                          <TableCell align="left">
                            {dataRow.ASitename}
                          </TableCell>
                          <TableCell align="left">{dataRow.duration}</TableCell>
                          <TableCell align="right">
                            {clsx({
                              [`${dataRow.Alongitude} , ${dataRow.Alatitude}`]:
                                dataRow.Alongitude && dataRow.Alatitude,
                              [`, ${dataRow.Alatitude}`]:
                                !dataRow.Alongitude && dataRow.Alatitude,
                              [`${dataRow.Alongitude} ,`]:
                                !dataRow.Alatitude && dataRow.Alongitude,
                              [""]: !dataRow.Alongitude && !dataRow.Alatitude,
                            })}
                          </TableCell>
                          <TableCell align="right">
                            <Link
                              href={`https://www.google.com/maps/?q=${dataRow.Alatitude},${dataRow.Alongitude}`}
                              target="_blank"
                            >
                              Link
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TableRowsView;
