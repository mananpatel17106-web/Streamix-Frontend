import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const fetchVideos = createAsyncThunk(
  "videos/list",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/videos", { params });
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const fetchVideoById = createAsyncThunk(
  "videos/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/videos/${id}`);
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const publishVideo = createAsyncThunk(
  "videos/publish",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/videos", formData);
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const updateVideo = createAsyncThunk(
  "videos/update",
  async ({ videoId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/videos/${videoId}`, formData);
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const deleteVideo = createAsyncThunk(
  "videos/delete",
  async (videoId, { rejectWithValue }) => {
    try { await api.delete(`/videos/${videoId}`); return videoId; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const togglePublish = createAsyncThunk(
  "videos/togglePublish",
  async (videoId, { rejectWithValue }) => {
    try { const { data } = await api.patch(`/videos/toggle/publish/${videoId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: { list: [], current: null, status: "idle", error: null, hasMore: true },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchVideos.pending, (s) => { s.status = "loading"; });
    b.addCase(fetchVideos.fulfilled, (s, a) => {
      s.status = "idle";
      const payload = a.payload;
      s.list = Array.isArray(payload) ? payload : payload?.docs || payload?.videos || [];
    });
    b.addCase(fetchVideos.rejected, (s, a) => { s.status = "idle"; s.error = a.payload; });

    b.addCase(fetchVideoById.fulfilled, (s, a) => { s.current = a.payload; });
    b.addCase(deleteVideo.fulfilled, (s, a) => { s.list = s.list.filter((v) => v._id !== a.payload); });
  },
});

export default videoSlice.reducer;
