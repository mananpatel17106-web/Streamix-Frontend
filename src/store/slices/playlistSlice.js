import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [],
  isLoading: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },

    setPlaylistLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setPlaylists,
  setPlaylistLoading,
} = playlistSlice.actions;

export default playlistSlice.reducer;