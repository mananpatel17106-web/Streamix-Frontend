import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

// Toggle Video Like
export const toggleVideoLike = createAsyncThunk(
  "likes/video",
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/likes/toggle/v/${videoId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

// Toggle Comment Like
export const toggleCommentLike = createAsyncThunk(
  "likes/comment",
  async (commentId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/likes/toggle/c/${commentId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

// Toggle Tweet Like
export const toggleTweetLike = createAsyncThunk(
  "likes/tweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/likes/toggle/t/${tweetId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

// Get Liked Videos
export const fetchLikedVideos = createAsyncThunk(
  "likes/videos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/likes/videos");
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  },
);

const initialState = {
  liked: [],
  likedVideoIds: [],
  status: "idle",
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(toggleVideoLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleVideoLike.fulfilled, (state, action) => {
        state.status = "idle";
        state.lastLikeResponse = action.payload;

        const videoId = action.meta.arg;

        const exists = state.likedVideoIds.includes(videoId);

        if (exists) {
          state.likedVideoIds = state.likedVideoIds.filter(
            (id) => id !== videoId,
          );
        } else {
          state.likedVideoIds.push(videoId);
        }
      })
      .addCase(toggleVideoLike.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(toggleCommentLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleCommentLike.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(toggleCommentLike.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(toggleTweetLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleTweetLike.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(toggleTweetLike.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(fetchLikedVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLikedVideos.fulfilled, (state, action) => {
        state.status = "idle";

        const videos = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.docs || [];

        state.liked = videos;

        state.likedVideoIds = videos
          .filter((item) => item.video?._id)
          .map((item) => item.video._id.toString());
        console.log(action.payload);
      })
      .addCase(fetchLikedVideos.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;
