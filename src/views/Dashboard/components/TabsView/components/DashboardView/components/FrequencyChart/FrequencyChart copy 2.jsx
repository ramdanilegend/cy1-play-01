import React from "react";

import { AppTableToolbar, TableContainer } from "components";
import {
  Chart,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
} from "chart.js";

const FrequencyChart = (props) => {
  const { data } = props;
  const chartRef = React.createRef();

  Chart.register(
    LineController,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale
  );
  React.useEffect(() => {
    if (data) {
      const myChartRef = chartRef.current.getContext("2d");
      let count = [];
      let number = [];

      if (data.length > 10) {
        data.sort((a, b) => {
          return b.totalCall - a.totalCall;
        });
        const dataTopTen = data.slice(0, 10);
        dataTopTen.sort((a, b) => {
          return a.totalCall - b.totalCall;
        });
        dataTopTen.map((value) => {
          count.push(value.totalCall);
          number.push(value.called);
        });
      } else {
        data.sort((a, b) => {
          return a.totalCall - b.totalCall;
        });
        data.map((value) => {
          count.push(value.totalCall);
          number.push(value.called);
        });
      }

      const dataChart = {
        labels: number,
        datasets: [
          {
            label: "Total Call ",
            data: count,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      const options = {
        responsive: true,
      };
      new Chart(myChartRef, {
        type: "line",
        data: dataChart,
        // options: options,
      });
    }
  }, [data]);
  return (
    <TableContainer>
      <AppTableToolbar title="Frequency Chart" />
      <div style={{ display: "flex", overflow: "auto" }}>
        <canvas ref={chartRef} width="600" height="200" />
      </div>
    </TableContainer>
  );
};

export default FrequencyChart;
