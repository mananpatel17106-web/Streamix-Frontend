import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const fetchChannelStats = createAsyncThunk(
  "dashboard/fetchChannelStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/stats");
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "dashboard/fetchChannelVideos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/videos");
      return Array.isArray(data.data) ? data.data : [];
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  }
);

export const deleteChannelVideo = createAsyncThunk(
  "dashboard/deleteVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      await api.delete(`/videos/${videoId}`);
      return videoId;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "dashboard/togglePublish",
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/videos/toggle/publish/${videoId}`
      );

      return {
        videoId,
        video: data.data,
      };
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  }
);

const initialState = {
  stats: {
    totalViews: 0,
    totalSubscribers: 0,
    totalVideos: 0,
    totalLikes: 0,
  },

  videos: [],

  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* Stats */
      .addCase(fetchChannelStats.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchChannelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload || initialState.stats;
      })

      .addCase(fetchChannelStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Videos */
      .addCase(fetchChannelVideos.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchChannelVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload || [];
      })

      .addCase(fetchChannelVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Delete */
      .addCase(deleteChannelVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(
          (video) => video._id !== action.payload
        );

        state.stats.totalVideos = Math.max(
          0,
          state.stats.totalVideos - 1
        );
      })
      
      /* Publish */
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        const updated = action.payload.video;

        state.videos = state.videos.map((video) =>
          video._id === updated._id
            ? { ...video, ...updated }
            : video
        );
      });
  },
});

export default dashboardSlice.reducer;