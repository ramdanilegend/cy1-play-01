import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/master-broker";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postDataWithImage(formData) {
  return http.post(apiEndpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function putDataWithImage(id, formData) {
  return http.put(apiEndpoint + `/with-logo/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function putData(id, data) {
  return http.put(apiEndpoint + `/${id}`, {
    kode_broker: data.kode_broker,
    nama_broker: data.nama_broker,
    alamat_broker: data.alamat_broker,
    email_broker: data.email_broker,
    no_akte_perusahaan: data.no_akte_perusahaan,
    no_tlp_broker: data.no_tlp_broker,
  });
}

export function deleteData(id) {
  return http.delete(apiEndpoint + `/${id}`);
}

export function downloadFile(file) {
  return http.get(apiEndpoint + `/download/${file}`);
}

const MasterBrokerService = {
  getDataAll,
  postDataWithImage,
  putData,
  putDataWithImage,
  deleteData,
  downloadFile,
};
export default MasterBrokerService;
