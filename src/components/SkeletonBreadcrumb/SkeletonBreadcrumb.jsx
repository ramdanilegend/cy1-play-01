import React from "react";
import { Breadcrumbs } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SkeletonBreadcrumb = (props) => {
  const { data } = props;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data.map((value) => {
        <Skeleton variant="text" key={value.key} height="20px" width="70px" />;
      })}
    </Breadcrumbs>
  );
};

export default SkeletonBreadcrumb;
