import { PROD } from "@/consts/Environment.ts";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD
  ? "https://home-service-app-05c6c6e55a03.herokuapp.com/"
  : "http://localhost:5005/";

const config: AxiosRequestConfig = {
  baseURL,
};
export const axiosInstance = axios.create(config);
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
