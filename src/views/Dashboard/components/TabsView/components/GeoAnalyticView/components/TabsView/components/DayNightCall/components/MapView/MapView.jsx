import React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { apiGoogleMap } from "config.json";
import { makeStyles } from "@material-ui/core/styles";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import red from "assets/img/red30.png";
import black from "assets/img/black30.png";

const useStyles = makeStyles((theme) => ({
  map: {
    display: "flex",
    width: "100%",
    height: "500px",
  },
}));

const MapView = ({ data, initMap }) => {
  const [datas, setDatas] = React.useState({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 4,
  });
  const classes = useStyles();
  const mapRef = React.useRef();
  const loader = new Loader({
    apiKey: apiGoogleMap,
    version: "weekly",
    libraries: ["places"],
  });
  // let map;
  React.useEffect(() => {
    if (data) {
      console.log(data);
      setDatas({
        ...datas,
        center: {
          lat: 0,
          lng: 0,
        },
      });
      loader
        .load()
        .then(() => {
          const map = new window.google.maps.Map(mapRef.current, initMap);
          const infowindow = new window.google.maps.InfoWindow();
          const icons = {
            day: {
              icon: red,
            },
            night: {
              icon: black,
            },
          };
          const features = [];
          data.map((value, i) => {
            const longlat = value.longlat;
            const getLongLat = longlat.split(",");
            features.push({
              position: new window.google.maps.LatLng(
                parseFloat(getLongLat[1]),
                parseFloat(getLongLat[0])
              ),
              type: value.description === "Day" ? "day" : "night",
            });
            const marker = new window.google.maps.Marker({
              position: features[i].position,
              icon: icons[features[i].type].icon,
              map: map,
            });
            window.google.maps.event.addListener(
              marker,
              "click",
              (function (marker, i) {
                return function () {
                  infowindow.setContent(
                    `Site Name : ${value.siteName} <br /> Total Call : ${value.totalCall}`
                  );
                  infowindow.open(map, marker);
                };
              })(marker, i)
            );
          });
        })
        .catch((e) => {
          // do something
        });
    }
  }, [data, initMap]);

  return <div ref={mapRef} className={classes.map}></div>;
};

export default MapView;
