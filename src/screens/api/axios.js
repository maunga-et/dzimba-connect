import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: "https://dzimbaconnect.kutengaonline.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token before every request
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Token load error:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;