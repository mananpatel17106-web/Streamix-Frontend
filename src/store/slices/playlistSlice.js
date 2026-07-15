import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import playlistService from "../../services/playlist.service";

const initialState = {
  playlists: [],
  currentPlaylist: null,
  loading: false,
  error: null,
};

export const createPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async (data, thunkAPI) => {
    try {
      return await playlistService.createPlaylist(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylists",
  async (userId, thunkAPI) => {
    try {
      return await playlistService.getUserPlaylists(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const getPlaylistById = createAsyncThunk(
  "playlist/getPlaylistById",
  async (playlistId, thunkAPI) => {
    try {
      return await playlistService.getPlaylistById(playlistId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updatePlaylist = createAsyncThunk(
  "playlist/updatePlaylist",
  async ({ playlistId, data }, thunkAPI) => {
    try {
      return await playlistService.updatePlaylist(playlistId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (playlistId, thunkAPI) => {
    try {
      await playlistService.deletePlaylist(playlistId);

      return playlistId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideoToPlaylist",
  async ({ videoId, playlistId }, thunkAPI) => {
    try {
      return await playlistService.addVideo(videoId, playlistId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideoFromPlaylist",
  async ({ videoId, playlistId }, thunkAPI) => {
    try {
      return await playlistService.removeVideo(videoId, playlistId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const playlistSlice = createSlice({
  name: "playlist",

  initialState,

  reducers: {
    clearPlaylistError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;

        state.playlists.unshift(action.payload.data);
      })

      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;

        state.playlists = action.payload?.data || [];
      })

      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;

        state.currentPlaylist = action.payload?.data;
      })

      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;

        state.playlists = state.playlists.map((playlist) =>
          playlist._id === action.payload.data._id
            ? action.payload.data
            : playlist,
        );

        state.currentPlaylist = action.payload.data;
      })

      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;

        state.playlists = state.playlists.filter(
          (playlist) => playlist._id !== action.payload,
        );

        if (state.currentPlaylist?._id === action.payload) {
          state.currentPlaylist = null;
        }
      })

      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addVideoToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.loading = false;

        state.currentPlaylist = action.payload.data;
      })

      .addCase(addVideoToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;

        state.currentPlaylist = action.payload.data;
      })

      .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPlaylistError } = playlistSlice.actions;

export default playlistSlice.reducer;
