import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  currentVideo: null,
  isLoading: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },

    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },

    setVideoLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setVideos,
  setCurrentVideo,
  setVideoLoading,
} = videoSlice.actions;

export default videoSlice.reducer;