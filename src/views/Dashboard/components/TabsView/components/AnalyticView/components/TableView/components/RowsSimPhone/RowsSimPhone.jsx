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
import DashboardService from "services/DashboardService";
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
    maxHeight: 100,
    // maxWidth: 700,
    overflowX: "hidden",
    direction: "rtl",
  },
  tableExpand: {
    direction: "ltr",
  },
}));

const RowsSimPhone = (props) => {
  const { row, index, labelId } = props;
  const dashboardContext = React.useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [dataDropdown, setDataDropdown] = React.useState([]);
  const classes = useStyles();
  const [error, setError] = React.useState(true);

  const getDropdown = async (data) => {
    setOpen(!open);
    if (!open) {
      try {
        const getData = await DashboardService.postDropdownDetail({
          ANumber: data.caller,
          BNumber: data.called,
          daterangepicker: dashboardContext.state.dashboardView.daterangepicker,
          Calltype: data.callType,
        });
        setDataDropdown(getData.data.tabledatahits);
        setTimeout(() => {
          setError(false);
        }, [500]);
      } catch (error) {
        setError(true);
        console.log(error);
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
        >
          {row.caller}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.imeiName}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row.totalImei}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
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
                  {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
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
                          Imei 1
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Imei 2
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Imsi 1
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 120 }}>
                          Imsi 2
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: 500 }}>
                          Site Name
                        </TableCell>
                        <TableCell align="right">Long/Lat</TableCell>
                        <TableCell align="right">Link</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {dataDropdown.map((dataRow) => (
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
                          <TableCell align="right">{dataRow.Aimei}</TableCell>
                          <TableCell align="right">{dataRow.Bimei}</TableCell>
                          <TableCell align="right">{dataRow.Aimsi}</TableCell>
                          <TableCell align="right">{dataRow.Bimsi}</TableCell>
                          <TableCell align="left">
                            {dataRow.ASitename}
                          </TableCell>
                          <TableCell align="right">
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
                          <TableCell align="right">
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

export default RowsSimPhone;
