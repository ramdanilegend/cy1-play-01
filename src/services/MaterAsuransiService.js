import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/master-asuransi";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postData(data) {
  return http.post(apiEndpoint, {
    MasterBrokerId: data.MasterBrokerId,
    ProdukAsuransiId: data.ProdukAsuransiId,
    kode_asuransi: data.kode_asuransi,
    nama_asuransi: data.nama_asuransi,
    polis_induk: data.polis_induk,
    diskon: data.diskon,
    ppn: data.ppn,
    pph: data.pph,
    email: data.email,
  });
}

export function putData(id, data) {
  return http.put(apiEndpoint + `/${id}`, {
    MasterBrokerId: data.MasterBrokerId,
    ProdukAsuransiId: data.ProdukAsuransiId,
    kode_asuransi: data.kode_asuransi,
    nama_asuransi: data.nama_asuransi,
    polis_induk: data.polis_induk,
    diskon: data.diskon,
    ppn: data.ppn,
    pph: data.pph,
    email: data.email,
  });
}

export function deleteData(id) {
  return http.delete(apiEndpoint + `/${id}`);
}

const MasterAsuransiService = {
  getDataAll,
  postData,
  putData,
  deleteData,
};
export default MasterAsuransiService;
