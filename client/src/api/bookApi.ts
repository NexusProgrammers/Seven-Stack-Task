import axios from "axios";
import Cookie from "js-cookie";

const baseURL = import.meta.env.VITE_BOOK_URL;

console.log("baseURL: ", baseURL);

const bookAPI = axios.create({
  baseURL,
});

bookAPI.interceptors.request.use(
  (config) => {
    const token = Cookie.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default bookAPI;
