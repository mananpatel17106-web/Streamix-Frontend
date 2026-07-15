import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import subscriptionService from "../../services/subscription.service";

const initialState = {
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

const subscriptionSlice = createSlice({
  name: "subscription",

  initialState,

  reducers: {},

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
      );
  },
});

export default subscriptionSlice.reducer;