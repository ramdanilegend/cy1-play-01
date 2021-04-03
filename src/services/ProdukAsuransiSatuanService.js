import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/produk-asuransi-satuan";

export function getDataAll() {
  return http.get(apiEndpoint);
}

export function postData(data) {
  return http.post(apiEndpoint, {
    okupasi: data.okupasi,
    limit_plafon: data.limit_plafon,
    limit_umur: data.limit_umur,
    sts_down: data.sts_down,
    sts_up: data.sts_up,
    AJK: data.AJK,
    MasterBrokerId: data.MasterBrokerId,
    ProdukAsuransiId: data.ProdukAsuransiId,
  });
}

export function putData(id, data) {
  return http.put(apiEndpoint + `/${id}`, {
    okupasi: data.okupasi,
    limit_plafon: data.limit_plafon,
    limit_umur: data.limit_umur,
    sts_down: data.sts_down,
    sts_up: data.sts_up,
    AJK: data.AJK,
    MasterBrokerId: data.MasterBrokerId,
    ProdukAsuransiId: data.ProdukAsuransiId,
  });
}

export function deleteData(id) {
  return http.delete(apiEndpoint + `/${id}`);
}

const ProdukAsuransiSatuanService = {
  getDataAll,
  postData,
  putData,
  deleteData,
};
export default ProdukAsuransiSatuanService;
