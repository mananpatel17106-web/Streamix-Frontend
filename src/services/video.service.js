import api from "../api/axios";

class VideoService {
  async getAllVideos(params = {}) {
    const response = await api.get("/videos", {
      params: {
        page: params.page || 1,
        limit: params.limit || 12,
        query: params.query || "",
        sortBy: params.sortBy || "createdAt",
        sortType: params.sortType || "desc",
        userId: params.userId || "",
      },
    });

    return response.data;
  }

  async getVideoById(videoId) {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  }

  async publishVideo(formData) {
    const response = await api.post("/videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  async updateVideo(videoId, data) {
    const response = await api.patch(`/videos/${videoId}`, data);
    return response.data;
  }

  async deleteVideo(videoId) {
    const response = await api.delete(`/videos/${videoId}`);
    return response.data;
  }

  async togglePublishStatus(videoId) {
    const response = await api.patch(
      `/videos/toggle/publish/${videoId}`
    );

    return response.data;
  }
}

export default new VideoService();