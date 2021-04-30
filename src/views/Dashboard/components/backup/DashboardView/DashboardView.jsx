import React from "react";
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
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <FrequencyTable />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <FrequencyChart />
        </Grid>
        <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
          <ImeiReflected />
        </Grid>
        <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
          <TopCalls />
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
    </React.Fragment>
  );
};

export default DashboardView;
