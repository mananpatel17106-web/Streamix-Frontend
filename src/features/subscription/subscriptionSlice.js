import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const toggleSubscription = createAsyncThunk(
  "subs/toggle",
  async (channelId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/subscriptions/c/${channelId}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const fetchChannelSubscribers = createAsyncThunk(
  "subs/channelSubs",
  async (channelId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/subscriptions/c/${channelId}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const fetchSubscribedChannels = createAsyncThunk(
  "subs/userSubs",
  async (subscriberId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/subscriptions/u/${subscriberId}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

const slice = createSlice({
  name: "subscriptions",
  initialState: {
    channels: [],
    subscribers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSubscribedChannels.pending, (state) => {
      state.status = "loading";
    });

    b.addCase(fetchSubscribedChannels.fulfilled, (state, action) => {
      state.status = "idle";

      state.channels = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.docs || [];
    });

    b.addCase(fetchSubscribedChannels.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
    b.addCase(fetchChannelSubscribers.pending, (state) => {
      state.status = "loading";
    });

    b.addCase(fetchChannelSubscribers.fulfilled, (state, action) => {
      state.status = "idle";

      state.subscribers = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.docs || [];
    });

    b.addCase(fetchChannelSubscribers.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
    b.addCase(toggleSubscription.pending, (state) => {
      state.status = "loading";
    });

    b.addCase(toggleSubscription.fulfilled, (state) => {
      state.status = "idle";
    });

    b.addCase(toggleSubscription.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
  },
});
export default slice.reducer;
