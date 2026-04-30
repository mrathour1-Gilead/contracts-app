import axios, { AxiosError } from "axios";
import { message } from "antd";

const apiClient = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "http://10.129.89.39:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((request: any) => {
  const token = localStorage.getItem("contractToken") || "";
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    let content = "Something went wrong";
    const url = error?.config?.url || ""
    if (url.includes("userinfo")) {
      return Promise.reject(error);
    }

    if (error.response) {
      content =
        error.response.data?.message ||
        error.response.data?.error ||
        error.response.statusText ||
        `Request failed (${error.response.status})`;
    } else if (error.request) {
      content = "Network error. Please try again.";
    } else {
      content = error.message;
    }

    message.error(content);

    return Promise.reject(error);
  }
);

export default apiClient;