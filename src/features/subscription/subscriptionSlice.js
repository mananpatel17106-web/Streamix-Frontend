import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const toggleSubscription = createAsyncThunk("subs/toggle",
  async (channelId, { rejectWithValue }) => {
    try { const { data } = await api.post(`/subscriptions/c/${channelId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const fetchChannelSubscribers = createAsyncThunk("subs/channelSubs",
  async (channelId, { rejectWithValue }) => {
    try { const { data } = await api.get(`/subscriptions/c/${channelId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const fetchSubscribedChannels = createAsyncThunk("subs/userSubs",
  async (subscriberId, { rejectWithValue }) => {
    try { const { data } = await api.get(`/subscriptions/u/${subscriberId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

const slice = createSlice({
  name: "subscriptions",
  initialState: { channels: [], subscribers: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSubscribedChannels.fulfilled, (s, a) => {
      s.channels = Array.isArray(a.payload) ? a.payload : [];
    });
    b.addCase(fetchChannelSubscribers.fulfilled, (s, a) => {
      s.subscribers = Array.isArray(a.payload) ? a.payload : [];
    });
  },
});
export default slice.reducer;
