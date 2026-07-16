import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("streamix_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto refresh on 401
let refreshing = null;
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/users/login") &&
      !original.url?.includes("/users/refresh-token")
    ) {
      original._retry = true;
      try {
        refreshing =
          refreshing ||
          api.post("/users/refresh-token").finally(() => (refreshing = null));
        const { data } = await refreshing;
        const newToken = data?.data?.accessToken;
        if (newToken) {
          localStorage.setItem("streamix_token", newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(original);
      } catch (e) {
        localStorage.removeItem("streamix_token");
      }
    }
    return Promise.reject(error);
  }
);

export const apiErr = (e, fallback = "Something went wrong") =>
  e?.response?.data?.message || e?.message || fallback;
