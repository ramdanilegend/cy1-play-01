import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/case";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postData(data) {
  return http.post(apiEndpoint, {
    case_name: data.case_name,
    letter_number: data.letter_number,
    clause_reference: data.clause_reference,
    description: data.description,
    longlat: data.longlat,
    location_address: data.location_address,
    id_user: 1,
    id_person: "",
  });
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

export function deleteData(id) {
  return http.delete(apiEndpoint + `/${id}`);
}

const CaseService = {
  getDataAll,
  postData,
  //   putData,
  deleteData,
};
export default CaseService;
