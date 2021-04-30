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
      console.log(initMap);
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
          let polyLine = [];
          data.map((value, i) => {
            const marker = new window.google.maps.Marker({
              position: {
                lat: parseFloat(value.Alatitude),
                lng: parseFloat(value.Alongitude),
              },
              map,
              title: "Hello World!",
            });
            if (value.Alatitude && value.Alongitude) {
              polyLine.push({
                lat: parseFloat(value.Alatitude),
                lng: parseFloat(value.Alongitude),
              });
            }
            if (value.ASitename) {
              window.google.maps.event.addListener(
                marker,
                "click",
                (function (marker, i) {
                  return function () {
                    infowindow.setContent(`Site Name : ${value.ASitename} `);
                    infowindow.open(map, marker);
                  };
                })(marker, i)
              );
            }
          });
          const line = new window.google.maps.Polyline({
            path: polyLine,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          line.setMap(map);
        })
        .catch((e) => {
          // do something
        });
    }
  }, [data, initMap]);

  return <div ref={mapRef} className={classes.map}></div>;
};

export default MapView;
