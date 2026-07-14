import api from "../api/axios";

class AuthService {
  async register(formData) {
    const response = await api.post(
      "/users/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async login(data) {
    const response = await api.post(
      "/users/login",
      data
    );

    return response.data;
  }

  async logout() {
    const response = await api.post(
      "/users/logout"
    );

    return response.data;
  }

  async refreshToken() {
    const response = await api.post(
      "/users/refresh-token"
    );

    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get(
      "/users/current-user"
    );

    return response.data;
  }

  async changePassword(data) {
    const response = await api.post(
      "/users/change-password",
      data
    );

    return response.data;
  }

  async updateAccount(data) {
    const response = await api.patch(
      "/users/update-account",
      data
    );

    return response.data;
  }

  async updateAvatar(formData) {
    const response = await api.patch(
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
    const response = await api.patch(
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

  async getChannelProfile(username) {
    const response = await api.get(
      `/users/c/${username}`
    );

    return response.data;
  }

  async getWatchHistory() {
    const response = await api.get(
      "/users/history"
    );

    return response.data;
  }
}

export default new AuthService();