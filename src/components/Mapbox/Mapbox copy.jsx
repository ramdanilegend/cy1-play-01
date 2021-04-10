import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { makeStyles } from "@material-ui/core/styles";
import { setIn } from "formik";
import { apiGoogleMap } from "config.json";

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
  const onMapClick = (mapProps, map, clickEvent) => {
    setMarkerLocation({
      ...markerLocation,
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    });
  };
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
// import React from "react";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
// import { useFormikContext } from "formik";

// mapboxgl.workerClass = MapboxWorker;
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZHJhbWRhbmkiLCJhIjoiY2tuNnR5bzdoMDlyMzJxbXp0enlxbWV3diJ9.u63fK50My5pK_-IK00XtwA";

// const Mapbox = (props) => {
//   const { lngUser, latUser } = props;
//   const mapContainer = React.useRef();
//   const [lng, setLng] = React.useState(lngUser);
//   const [lat, setLat] = React.useState(latUser);
//   const { setFieldValue } = useFormikContext();
//   React.useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: 9,
//       attributionControl: false,
//     });
//     var marker1 = new mapboxgl.Marker().setLngLat({ lng, lat }).addTo(map);
//     map.on("click", function (e) {
//       marker1.setLngLat(e.lngLat);
//       // console.log(e.lngLat);
//       setLng(e.lngLat.lng);
//       setLat(e.lngLat.lat);
//       setFieldValue("longlat", `${e.lngLat.lat},${e.lngLat.lng}`);
//     });
//     map.addControl(
//       new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//       })
//     );
//     map.addControl(new mapboxgl.NavigationControl());

//     return () => map.remove();
//   }, []);
//   return (
//     <div>
//       <div className="map-bar-container">
//         <div className="map-bar">{`${lng},${lat}`}</div>
//       </div>

//       <div className="map-container" ref={mapContainer} />
//     </div>
//   );
// };

// export default Mapbox;
