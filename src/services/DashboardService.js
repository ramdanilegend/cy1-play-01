import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/dashboard";

export function postSearchAnalytic(msisdn, date) {
  return http.post(apiEndpoint, {
    msisdn: msisdn,
    daterangepicker: date,
  });
}
export function postData(msisdn, date) {
  return http.post(apiEndpoint, {
    msisdn: msisdn,
    daterangepicker: date,
  });
}
export function postDropdownDetail(data) {
  return http.post(apiUrl + "/breakdownByNumber", {
    ANumber: data.ANumber,
    daterangepicker: data.daterangepicker,
    BNumber: data.BNumber,
    Calltype: data.Calltype,
  });
}

export function postDropdownDay(data) {
  return http.post(apiUrl + "/breakdownByMsisdn", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
    ASitename: data.ASitename,
    startname: "06:00:00",
    endtime: "18:00:00",
  });
}

export function postDropdownNight(data) {
  return http.post(apiUrl + "/breakdownByMsisdn", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
    ASitename: data.ASitename,
    startname: "18:01:00",
    endtime: "05:59:00",
  });
}

const DashboardService = {
  postSearchAnalytic,
  postDropdownDetail,
  postData,
  postDropdownDay,
  postDropdownNight,
};
export default DashboardService;
