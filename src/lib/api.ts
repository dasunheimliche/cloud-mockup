import axios from "axios";
import { AUTH_URL, CLOUD_URL } from "./config";

const authAxios = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "uwu",
  },
});

export const cloudAxios = axios.create({
  baseURL: CLOUD_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "uwu",
  },
});

export default authAxios;
