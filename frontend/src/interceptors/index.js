import axios from "axios";
import { baseUrl } from "../config/api_config";

const apiInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

// API response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // Handle response error here
    // let message = error?.response?.data?.message || error?.response?.data;
    let message = error?.response?.data;
    return Promise.reject(message);
  }
);

export default apiInstance;
