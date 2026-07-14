import axiosInstance from "../api/axios";

class AuthService {
  register(data) {
    return axiosInstance.post("/users/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  login(data) {
    return axiosInstance.post("/users/login", data);
  }

  logout() {
    return axiosInstance.post("/users/logout");
  }

  getCurrentUser() {
    return axiosInstance.get("/users/current-user");
  }

  refreshAccessToken() {
    return axiosInstance.post("/users/refresh-token");
  }

  changePassword(data) {
    return axiosInstance.post("/users/change-password", data);
  }

  updateAccount(data) {
    return axiosInstance.patch("/users/update-account", data);
  }

  updateAvatar(formData) {
    return axiosInstance.patch("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateCoverImage(formData) {
    return axiosInstance.patch("/users/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const authService = new AuthService();

export default authService;