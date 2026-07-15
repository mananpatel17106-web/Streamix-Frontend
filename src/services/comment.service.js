import api from "../api/axios";

class CommentService {
  async getVideoComments(videoId, page = 1, limit = 10) {
    const response = await api.get(`/comments/${videoId}`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }

  async addComment(videoId, content) {
    const response = await api.post(`/comments/${videoId}`, {
      content,
    });

    return response.data;
  }

  async updateComment(commentId, content) {
    const response = await api.patch(`/comments/c/${commentId}`, {
      content,
    });

    return response.data;
  }

  async deleteComment(commentId) {
    const response = await api.delete(`/comments/c/${commentId}`);

    return response.data;
  }
}

export default new CommentService();
