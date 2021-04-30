import React from "react";

import Service from "services/DashboardService";
import DashboardContext from "context/DashboardContext";

import { Grid } from "@material-ui/core";
import {
  DayLocation,
  FrequencyChart,
  FrequencyTable,
  ImeiReflected,
  Movement,
  NightLocation,
  TopCalls,
} from "./components";
import { SkeletonDashboardScreen } from "components";

const DashboardView = () => {
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(false);
  const getData = async () => {
    try {
      const dataGet = await Service.postData();
      setData(dataGet.data ? dataGet.data : {});
      // console.log(dataGet.data);
      setError(false);
    } catch (ex) {
      if (!ex.response) {
        setError(true);
        return true;
      }
    }
  };

  React.useEffect(() => {
    getData();
    // setFrequency(data.dashboardPieChartImei);
  }, []);

  return (
    <React.Fragment>
      {/* {error ? (
        <SkeletonDashboardScreen />
      ) : ( */}
      <DashboardContext.Provider
        value={{
          state: data,
          // stateFrequency: data.dashboardFrequency,
          updateState: getData,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <FrequencyTable />
          </Grid>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <FrequencyChart data={data.dashboardFrequency} />
          </Grid>
          <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
            <ImeiReflected data={data.dashboardPieChartImei} />
          </Grid>
          <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
            <TopCalls data={data.dashboardWorldCloudBNumber} />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Movement />
          </Grid>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <DayLocation />
          </Grid>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <NightLocation />
          </Grid>
        </Grid>
      </DashboardContext.Provider>

      {/* )} */}
    </React.Fragment>
  );
};

export default DashboardView;
