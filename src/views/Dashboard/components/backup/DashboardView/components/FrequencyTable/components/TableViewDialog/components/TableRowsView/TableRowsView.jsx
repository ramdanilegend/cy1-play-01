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
} from "@material-ui/core";
import DashboardService from "services/DashboardService";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

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
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #000000",
  },
}));

const TableRowsView = (props) => {
  const { row, index, labelId } = props;
  const [open, setOpen] = React.useState(false);
  const [dataDropdown, setDataDropdown] = React.useState([]);
  const classes = useStyles();
  const [error, setError] = React.useState(true);
  const getDropdown = async () => {
    setOpen(!open);
    if (!open) {
      try {
        const getData = await DashboardService.postDropdownDetail();
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
            onClick={getDropdown}
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
          {row.called}
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
        >
          {row.callType}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.firstCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
        >
          {row.lastCall}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row.deltaDate}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {error ? (
              <Box margin={1}>
                <Table size="small" aria-label="dropdown detail">
                  <TableHead className={classes.tableHeadExpand}>
                    <TableRow>
                      <TableCell>
                        <Skeleton variant="rect" width={500} height={20} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </Box>
            ) : (
              <Box margin={1}>
                {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
                <Table size="small" aria-label="dropdown detail">
                  <TableHead className={classes.tableHeadExpand}>
                    <TableRow>
                      <TableCell>Caller</TableCell>
                      <TableCell>Called</TableCell>
                      <TableCell align="right">Call Date</TableCell>
                      <TableCell align="right">Call Time</TableCell>
                      <TableCell align="right">Call Type</TableCell>
                      <TableCell align="right">Imei 1</TableCell>
                      <TableCell align="right">Imei 2</TableCell>
                      <TableCell align="right">Imsi 1</TableCell>
                      <TableCell align="right">Imsi 2</TableCell>
                      <TableCell align="right">Site Name</TableCell>
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
                        <TableCell align="right">{dataRow.callDate}</TableCell>
                        <TableCell align="right">{dataRow.callTime}</TableCell>
                        <TableCell align="right">{dataRow.callType}</TableCell>
                        <TableCell align="right">{dataRow.Aimei}</TableCell>
                        <TableCell align="right">{dataRow.Bimei}</TableCell>
                        <TableCell align="right">{dataRow.Aimsi}</TableCell>
                        <TableCell align="right">{dataRow.Bimsi}</TableCell>
                        <TableCell align="right">{dataRow.ASitename}</TableCell>
                        <TableCell align="right">-</TableCell>
                        <TableCell align="right">-</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TableRowsView;
