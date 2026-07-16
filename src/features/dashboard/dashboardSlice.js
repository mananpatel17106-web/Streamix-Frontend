import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const fetchChannelStats = createAsyncThunk("dashboard/stats",
  async (_, { rejectWithValue }) => {
    try { const { data } = await api.get("/dashboard/stats"); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const fetchChannelVideos = createAsyncThunk("dashboard/videos",
  async (_, { rejectWithValue }) => {
    try { const { data } = await api.get("/dashboard/videos"); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

const slice = createSlice({
  name: "dashboard",
  initialState: { stats: null, videos: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchChannelStats.fulfilled, (s, a) => { s.stats = a.payload; });
    b.addCase(fetchChannelVideos.fulfilled, (s, a) => {
      s.videos = Array.isArray(a.payload) ? a.payload : [];
    });
  },
});
export default slice.reducer;
