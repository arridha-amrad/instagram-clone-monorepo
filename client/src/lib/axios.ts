import axios from "axios";

export const privateAxios = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
