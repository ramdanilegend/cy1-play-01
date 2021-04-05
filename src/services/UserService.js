import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postData(data) {
  return http.post(apiEndpoint, {
    name: data.name,
    pin: data.PIN,
    email: data.email,
    phone_number: data.phone_number,
    id_role: data.role,
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

// export function deleteData(id) {
//   return http.delete(apiEndpoint + `/${id}`);
// }

const UserService = {
  getDataAll,
  postData,
  //   putData,
  //   deleteData,
};
export default UserService;
