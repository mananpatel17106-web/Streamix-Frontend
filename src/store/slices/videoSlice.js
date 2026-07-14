import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoService from "../../services/video.service";

const initialState = {
  videos: [],
  currentVideo: null,

  loading: false,
  error: null,

  page: 1,
  totalPages: 1,
  totalVideos: 0,
  hasMore: true,

  query: "",
  sortBy: "createdAt",
  sortType: "desc",
};

export const getVideos = createAsyncThunk(
  "video/getVideos",
  async (params, thunkAPI) => {
    try {
      return await videoService.getAllVideos(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getVideo = createAsyncThunk(
  "video/getVideo",
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

const videoSlice = createSlice({
  name: "video",

  initialState,

  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.page = 1;
      state.hasMore = true;
    },

    setQuery: (state, action) => {
      state.query = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setSortType: (state, action) => {
      state.sortType = action.payload;
    },

    clearCurrentVideo: (state) => {
      state.currentVideo = null;
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

        const payload = action.payload?.data || {};

        const docs = payload.docs || [];

        if (state.page === 1) {
          state.videos = docs;
        } else {
          state.videos.push(...docs);
        }

        state.page = payload.page || 1;
        state.totalPages = payload.totalPages || 1;
        state.totalVideos = payload.totalDocs || docs.length;
        state.hasMore = payload.hasNextPage || false;
      })

      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload?.data;
      })

      .addCase(getVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearVideos,
  setQuery,
  setSortBy,
  setSortType,
  clearCurrentVideo,
} = videoSlice.actions;

export default videoSlice.reducer;