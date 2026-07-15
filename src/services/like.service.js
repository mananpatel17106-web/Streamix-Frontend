import api from "../api/axios";

class LikeService {
  async toggleVideoLike(videoId) {
    const response = await api.post(
      `/likes/toggle/v/${videoId}`
    );

    return response.data;
  }

  async toggleCommentLike(commentId) {
    const response = await api.post(
      `/likes/toggle/c/${commentId}`
    );

    return response.data;
  }

  async getLikedVideos() {
    const response = await api.get("/likes/videos");

    return response.data;
  }
}

export default new LikeService();