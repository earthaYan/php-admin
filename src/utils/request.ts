import { message } from "antd";
import axios, { AxiosError, type AxiosResponse } from "axios";
import storage from "./storage";
import type { CommonResponse } from "@/types/api";

const apiURL = import.meta.env.VITE_APP_API_BASE_URL;

export const instance = axios.create({
  baseURL: apiURL,
  timeout: 3000,
  timeoutErrorMessage: "请求超时!!!",
  withCredentials: true, //允许携带cookie
});

instance.interceptors.request.use(
  (config) => {
    const token = storage.get("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse<CommonResponse<unknown>>) => {
    const res = response.data;
    const { code, msg } = res;

    if (code !== 200) {
      message.error(msg);
      return Promise.reject(new Error(msg));
    }

    return response;
  },
  (err: AxiosError<CommonResponse<unknown>>) => {
    const errorMessage = err.message ?? err.response?.data.msg ?? "请求失败";
    message.error(errorMessage);

    if (
      (err.status === 401 || err.response?.status === 401) &&
      location.pathname !== "/login"
    ) {
      storage.remove("token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export const $get = async <T>(url: string, params?: unknown): Promise<T> => {
  const response = await instance.get<CommonResponse<T>>(url, { params });
  return response.data.data;
};

export const $post = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await instance.post<CommonResponse<T>>(url, data);
  return response.data.data;
};
