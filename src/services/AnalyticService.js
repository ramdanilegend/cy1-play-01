import http from "./httpService";
import { apiUrl } from "../config.json";

export function postDetailCaller(data) {
  return http.post(apiUrl + "/analyticCallerDetail", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postDailyCaller(data) {
  return http.post(apiUrl + "/analyticCallerDaily", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postWeeklyCaller(data) {
  return http.post(apiUrl + "/analyticCallerWeekly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postMonthlyCaller(data) {
  return http.post(apiUrl + "/analyticCallerMonthly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postHourlyCaller(data) {
  return http.post(apiUrl + "/analyticCallerHourly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postDropdownCaller(data) {
  return http.post(apiUrl + "/breakdownByNumber", {
    ANumber: data.ANumber,
    daterangepicker: data.daterangepicker,
  });
}

//Called
export function postDetailCalled(data) {
  return http.post(apiUrl + "/analyticCalledDetail", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postDailyCalled(data) {
  return http.post(apiUrl + "/analyticCalledDaily", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postWeeklyCalled(data) {
  return http.post(apiUrl + "/analyticCalledWeekly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postMonthlyCalled(data) {
  return http.post(apiUrl + "/analyticCalledMonthly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

export function postHourlyCalled(data) {
  return http.post(apiUrl + "/analyticCalledHourly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}
export function postDropdownCalled(data) {
  return http.post(apiUrl + "/breakdownByNumber", {
    BNumber: data.BNumber,
    daterangepicker: data.daterangepicker,
  });
}

//Imei
export function postDetailImeiCaller(data) {
  return http.post(apiUrl + "/analyticImeiCallerDetail", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}
export function postHourlyImeiCaller(data) {
  return http.post(apiUrl + "/analyticImeiCallerHourly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}
export function postDetailImeiCalled(data) {
  return http.post(apiUrl + "/analyticImeiCalledDetail", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}
export function postHourlyImeiCalled(data) {
  return http.post(apiUrl + "/analyticImeiCalledHourly", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

//Phone
export function postPhoneSim(data) {
  return http.post(apiUrl + "/phoneMultiSim", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}
export function postSimPhone(data) {
  return http.post(apiUrl + "/simMultiPhone", {
    msisdn: data.msisdn,
    daterangepicker: data.daterangepicker,
  });
}

const AnalyticService = {
  // caller
  postDetailCaller,
  postDailyCaller,
  postWeeklyCaller,
  postMonthlyCaller,
  postHourlyCaller,
  postDropdownCaller,

  // called
  postDetailCalled,
  postDailyCalled,
  postWeeklyCalled,
  postMonthlyCalled,
  postHourlyCalled,
  postDropdownCalled,

  //   imei,
  postDetailImeiCaller,
  postHourlyImeiCaller,
  postDetailImeiCalled,
  postHourlyImeiCalled,

  //phone
  postPhoneSim,
  postSimPhone,
};
export default AnalyticService;
