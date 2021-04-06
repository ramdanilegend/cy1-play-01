import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postData(data) {
  return http.post(apiEndpoint, {
    name: data.name,
    pin: data.pin,
    email: data.email,
    phone_number: data.phone_number,
    id_role: data.id_role,
    password: data.password,
  });
}

export function putData(data) {
  return http.put(apiEndpoint + `/${data.id}`, {
    name: data.name,
    pin: data.pin,
    email: data.email,
    phone_number: data.phone_number,
    id_role: data.id_role,
    password: data.password,
  });
}

export function deleteData(data) {
  return http.delete(apiEndpoint + `/${data}`);
}

const UserService = {
  getDataAll,
  postData,
  putData,
  deleteData,
};
export default UserService;
