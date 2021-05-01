import React from "react";

import { Box, Grid } from "@material-ui/core";
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

const Movement = () => {
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
      const response = await GeoAnalyticService.postGeoMovement(
        dashboardContext.state
      );
      let lng;
      let lat;
      response.data.geoAnalyticMovementCall.map((value, index) => {
        if (
          response.data.geoAnalyticMovementCall[index].Alongitude &&
          response.data.geoAnalyticMovementCall[index].Alatitude
        ) {
          lng = response.data.geoAnalyticMovementCall[index].Alongitude;
          lat = response.data.geoAnalyticMovementCall[index].Alatitude;
          return true;
        }
      });
      setInitMap({
        ...initMap,
        center: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      });

      setDatas(response.data.geoAnalyticMovementCall);
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
          <AppTableToolbar title="Movement" />
          {/* <TableView datasTable={datas} /> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Movement;
