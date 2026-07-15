import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import subscriptionService from "../../services/subscription.service";

const initialState = {
  subscribedChannels: [],
  channelSubscribers: [],
  loading: false,
  error: null,
};

export const toggleSubscription =
  createAsyncThunk(
    "subscription/toggle",
    async (channelId, thunkAPI) => {
      try {
        return await subscriptionService.toggleSubscription(
          channelId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const getSubscribedChannels =
  createAsyncThunk(
    "subscription/getSubscribedChannels",
    async (subscriberId, thunkAPI) => {
      try {
        return await subscriptionService.getSubscribedChannels(
          subscriberId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const getChannelSubscribers =
  createAsyncThunk(
    "subscription/getChannelSubscribers",
    async (channelId, thunkAPI) => {
      try {
        return await subscriptionService.getChannelSubscribers(
          channelId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

const subscriptionSlice = createSlice({
  name: "subscription",

  initialState,

  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        toggleSubscription.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        toggleSubscription.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        toggleSubscription.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )

      .addCase(
        getSubscribedChannels.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getSubscribedChannels.fulfilled,
        (state, action) => {
          state.loading = false;

          state.subscribedChannels =
            action.payload?.data || [];
        }
      )

      .addCase(
        getSubscribedChannels.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )

      .addCase(
        getChannelSubscribers.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getChannelSubscribers.fulfilled,
        (state, action) => {
          state.loading = false;

          state.channelSubscribers =
            action.payload?.data || [];
        }
      )

      .addCase(
        getChannelSubscribers.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export const {
  clearSubscriptionError,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;