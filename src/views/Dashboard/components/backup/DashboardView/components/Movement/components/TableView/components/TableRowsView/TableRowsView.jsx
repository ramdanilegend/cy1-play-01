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
  TableHead,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
}));

const TableRowsView = (props) => {
  const { row, index, labelId } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
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
            onClick={() => setOpen(!open)}
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
          {row.caller}
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
          className={classes.cells}
        >
          {row.callDate}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          className={classes.cells}
          align="right"
        >
          {row.callTime}
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
          {row.ASitename}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="center"
          className={classes.cells}
        >
          {clsx({
            [row.Alongitude + "," + row.Alatitude]:
              row.Alongitude && row.Alatitude,
            ["," + row.Alatitude]: !row.Alongitude && row.Alatitude,
            [row.Alongitude + ","]: !row.Alatitude && row.Alongitude,
            [""]: !row.Alongitude && !row.Alatitude,
          })}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          align="center"
          className={classes.cells}
        >
          <Link
            href={`https://www.google.com/maps/?q=${row.Alatitude},${row.Alongitude}`}
            target="_blank"
          >
            Link
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                            {rows.history.map((historyRow) => (
                              <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">
                                  {historyRow.date}
                                </TableCell>
                                <TableCell>{historyRow.customerId}</TableCell>
                                <TableCell align="right">
                                  {historyRow.amount}
                                </TableCell>
                                <TableCell align="right">
                                  {Math.round(
                                    historyRow.amount * rows.price * 100
                                  ) / 100}
                                </TableCell>
                              </TableRow> */}
                {/* ))} */}
                {/* </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TableRowsView;
