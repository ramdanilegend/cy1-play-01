import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const AppBreadcrumbs = (props) => {
  const { data } = props;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data.map((datas, index) => (
        <Typography color={datas.color} key={index}>
          {datas.title}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
