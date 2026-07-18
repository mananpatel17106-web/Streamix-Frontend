import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const fetchVideos = createAsyncThunk(
  "videos/list",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/videos", { params });
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

export const fetchVideoById = createAsyncThunk(
  "videos/getOne",
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/videos/${videoId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

export const publishVideo = createAsyncThunk(
  "videos/publish",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/videos", formData);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

export const updateVideo = createAsyncThunk(
  "videos/update",
  async ({ videoId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/videos/${videoId}`, formData);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

export const deleteVideo = createAsyncThunk(
  "videos/delete",
  async (videoId, { rejectWithValue }) => {
    try {
      await api.delete(`/videos/${videoId}`);
      return videoId;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

export const togglePublish = createAsyncThunk(
  "videos/togglePublish",
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/videos/toggle/publish/${videoId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

const initialState = {
  list: [],
  current: null,
  status: "idle",
  error: null,
  page: 1,
  totalPages: 1,
  totalVideos: 0,
  hasMore: true,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "idle";

        const payload = action.payload;

        if (Array.isArray(payload)) {
          state.list = payload;
          state.totalVideos = payload.length;
          state.page = 1;
          state.totalPages = 1;
          state.hasMore = false;
        } else {
          state.list = payload?.docs || payload?.videos || [];
          state.page = payload?.page || 1;
          state.totalPages = payload?.totalPages || 1;
          state.totalVideos =
            payload?.totalDocs || payload?.totalVideos || state.list.length;

          state.hasMore = payload?.hasNextPage ?? state.page < state.totalPages;
        }
      })

      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(fetchVideoById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.status = "idle";

        state.current = action.payload;

        const index = state.list.findIndex(
          (video) => video._id === action.payload._id,
        );

        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload,
          };
        }
      })

      .addCase(fetchVideoById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(publishVideo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(publishVideo.fulfilled, (state, action) => {
        state.status = "idle";

        state.list.unshift(action.payload);
        state.totalVideos += 1;
      })

      .addCase(publishVideo.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(updateVideo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateVideo.fulfilled, (state, action) => {
        state.status = "idle";

        state.list = state.list.map((video) =>
          video._id === action.payload._id ? action.payload : video,
        );

        if (state.current?._id === action.payload._id) {
          state.current = action.payload;
        }
      })

      .addCase(updateVideo.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(deleteVideo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.status = "idle";

        state.list = state.list.filter((video) => video._id !== action.payload);

        if (state.current?._id === action.payload) {
          state.current = null;
        }

        if (state.totalVideos > 0) {
          state.totalVideos -= 1;
        }
      })

      .addCase(deleteVideo.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(togglePublish.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(togglePublish.fulfilled, (state, action) => {
        state.status = "idle";

        state.list = state.list.map((video) =>
          video._id === action.payload._id ? action.payload : video,
        );

        if (state.current?._id === action.payload._id) {
          state.current = action.payload;
        }
      })

      .addCase(togglePublish.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export default videoSlice.reducer;
