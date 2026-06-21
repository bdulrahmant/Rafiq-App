import axios from "axios";

console.log("🔧 Axios Configuration:");
console.log("📍 VITE_API_URL:", import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

console.table({
  baseURL: axiosInstance.defaults.baseURL,
  baseURLType: typeof axiosInstance.defaults.baseURL,
  hasApiPath: axiosInstance.defaults.baseURL?.includes('/api'),
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("📤 Request URL:", config.baseURL + config.url);
    console.log("📤 Full Request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      params: config.params,
    });

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

axiosInstance.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    if (
      error.response?.status ===
      401
    ) {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default axiosInstance;