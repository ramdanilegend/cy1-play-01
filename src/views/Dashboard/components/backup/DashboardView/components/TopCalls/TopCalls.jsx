import React from "react";
import { TableContainer, AppTableToolbar } from "components";
// import WordCloud from "react-d3-cloud";
import AnyChart from "anychart-react";
import anychart from "anychart";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SkeletonDashboardComponent } from "components";
import DashboardContext from "context/DashboardContext";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxHeight: 300,
    minHeight: 300,
    border: "1px solid #C8CED3",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
}));
const TopCalls = () => {
  const dashboardContext = React.useContext(DashboardContext);
  const data = dashboardContext.state.dashboardView.dashboardWorldCloudBNumber;
  const [error, setError] = React.useState(true);
  const classes = useStyles();
  let datas = [];
  const [dataTag, setDataTag] = React.useState([]);
  const chart = anychart.tagCloud(dataTag);
  chart.mode("spiral");
  chart.angles([0]);
  chart.textSpacing(1);
  chart
    .tooltip()
    .format("Total Call : {%value}\nPersentase : {%yPercentOfTotal}%");
  React.useEffect(() => {
    if (data) {
      data.map((value) => {
        datas.push({ x: value.BNumber, value: value.totalCall });
      });

      setDataTag(datas);
      setError(false);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <AppTableToolbar title="Top Calls" />
      {error ? (
        <SkeletonDashboardComponent height="250px" />
      ) : (
        <AnyChart id="top-call" instance={chart} height={250} />
      )}
    </div>
  );
};

export default TopCalls;
