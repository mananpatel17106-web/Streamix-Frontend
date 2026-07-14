import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoService from "../../services/video.service";

const initialState = {
  videos: [],
  currentVideo: null,

  loading: false,
  error: null,

  page: 1,
  limit: 12,

  hasMore: true,
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
      state.page = 1;
      state.hasMore = true;
    },
  },

  extraReducers: (builder) => {
    builder

      // Get Videos

      .addCase(getVideos.pending, (state) => {
        state.loading = true;
      })

      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;

        const docs = action.payload?.data?.docs || [];

        if (state.page === 1) {
          state.videos = docs;
        } else {
          state.videos.push(...docs);
        }

        state.hasMore =
          docs.length >= state.limit;

        state.page += 1;
      })

      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Single Video

      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;

        state.currentVideo =
          action.payload?.data;
      })

      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Publish

      .addCase(publishVideo.pending, (state) => {
        state.loading = true;
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