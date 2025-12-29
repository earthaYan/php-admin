import { message } from "antd";
import axios from "axios";

const apiURL = import.meta.env.VITE_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: apiURL,
  timeout: 3000,
  timeoutErrorMessage: "请求超时!!!",
  withCredentials: true, //允许携带cookie
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === 401) {
      window.location.href = "/login";
    } else if (data.code !== 200) {
      message.error(data.msg);
    }
    return data.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default {
  instance,
  get: (url: string, params?: object) => {
    return instance.get(url, { params });
  },
  post: (url: string, data?: object) => {
    return instance.post(url, { data });
  },
};
