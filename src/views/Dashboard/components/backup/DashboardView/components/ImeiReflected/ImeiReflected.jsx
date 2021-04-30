import React from "react";
import { PieChart } from "@dvsl/zoomcharts";
import { AppTableToolbar, TableContainer } from "components";
import { Box, Grid } from "@material-ui/core";
import AnyChart from "anychart-react";
import anychart from "anychart";
import DashboardContext from "context/DashboardContext";

import { makeStyles } from "@material-ui/core/styles";
import { SkeletonDashboardComponent } from "components";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxHeight: 300,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    border: "1px solid #C8CED3",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
}));

function ImeiRefelcted() {
  const dashboardContext = React.useContext(DashboardContext);
  const data = dashboardContext.state.dashboardView.dashboardPieChartImei;
  const classes = useStyles();
  const [dataDonut, setDataDonut] = React.useState([]);
  const [error, setError] = React.useState(true);
  const chart = anychart.pie(dataDonut);

  chart
    .interactivity("single")
    .legend(false)
    .radius("43%")
    .labels(false)
    .innerRadius("70%");
  chart
    .tooltip()
    .format(
      "No Tlp : {%number}\n Persentase : {%yPercentOfTotal}{decimalsCount:1}%"
    );
  React.useEffect(() => {
    if (data) {
      let dataArray = [];
      data.map((value) => {
        dataArray.push({
          x: value.AImei,
          value: value.count,
          number: value.ANumber,
        });
      });
      setDataDonut(dataArray);
      setError(false);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <AppTableToolbar title="Imei Reflected" />
      <Box>
        {error ? (
          <SkeletonDashboardComponent height="250px" />
        ) : (
          <React.Fragment>
            <Box padding="2px 15px 0px 15px">
              <Box fontSize="15px">IMEI Reflected : {dataDonut.length} </Box>
            </Box>
            <AnyChart id="imei-reflected" instance={chart} height={235} />
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}

export default ImeiRefelcted;
