import React from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import { AddBox } from "@material-ui/icons";
import { Box } from "@material-ui/core";

const TopCall = ({ data }) => {
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      let dataBar = [];
      data.map((value, index) => {
        dataBar.push([`${index}`, value.totalCall]);
      });
      setDatas(dataBar);
    }
  }, [data]);
  const chart = anychart.bar();
  const series = chart.bar(datas);
  series.normal().fill("#ffa000", 0.3);
  series.normal().stroke(null);
  chart.draw();
  return (
    <Box display="flex" width="100%">
      <AnyChart id="bar-chart-geo" instance={chart} height={235} />
    </Box>
  );
};

export default TopCall;
