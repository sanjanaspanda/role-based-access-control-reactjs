import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: "https:
});


api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
