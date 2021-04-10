import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { makeStyles } from "@material-ui/core/styles";
import { setIn } from "formik";
import { apiGoogleMap } from "config.json";
import Geocode from "react-geocode";

Geocode.setApiKey(apiGoogleMap);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const useStyles = makeStyles((theme) => ({
  map: {
    position: "absolute",
    top: "35px",
    right: 0,
    left: 0,
    bottom: 0,
  },
}));

const mapStyles = {
  position: "absolute",
  top: "15px",
  right: 0,
  left: 0,
  bottom: 0,
};

export function MapContainer(props) {
  const classes = useStyles();
  const [activeMarker, setActiveMarker] = React.useState({});
  const [selectedPlace, setPlace] = React.useState({});
  const [showingInfoWindow, setInfo] = React.useState(false);
  const [markerLocation, setMarkerLocation] = React.useState({
    lat: -1.2884,
    lng: 36.8233,
  });
  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setPlace(props);
    setInfo(true);
  };

  const onClose = (props) => {
    if (showingInfoWindow) {
      setActiveMarker(null);
      setInfo(true);
    }
  };
  Geocode.fromLatLng("48.8583701", "2.2922926").then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    (error) => {
      console.error(error);
    }
  );
  Geocode.fromAddress("Komplek Griya Bandung Indah").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );
  const onMapClick = (mapProps, map, clickEvent) => {
    setMarkerLocation({
      ...markerLocation,
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    });
  };
  let geocoder;
  let map;
  function initialize() {
    geocoder = new props.google.maps.Geocoder();
    const latlng = new props.google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
    };
    // map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  return (
    <div>
      <div className="map-bar-container">
        <div className="map-bar">{`${markerLocation.lat},${markerLocation.lng}`}</div>
      </div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
        onClick={onMapClick}
      >
        <Marker
          onClick={onMarkerClick}
          name={"SOMA"}
          style={{ color: "#000000", backgroundColor: "#ffffff" }}
          position={markerLocation}
        />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: apiGoogleMap,
})(MapContainer);
