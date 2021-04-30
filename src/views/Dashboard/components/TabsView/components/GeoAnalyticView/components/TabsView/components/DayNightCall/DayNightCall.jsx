import React from "react";

import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccordionView, MapView, ToolbarView, TableView } from "./components";
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

const DayNightCall = () => {
  const classes = useStyles();
  const dashboardContext = React.useContext(DashboardContext);
  const [datas, setDatas] = React.useState([]);
  const [select, setSelect] = React.useState({
    dayNight: true,
    day: false,
    night: false,
  });
  const [initMap, setInitMap] = React.useState({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 8,
  });

  const filterDayNight = async () => {
    try {
      const response = await GeoAnalyticService.postGeoDayNight(
        dashboardContext.state
      );
      const initLongLat = response.data.geoAnalyticDaynightCall[0].longlat;
      const getinitLongLat = initLongLat.split(",");
      setInitMap({
        ...initMap,
        center: {
          lat: parseFloat(getinitLongLat[1]),
          lng: parseFloat(getinitLongLat[0]),
        },
      });
      setDatas(response.data.geoAnalyticDaynightCall);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
    setSelect({ ...select, dayNight: true, day: false, night: false });
  };
  const filterNight = async () => {
    try {
      const response = await GeoAnalyticService.postGeoDayNight(
        dashboardContext.state
      );
      const initLongLat = response.data.geoAnalyticDaynightCall[0].longlat;
      let maa = [];
      response.data.geoAnalyticDaynightCall.map((value) => {
        if (value.description === "Night") {
          maa.push(value);
        }
      });
      const getinitLongLat = initLongLat.split(",");
      setInitMap({
        ...initMap,
        center: {
          lat: parseFloat(getinitLongLat[1]),
          lng: parseFloat(getinitLongLat[0]),
        },
      });
      setDatas(maa);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
    setSelect({ ...select, dayNight: false, day: false, night: true });
  };

  const filterDay = async () => {
    try {
      const response = await GeoAnalyticService.postGeoDayNight(
        dashboardContext.state
      );
      let maa = [];
      const initLongLat = response.data.geoAnalyticDaynightCall[0].longlat;
      response.data.geoAnalyticDaynightCall.map((value) => {
        if (value.description === "Day") {
          maa.push(value);
        }
      });
      const getinitLongLat = initLongLat.split(",");
      setInitMap({
        ...initMap,
        center: {
          lat: parseFloat(getinitLongLat[1]),
          lng: parseFloat(getinitLongLat[0]),
        },
      });
      setDatas(response.data.geoAnalyticDaynightCall);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
    setSelect({ ...select, dayNight: false, day: true, night: false });
  };

  React.useEffect(async () => {
    try {
      const response = await GeoAnalyticService.postGeoDayNight(
        dashboardContext.state
      );
      const initLongLat = response.data.geoAnalyticDaynightCall[0].longlat;
      const getinitLongLat = initLongLat.split(",");
      setInitMap({
        ...initMap,
        center: {
          lat: parseFloat(getinitLongLat[1]),
          lng: parseFloat(getinitLongLat[0]),
        },
      });
      setDatas(response.data.geoAnalyticDaynightCall);
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
          <ToolbarView
            title="Day Night Calls"
            dayNight={filterDayNight}
            day={filterDay}
            night={filterNight}
            selected={select}
          />
          <TableView datasTable={datas} />
          {/* <AccordionView data={datas} /> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DayNightCall;
