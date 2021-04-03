import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/produk-asuransi";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postData(data) {
  return http.post(apiEndpoint, {
    kode_produk: data.kode_produk,
    nama_produk: data.nama_produk,
  });
}

export function putData(id, data) {
  return http.put(apiEndpoint + `/${id}`, {
    kode_produk: data.kode_produk,
    nama_produk: data.nama_produk,
  });
}

export function deleteData(id) {
  return http.delete(apiEndpoint + `/${id}`);
}

const ProdukAsuransiService = {
  getDataAll,
  postData,
  putData,
  deleteData,
};
export default ProdukAsuransiService;
