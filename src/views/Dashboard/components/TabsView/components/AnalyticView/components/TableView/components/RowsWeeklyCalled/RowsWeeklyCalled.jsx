import React from "react";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  Box,
  IconButton,
  Collapse,
  Typography,
  TableHead,
  CircularProgress,
  TableContainer,
  Link,
} from "@material-ui/core";
import AnalyticService from "services/AnalyticService";
// import AnalyticService from "services/AnalyticService";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import DashboardContext from "context/DashboardContext";
import clsx from "clsx";

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
    maxHeight: 300,
    // maxWidth: 700,
    overflowX: "hidden",
    direction: "rtl",
  },
  tableExpand: {
    direction: "ltr",
  },
}));

const TableRowsCalled = (props) => {
  const { row, index, labelId, query } = props;
  const dashboardContext = React.useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [dataDropdown, setDataDropdown] = React.useState([]);
  const classes = useStyles();
  const [error, setError] = React.useState(true);

  const getDropdown = async (data) => {
    setOpen(!open);
    if (!open) {
      try {
        const respone = await AnalyticService.postDropdownCalled({
          BNumber: data.called,
          daterangepicker: dashboardContext.state.dashboardView.daterangepicker,
        });
        setDataDropdown(respone.data.tabledatahits);
        setTimeout(() => {
          setError(false);
        }, [500]);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }
  };
  const [call, setCall] = React.useState(true);

  React.useEffect(() => {
    setOpen(false);
  }, [query]);

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
              getDropdown(row);
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
          align="right"
        >
          {row.called}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row["totalCall"]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[1]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row[2]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row[3]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[4]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[5]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[6]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[7]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[8]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[9]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[10]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[11]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[12]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[13]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[14]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[15]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[16]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[17]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[18]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[19]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[20]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[21]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[22]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[23]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[24]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[25]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[26]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[27]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[28]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[29]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[30]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[31]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[32]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[33]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[34]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[35]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[36]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[37]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[38]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[39]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[40]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[41]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[42]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[43]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[44]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[45]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[46]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[47]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[48]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[49]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[50]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[51]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[52]}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="right"
          className={classes.cells}
        >
          {row[53]}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={56}>
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
                        <TableCell className={classes.cells} align="left">
                          Caller
                        </TableCell>
                        <TableCell className={classes.cells}>Called</TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Call Date
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Call Time
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Call Type
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Caller IMEI
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Called IMEI
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Caller IMSI
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Called IMSI
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 500 }}
                          className={classes.cells}
                        >
                          Site Name
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: 120 }}
                          className={classes.cells}
                        >
                          Duration
                        </TableCell>
                        <TableCell align="left" className={classes.cells}>
                          Long/Lat
                        </TableCell>
                        <TableCell align="left" className={classes.cells}>
                          Link
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {dataDropdown.map((dataRow) => (
                        <TableRow key={dataRow.date}>
                          <TableCell
                            component="th"
                            scope="row"
                            align="left"
                            className={classes.cells}
                          >
                            {dataRow.caller}
                          </TableCell>
                          <TableCell className={classes.cells}>
                            {dataRow.called}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.callDate}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.callTime}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.callType}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.AImei}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.BImei}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.AImsi}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.BImsi}
                          </TableCell>
                          <TableCell align="left" className={classes.cells}>
                            {dataRow.ASitename}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {dataRow.duration}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            {clsx({
                              [row.Alongitude + "," + row.Alatitude]:
                                row.Alongitude && row.Alatitude,
                              ["," + row.Alatitude]:
                                !row.Alongitude && row.Alatitude,
                              [row.Alongitude + ","]:
                                !row.Alatitude && row.Alongitude,
                              [""]: !row.Alongitude && !row.Alatitude,
                            })}
                          </TableCell>
                          <TableCell align="right" className={classes.cells}>
                            <Link
                              href={`https://www.google.com/maps/?q=${row.Alatitude},${row.Alongitude}`}
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

export default TableRowsCalled;
