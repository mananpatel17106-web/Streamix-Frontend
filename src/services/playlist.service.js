import api from "../api/axios";

class PlaylistService {
  async getUserPlaylists() {
    const response = await api.get("/playlist");

    return response.data;
  }

  async getPlaylistById(playlistId) {
    const response = await api.get(
      `/playlist/${playlistId}`
    );

    return response.data;
  }

  async createPlaylist(data) {
    const response = await api.post(
      "/playlist",
      data
    );

    return response.data;
  }

  async deletePlaylist(playlistId) {
    const response = await api.delete(
      `/playlist/${playlistId}`
    );

    return response.data;
  }

  async addVideo(playlistId, videoId) {
    const response = await api.patch(
      `/playlist/add/${videoId}/${playlistId}`
    );

    return response.data;
  }

  async removeVideo(playlistId, videoId) {
    const response = await api.patch(
      `/playlist/remove/${videoId}/${playlistId}`
    );

    return response.data;
  }
}

export default new PlaylistService();