import axios from "axios";
import { API_URL } from "./config";

const oldApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "uwu",
  },
});

export default oldApi;
