import axios from "axios";

const apiClient = axios.create({
  baseURL: "/", // 🔁 change to your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add auth token later
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;