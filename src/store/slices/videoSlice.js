import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import videoService from "../../services/video.service";

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
};

export const getVideos =
  createAsyncThunk(
    "video/getVideos",
    async (params, thunkAPI) => {
      try {
        return await videoService.getVideos(
          params
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const getVideoById =
  createAsyncThunk(
    "video/getVideoById",
    async (videoId, thunkAPI) => {
      try {
        return await videoService.getVideoById(
          videoId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const publishVideo =
  createAsyncThunk(
    "video/publishVideo",
    async (formData, thunkAPI) => {
      try {
        return await videoService.publishVideo(
          formData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const updateVideo =
  createAsyncThunk(
    "video/updateVideo",
    async (
      { videoId, data },
      thunkAPI
    ) => {
      try {
        return await videoService.updateVideo(
          videoId,
          data
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const deleteVideo =
  createAsyncThunk(
    "video/deleteVideo",
    async (videoId, thunkAPI) => {
      try {
        await videoService.deleteVideo(
          videoId
        );

        return videoId;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const togglePublishStatus =
  createAsyncThunk(
    "video/togglePublishStatus",
    async (videoId, thunkAPI) => {
      try {
        return await videoService.togglePublishStatus(
          videoId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
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

      .addCase(publishVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(publishVideo.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.data) {
          state.videos.unshift(action.payload.data);
        }
      })

      .addCase(publishVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;

        state.currentVideo = action.payload.data;

        state.videos = state.videos.map((video) =>
          video._id === action.payload.data._id
            ? action.payload.data
            : video
        );
      })

      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;

        state.videos = state.videos.filter(
          (video) => video._id !== action.payload
        );

        if (
          state.currentVideo?._id ===
          action.payload
        ) {
          state.currentVideo = null;
        }
      })

      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(togglePublishStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.currentVideo = action.payload.data;

        state.videos = state.videos.map((video) =>
          video._id === action.payload.data._id
            ? action.payload.data
            : video
        );
      })

      .addCase(togglePublishStatus.rejected, (state, action) => {
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