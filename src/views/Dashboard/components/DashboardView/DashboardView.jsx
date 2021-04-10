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

const DashboardView = () => {
  const [data, setData] = React.useState([]);
  const getData = async () => {
    const data = await Service.postData();
    setData(data.data ? data.data : []);
  };
  React.useEffect(() => {
    getData();
    console.log(data);
  }, []);
  return (
    <DashboardContext.Provider
      value={{
        state: data,
        updateState: getData,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <FrequencyTable />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <FrequencyChart />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Movement />
        </Grid>
        <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
          <ImeiReflected />
        </Grid>
        <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
          <TopCalls />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <DayLocation />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <NightLocation />
        </Grid>
      </Grid>
    </DashboardContext.Provider>
  );
};

export default DashboardView;
