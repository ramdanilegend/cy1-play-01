import React from "react";
import { TableContainer, AppTableToolbar } from "components";
// import WordCloud from "react-d3-cloud";
import AnyChart from "anychart-react";

import { Box } from "@material-ui/core";

const TopCalls = (props) => {
  const { data } = props;
  let datas = [{ text: "test", value: 12 }];

  React.useEffect(() => {
    if (data) {
      data.map((value) => {
        datas.push({ text: value.BNumber, value: value.totalCall });
      });
      console.log(datas);
    }
  }, [data]);

  return (
    <TableContainer>
      <AppTableToolbar title="Top Calls" />
      <AnyChart type="pie" data={[1, 2, 3, 4]} title="Simple pie chart" />
    </TableContainer>
  );
};

export default TopCalls;
