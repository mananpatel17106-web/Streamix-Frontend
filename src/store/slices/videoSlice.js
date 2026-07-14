import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoService from "../../services/video.service";

const initialState = {
  videos: [],
  currentVideo: null,

  loading: false,
  error: null,
};

export const getVideos = createAsyncThunk(
  "video/getVideos",
  async (params, thunkAPI) => {
    try {
      return await videoService.getVideos(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getVideoById = createAsyncThunk(
  "video/getVideoById",
  async (videoId, thunkAPI) => {
    try {
      return await videoService.getVideoById(videoId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const publishVideo = createAsyncThunk(
  "video/publishVideo",
  async (formData, thunkAPI) => {
    try {
      return await videoService.publishVideo(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const videoSlice = createSlice({
  name: "video",

  initialState,

  reducers: {
    clearVideoError: (state) => {
      state.error = null;
    },

    resetCurrentVideo: (state) => {
      state.currentVideo = null;
    },

    resetVideos: (state) => {
      state.videos = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // GET ALL VIDEOS
      // ==========================

      .addCase(getVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;

        state.videos = action.payload?.data?.docs || [];
      })

      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // GET SINGLE VIDEO
      // ==========================

      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;

        state.currentVideo = action.payload?.data;
      })

      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // PUBLISH VIDEO
      // ==========================

      .addCase(publishVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(publishVideo.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(publishVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearVideoError,
  resetCurrentVideo,
  resetVideos,
} = videoSlice.actions;

export default videoSlice.reducer;