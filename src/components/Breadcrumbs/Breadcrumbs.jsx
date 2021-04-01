import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nonActive: {
    color: theme.palette.text.primary,
  },
  active: {
    color: "#20A8D8",
  },
}));

const AppBreadcrumbs = (props) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data.map((datas, index) => (
        <Typography
          color={datas.color}
          key={index}
          className={datas.aktif ? classes.active : classes.nonActive}
        >
          {datas.title}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
