import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/notifications");
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      return notificationId;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllNotificationsAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch("/notifications/read-all");
      return true;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

export const removeNotification = createAsyncThunk(
  "notifications/removeNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      return notificationId;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark One Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (item) => item._id === action.payload
        );

        if (notification) {
          notification.isRead = true;
        }
      })

      // Mark All Read
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications.forEach((notification) => {
          notification.isRead = true;
        });
      })

      // Delete
      .addCase(removeNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;