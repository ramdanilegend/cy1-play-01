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
  const [dataLine, setDataLine] = React.useState(
    ["January", 10000],
    ["February", 12000],
    ["March", 18000],
    ["April", 11000],
    ["May", 9000]
  );
  const [error, setError] = React.useState(true);
  const chart = anychart.line();

  const series = chart.line(dataLine);
  series.normal().stroke("#00cc99", 1, "10 5", "round");
  // series.xMode("scatter");
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
        const a = data.sort((a, b) => {
          return b.totalCall - a.totalCall;
        });
        console.log(a);
        let dataTopTen = data.slice(0, 10);
        const b = dataTopTen.sort((a, b) => {
          return a.totalCall - b.totalCall;
        });
        console.log(b);
        b.map((value) => {
          dataChart.push([value.called, value.totalCall]);
        });
        console.log(dataChart);

        setDataLine(dataChart);

        // console.log(dataLine);
      } else {
        data.sort((a, b) => {
          return a.totalCall - b.totalCall;
        });
        data.map((value) => {
          dataChart.push([value.called, value.totalCall]);
        });
        // setDataLine(dataChart);
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
