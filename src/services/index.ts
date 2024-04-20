import { API_KEY, BASE_URL } from "@/api";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
  },
});

export default axiosInstance;
