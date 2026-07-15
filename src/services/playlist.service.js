import api from "../api/axios";

class PlaylistService {
  async createPlaylist(data) {
    const response = await api.post("/playlists", data);

    return response.data;
  }

  async getUserPlaylists(userId) {
    const response = await api.get(`/playlists/user/${userId}`);

    return response.data;
  }

  async getPlaylistById(playlistId) {
    const response = await api.get(`/playlists/${playlistId}`);

    return response.data;
  }

  async updatePlaylist(playlistId, data) {
    const response = await api.patch(`/playlists/${playlistId}`, data);

    return response.data;
  }

  async deletePlaylist(playlistId) {
    const response = await api.delete(`/playlists/${playlistId}`);

    return response.data;
  }

  async addVideo(videoId, playlistId) {
    const response = await api.patch(`/playlists/add/${videoId}/${playlistId}`);

    return response.data;
  }

  async removeVideo(videoId, playlistId) {
    const response = await api.patch(
      `/playlists/remove/${videoId}/${playlistId}`,
    );

    return response.data;
  }
}

export default new PlaylistService();
