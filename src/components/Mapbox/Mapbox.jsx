import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Loader } from "@googlemaps/js-api-loader";
import { apiGoogleMap } from "config.json";
import { useFormikContext } from "formik";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  map: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  mapHeader: {},
}));

function MapBox({ address, setAutoValue, setMapHeader }) {
  const classes = useStyles();
  const mapRef = React.useRef();
  const { setFieldValue } = useFormikContext();

  const [initMap, setInitMap] = React.useState({
    center: {
      lat: -2.43171,
      lng: 115.487867,
    },
    zoom: 4,
    controlSize: 25,
  });
  const loader = new Loader({
    apiKey: apiGoogleMap,
    version: "weekly",
    libraries: ["geometry", "places"],
  });

  React.useEffect(() => {
    loader
      .load()
      .then(() => {
        const geocoder = new window.google.maps.Geocoder();
        const map = new window.google.maps.Map(mapRef.current, initMap);
        const marker = new window.google.maps.Marker({
          map,
        });
        map.addListener("click", (e) => {
          marker.setPosition(e.latLng);
          setMapHeader(`${e.latLng.toJSON().lng},${e.latLng.toJSON().lat}`);
          setFieldValue(
            "longlat",
            `${e.latLng.toJSON().lng},${e.latLng.toJSON().lat}`
          );
          geocoder.geocode({ latLng: e.latLng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                setAutoValue(results[0].formatted_address);
                setFieldValue(
                  "location_address",
                  `${results[0].formatted_address}`
                );
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
        });
        if (address) {
          geocoder.geocode({ address: address }, function (results, status) {
            if (status == "OK") {
              map.setCenter(results[0].geometry.location);
              map.setZoom(15);
              setMapHeader(
                `${results[0].geometry.location.toJSON().lng},${
                  results[0].geometry.location.toJSON().lat
                }`
              );
              setFieldValue("location_address", address);
              setFieldValue(
                "longlat",
                `${results[0].geometry.location.toJSON().lng},${
                  results[0].geometry.location.toJSON().lat
                }`
              );
              marker.setPosition(results[0].geometry.location);
              marker.setPosition(results[0].geometry.location);
            } else {
              alert(
                "Geocode was not successful for the following reason: " + status
              );
            }
          });
        }
      })
      .catch((e) => {});
  }, [address]);

  return (
    <React.Fragment>
      <div ref={mapRef} className={classes.map}></div>
    </React.Fragment>
  );
}

export default MapBox;
