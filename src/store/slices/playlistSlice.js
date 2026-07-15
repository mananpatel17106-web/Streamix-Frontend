import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import playlistService from "../../services/playlist.service";

const initialState = {
  playlists: [],
  currentPlaylist: null,
  loading: false,
  error: null,
};

export const getUserPlaylists =
  createAsyncThunk(
    "playlist/getUserPlaylists",
    async (_, thunkAPI) => {
      try {
        return await playlistService.getUserPlaylists();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

const playlistSlice = createSlice({
  name: "playlist",

  initialState,

  reducers: {
    clearPlaylistError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        getUserPlaylists.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        getUserPlaylists.fulfilled,
        (state, action) => {
          state.loading = false;

          state.playlists =
            action.payload?.data || [];
        }
      )

      .addCase(
        getUserPlaylists.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearPlaylistError,
} = playlistSlice.actions;

export default playlistSlice.reducer;