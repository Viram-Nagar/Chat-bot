import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ─── Request Interceptor ────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const isAuthRoute =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";

      if (!isAuthRoute) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 429) {
      toast.error("Too many requests. Please slow down.");
    }

    return Promise.reject({ message, status: error.response?.status });
  },
);

export default api;

// import axios from "axios";
// import toast from "react-hot-toast";

// const api = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 30000,
// });

// // ─── Request Interceptor ────────────────────────────────────────
// api.interceptors.request.use(
//   (config) => {
//     // Attach token from localStorage if present
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // ─── Response Interceptor ───────────────────────────────────────
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || error.message || "Something went wrong";

//     // Auto logout on 401
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Don't toast on login/register pages
//       const isAuthRoute =
//         window.location.pathname === "/login" ||
//         window.location.pathname === "/register";

//       if (!isAuthRoute) {
//         toast.error("Session expired. Please login again.");
//         window.location.href = "/login";
//       }
//     }

//     // Rate limit message
//     if (error.response?.status === 429) {
//       toast.error("Too many requests. Please slow down.");
//     }

//     return Promise.reject({ message, status: error.response?.status });
//   },
// );

// export default api;
