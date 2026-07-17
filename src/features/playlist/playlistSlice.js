import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const createPlaylist = createAsyncThunk(
  "playlists/create",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/playlist", body);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const fetchUserPlaylists = createAsyncThunk(
  "playlists/userList",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/playlist/user/${userId}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const fetchPlaylistById = createAsyncThunk(
  "playlists/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/playlist/${id}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const updatePlaylist = createAsyncThunk(
  "playlists/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/playlist/${id}`, body);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  "playlists/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/playlist/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlists/addVideo",
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/playlist/add/${videoId}/${playlistId}`,
      );
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "playlists/removeVideo",
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/playlist/remove/${videoId}/${playlistId}`,
      );
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

const slice = createSlice({
  name: "playlists",
  initialState: { list: [], current: null, status: "idle" },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUserPlaylists.fulfilled, (s, a) => {
      s.list = Array.isArray(a.payload) ? a.payload : [];
    });
    b.addCase(fetchPlaylistById.fulfilled, (s, a) => {
      s.current = a.payload;
    });
    b.addCase(deletePlaylist.fulfilled, (s, a) => {
      s.list = s.list.filter((p) => p._id !== a.payload);
    });
    b.addCase(createPlaylist.fulfilled, (s, a) => {
      s.list.unshift(a.payload);
    })
      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        const updatedPlaylist = action.payload;

        const index = state.list.findIndex(
          (playlist) => playlist._id === updatedPlaylist._id,
        );

        if (index !== -1) {
          state.list[index] = updatedPlaylist;
        }
      })

      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        const updatedPlaylist = action.payload;

        const index = state.list.findIndex(
          (playlist) => playlist._id === updatedPlaylist._id,
        );

        if (index !== -1) {
          state.list[index] = updatedPlaylist;
        }
      });
  },
});
export default slice.reducer;
