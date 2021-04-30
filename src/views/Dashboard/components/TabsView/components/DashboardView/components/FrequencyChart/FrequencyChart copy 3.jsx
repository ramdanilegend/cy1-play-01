import React from "react";

import { AppTableToolbar, TableContainer } from "components";
import AnyChart from "anychart-react";
import anychart from "anychart";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box } from "@material-ui/core";
import { SkeletonDashboardComponent } from "components";
import DashboardContext from "context/DashboardContext";

const FrequencyChart = () => {
  const dashboardContext = React.useContext(DashboardContext);
  const data = dashboardContext.state.dashboardView.dashboardFrequency;
  const [dataLine, setDataLine] = React.useState([]);
  const [error, setError] = React.useState(true);
  const chart = anychart.line();

  const series = chart.line(dataLine);
  series.normal().stroke("#00cc99", 1, "10 5", "round");
  series.xMode("scatter");
  chart.xAxis().staggerMode(true);

  chart.crosshair().enabled(true).yLabel(false).yStroke(null);
  chart
    .tooltip()
    .format(
      "Total Call : {%value}\n Persentase : {%yPercentOfTotal}{decimalsCount:1}%"
    );
  React.useEffect(() => {
    let dataChart = [];
    if (data) {
      if (data.length > 10) {
        data.sort((a, b) => {
          return b.totalCall - a.totalCall;
        });
        let dataTopTen = data.slice(0, 10);
        dataTopTen.sort((a, b) => {
          return a.totalCall - b.totalCall;
        });
        dataTopTen.map((value) => {
          dataChart.push([value.called, value.totalCall]);
        });
        dataChart.sort((a, b) => {
          return a[1] - b[1];
        });
        setDataLine(dataChart);

        // console.log(dataLine);
      } else {
        data.sort((a, b) => {
          return a.totalCall - b.totalCall;
        });
        data.map((value) => {
          dataChart.push([value.called, value.totalCall]);
        });
        setDataLine(dataChart);
      }
      setError(false);
    }
  }, []);
  return (
    <React.Fragment>
      <TableContainer>
        <AppTableToolbar title="Frequency Chart" />
        {error ? (
          <SkeletonDashboardComponent height="220px" />
        ) : (
          <Box width="100%" overflow="auto" height="300">
            <PerfectScrollbar>
              <Box width="900px" height="300">
                <AnyChart
                  id="frequency-chart"
                  instance={chart}
                  height={220}
                  minWidth={800}
                />
              </Box>
            </PerfectScrollbar>
          </Box>
        )}
      </TableContainer>
    </React.Fragment>
  );
};

export default FrequencyChart;
