import axiosInstance from "../api/axios";

class AuthService {
  async register(data) {
    const response = await axiosInstance.post("/users/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  async login(data) {
    const response = await axiosInstance.post("/users/login", data);
    return response.data;
  }

  async logout() {
    const response = await axiosInstance.post("/users/logout");
    return response.data;
  }

  async getCurrentUser() {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  }

  async refreshAccessToken() {
    const response = await axiosInstance.post("/users/refresh-token");
    return response.data;
  }

  async changePassword(data) {
    const response = await axiosInstance.post(
      "/users/change-password",
      data
    );

    return response.data;
  }

  async updateAccount(data) {
    const response = await axiosInstance.patch(
      "/users/update-account",
      data
    );

    return response.data;
  }

  async updateAvatar(formData) {
    const response = await axiosInstance.patch(
      "/users/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async updateCoverImage(formData) {
    const response = await axiosInstance.patch(
      "/users/cover-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }
}

export default new AuthService();