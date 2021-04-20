import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/login";
const apiLogout = apiUrl + "/logout?id=";
const tokenKey = "Authorization";

http.setJwt(getJwt());

export async function loginTest() {
  const { data: jwt } = await http.get(apiEndpoint);
  localStorage.setItem(tokenKey, jwt);
}

export function getAuth() {
  return http.get(`${apiUrl}/getAuth`);
}

export async function login(val) {
  const { data: jwt } = await http.post(apiEndpoint, val);
  // console.log(jwt);
  localStorage.setItem(tokenKey, jwt.jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout(id) {
  await http.get(`${apiLogout}${id}`);
  localStorage.removeItem(tokenKey);
}

export function sessionEnd() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  loginTest,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  sessionEnd,
  getAuth,
};
