import { serverHost } from "#/config/env";
import axios from "axios";

export const privateAxios = axios.create({
  baseURL: `${serverHost}/api`,
  withCredentials: true,
});

export const publicAxios = axios.create({
  baseURL: `${serverHost}/api`,
});
