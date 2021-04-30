import React from "react";

import { Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccordionView, MapView } from "./components";
import { AppTableToolbar } from "components";
import GeoAnalyticService from "services/GeoAnalyticService";
import DashboardContext from "context/DashboardContext";

const useStyles = makeStyles((theme) => ({
  map: {
    display: "flex",
    width: "100%",
    height: "500px",
  },
}));

const FrequentVisit = () => {
  const classes = useStyles();
  const [datas, setDatas] = React.useState([]);
  const [initMap, setInitMap] = React.useState({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 8,
  });
  const dashboardContext = React.useContext(DashboardContext);
  React.useEffect(async () => {
    try {
      const response = await GeoAnalyticService.postGeoFrequent(
        dashboardContext.state
      );
      const initLongLat = response.data.geoAnalyticFrequentCall[0].longlat;
      const getinitLongLat = initLongLat.split(",");
      setInitMap({
        ...initMap,
        center: {
          lat: parseFloat(getinitLongLat[1]),
          lng: parseFloat(getinitLongLat[0]),
        },
      });
      setDatas(response.data.geoAnalyticFrequentCall);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item md={6}>
        <MapView data={datas} initMap={initMap} />
      </Grid>
      <Grid item md={6}>
        <Box border="1px solid #C8CED3" borderRadius="5px">
          <AppTableToolbar title="Frequent Visit" />
          <AccordionView data={datas} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FrequentVisit;
