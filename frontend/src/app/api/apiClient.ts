import axios, { AxiosError } from "axios";
import { message } from "antd";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    let content = "Something went wrong";

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