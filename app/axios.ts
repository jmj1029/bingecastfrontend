import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://www.localhost:4000",
});

export default axiosInstance;