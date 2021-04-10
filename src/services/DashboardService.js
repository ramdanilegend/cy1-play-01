import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/dashboard";

// export function getDataAll() {
//   return http.get(apiEndpoint);
// }

export function postData() {
  return http.post(
    apiEndpoint,
    {
      msisdn: 6285813524804,
      daterangepicker: "04/05/2019 - 04/05/2021",
      datetime: null,
    }
    // { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

// export function putData(id, data) {
//   return http.put(apiEndpoint + `/${id}`, {
//     kode_kantor_pusat: data.kode_kantor_pusat,
//     nama_kantor_pusat: data.nama_kantor_pusat,
//     alamat: data.alamat,
//     email: data.email,
//     no_perjanjian: data.no_perjanjian,
//     masa_pks: data.masa_pks,
//     MasterBrokerId: data.MasterBrokerId,
//   });
// }

// export function deleteData(id) {
//   return http.delete(apiEndpoint + `/${id}`);
// }

const DashboardService = {
  //   getDataAll,
  postData,
  //   putData,
  //   deleteData,
};
export default DashboardService;
