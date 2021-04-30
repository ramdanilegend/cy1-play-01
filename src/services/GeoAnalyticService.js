import http from "./httpService";
import { apiUrl } from "../config.json";

export function postGeoFrequent(data) {
  return http.post(apiUrl + "/geoAnalyticFrequent", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postGeoMovement(data) {
  return http.post(apiUrl + "/geoAnalyticMovementCall", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postGeoDayNight(data) {
  return http.post(apiUrl + "/geoAnalyticDaynightCall", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

const GeoAnalyticService = {
  postGeoFrequent,
  postGeoMovement,
  postGeoDayNight,
};
export default GeoAnalyticService;
