import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationRounded(props) {
  const { dataLength, handleChange, pageRows, page } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        shape="rounded"
        color="primary"
        page={page}
        count={Math.ceil(dataLength / pageRows)}
        showFirstButton
        showLastButton
        boundaryCount={2}
        onChange={handleChange}
      />
    </div>
  );
}
