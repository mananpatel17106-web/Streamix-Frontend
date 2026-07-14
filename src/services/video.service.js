import api from "../api/axios";

class VideoService {
  // Get All Videos
  async getVideos({
    page = 1,
    limit = 12,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId = "",
  } = {}) {
    const response = await api.get("/videos", {
      params: {
        page,
        limit,
        query,
        sortBy,
        sortType,
        userId,
      },
    });

    return response.data;
  }

  // Get Single Video
  async getVideoById(videoId) {
    const response = await api.get(`/videos/${videoId}`);

    return response.data;
  }

  // Publish Video
  async publishVideo(formData) {
    const response = await api.post("/videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  // Update Video
  async updateVideo(videoId, data) {
    const response = await api.patch(`/videos/${videoId}`, data);

    return response.data;
  }

  // Delete Video
  async deleteVideo(videoId) {
    const response = await api.delete(`/videos/${videoId}`);

    return response.data;
  }

  // Toggle Publish Status
  async togglePublishStatus(videoId) {
    const response = await api.patch(`/videos/toggle/publish/${videoId}`);

    return response.data;
  }

  // Increment Views
  async addView(videoId) {
    const response = await api.patch(`/videos/views/${videoId}`);

    return response.data;
  }
}

export default new VideoService();
