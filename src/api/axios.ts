import axios from "axios";
import { ApiUrl } from "../constants";

export const axiosPrivate = axios.create({
  baseURL: ApiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
