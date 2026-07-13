import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptions: [],
  isLoading: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },

    setSubscriptionLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSubscriptions,
  setSubscriptionLoading,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;