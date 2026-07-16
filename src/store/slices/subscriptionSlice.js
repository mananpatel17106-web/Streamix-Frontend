import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import subscriptionService from "../../services/subscription.service";

const initialState = {
  subscribedChannels: [],
  channelSubscribers: [],
  channel: null,
  loading: false,
  error: null,
};

// Toggle Subscription

export const toggleSubscription = createAsyncThunk(
  "subscription/toggleSubscription",
  async (channelId, thunkAPI) => {
    try {
      return await subscriptionService.toggleSubscription(channelId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// Get Channel Profile

export const getChannelProfile = createAsyncThunk(
  "subscription/getChannelProfile",
  async (username, thunkAPI) => {
    try {
      return await subscriptionService.getChannelProfile(username);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// Get Subscribed Channels

export const getSubscribedChannels = createAsyncThunk(
  "subscription/getSubscribedChannels",
  async (subscriberId, thunkAPI) => {
    try {
      return await subscriptionService.getSubscribedChannels(subscriberId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// Get Channel Subscribers

export const getChannelSubscribers = createAsyncThunk(
  "subscription/getChannelSubscribers",
  async (channelId, thunkAPI) => {
    try {
      return await subscriptionService.getChannelSubscribers(channelId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const subscriptionSlice = createSlice({
  name: "subscription",

  initialState,

  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },

    clearChannel: (state) => {
      state.channel = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Toggle Subscription

      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;

        if (state.channel) {
          state.channel.isSubscribed = action.payload.data.subscribed;

          state.channel.subscribersCount = action.payload.data.subscribersCount;
        }
      })

      .addCase(toggleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Channel Profile

      .addCase(getChannelProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload?.data || null;
      })

      .addCase(getChannelProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subscribed Channels

      .addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedChannels = action.payload?.data || [];
      })

      .addCase(getSubscribedChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Channel Subscribers

      .addCase(getChannelSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getChannelSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.channelSubscribers = action.payload?.data || [];
      })

      .addCase(getChannelSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubscriptionError, clearChannel } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
