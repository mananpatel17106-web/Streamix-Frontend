import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const toggleVideoLike = createAsyncThunk("likes/video",
  async (videoId, { rejectWithValue }) => {
    try { const { data } = await api.post(`/likes/toggle/v/${videoId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const toggleCommentLike = createAsyncThunk("likes/comment",
  async (commentId, { rejectWithValue }) => {
    try { const { data } = await api.post(`/likes/toggle/c/${commentId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const toggleTweetLike = createAsyncThunk("likes/tweet",
  async (tweetId, { rejectWithValue }) => {
    try { const { data } = await api.post(`/likes/toggle/t/${tweetId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const fetchLikedVideos = createAsyncThunk("likes/videos",
  async (_, { rejectWithValue }) => {
    try { const { data } = await api.get("/likes/videos"); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

const slice = createSlice({
  name: "likes",
  initialState: { liked: [], status: "idle" },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchLikedVideos.fulfilled, (s, a) => {
      s.liked = Array.isArray(a.payload) ? a.payload : a.payload?.docs || [];
    });
  },
});
export default slice.reducer;
