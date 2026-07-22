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
    subscribedChannelIds: [],
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

      const channels = Array.isArray(action.payload) ? action.payload : [];

      state.channels = channels;

      state.subscribedChannelIds = channels.map(
        (item) => item.channel?._id || item._id,
      );
    });

    b.addCase(fetchSubscribedChannels.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
    b.addCase(fetchChannelSubscribers.pending, (state) => {
      state.status = "loading";
    })

      .addCase(fetchChannelSubscribers.fulfilled, (state, action) => {
        state.status = "idle";

        state.subscribers = action.payload || [];
      });

    b.addCase(fetchChannelSubscribers.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });

    b.addCase(toggleSubscription.pending, (state) => {
      state.status = "loading";
    });
    b.addCase(toggleSubscription.fulfilled, (state, action) => {
    state.status = "idle";

    const channelId = action.meta.arg;
    const { subscribed } = action.payload || {};

    if (subscribed) {
        if (!state.subscribedChannelIds.includes(channelId)) {
            state.subscribedChannelIds.push(channelId);
        }
    } else {
        state.subscribedChannelIds =
            state.subscribedChannelIds.filter(
                (id) => id !== channelId
            );
    }
})

    b.addCase(toggleSubscription.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
  },
});
export default slice.reducer;
