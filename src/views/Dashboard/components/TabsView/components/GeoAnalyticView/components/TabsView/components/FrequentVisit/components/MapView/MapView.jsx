import React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { apiGoogleMap } from "config.json";
import { makeStyles } from "@material-ui/core/styles";

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
  // let map;
  React.useEffect(() => {
    const loader = new Loader({
      apiKey: apiGoogleMap,
      version: "weekly",
      libraries: ["places"],
    });
    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 4,
    };
    if (data) {
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
          data.map((value, i) => {
            const longlat = value.longlat;
            const getLongLat = longlat.split(",");
            const marker = new window.google.maps.Marker({
              position: {
                lat: parseFloat(getLongLat[1]),
                lng: parseFloat(getLongLat[0]),
              },
              map,
              title: "Hello World!",
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
