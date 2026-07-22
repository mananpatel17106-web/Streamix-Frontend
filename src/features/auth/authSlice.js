import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";
import { toggleSubscription } from "../subscription/subscriptionSlice";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/register", formData);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e, "Registration failed"));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const payload = credentials.identifier?.includes("@")
        ? { email: credentials.identifier, password: credentials.password }
        : { username: credentials.identifier, password: credentials.password };
      const { data } = await api.post("/users/login", payload);
      const token = data?.data?.accessToken;
      if (token) localStorage.setItem("streamix_token", token);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e, "Login failed"));
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/users/logout");
  } catch {}
  localStorage.removeItem("streamix_token");
  return null;
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/current-user");
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/change-password", body);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/users/update-account-details", body);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const { data } = await api.patch("/users/avatar", fd);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const updateCoverImage = createAsyncThunk(
  "auth/updateCover",
  async (file, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("coverImage", file);
      const { data } = await api.patch("/users/cover-image", fd);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const fetchChannelProfile = createAsyncThunk(
  "auth/channelProfile",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/users/c/${username}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const fetchWatchHistory = createAsyncThunk(
  "auth/history",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/history");
      return data.data;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

export const addToHistory = createAsyncThunk(
  "auth/addToHistory",
  async (videoId, { rejectWithValue }) => {
    try {
      await api.patch(`/users/history/${videoId}`);
      return videoId;
    } catch (e) {
      return rejectWithValue(apiErr(e));
    }
  },
);

const initial = {
  user: null,
  accessToken: localStorage.getItem("streamix_token") || null,
  status: "idle",
  error: null,
  channel: null,
  history: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    clearError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginUser.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(loginUser.fulfilled, (s, a) => {
      s.status = "idle";
      s.user = a.payload.user;
      s.accessToken = a.payload.accessToken;
    });
    b.addCase(loginUser.rejected, (s, a) => {
      s.status = "idle";
      s.error = a.payload;
    });

    b.addCase(fetchCurrentUser.fulfilled, (s, a) => {
      s.user = a.payload;
    });
    b.addCase(fetchCurrentUser.rejected, (s) => {
      s.user = null;
    });

    b.addCase(logoutUser.fulfilled, (s) => {
      s.user = null;
      s.accessToken = null;
    });

    b.addCase(updateAccount.fulfilled, (s, a) => {
      s.user = a.payload;
    });
    b.addCase(updateAvatar.fulfilled, (s, a) => {
      s.user = a.payload;
    });
    b.addCase(updateCoverImage.fulfilled, (s, a) => {
      s.user = a.payload;
    });

    b.addCase(fetchChannelProfile.fulfilled, (s, a) => {
      s.channel = a.payload;
    });
    b.addCase(fetchWatchHistory.fulfilled, (s, a) => {
      s.history = a.payload || [];
    });
    b.addCase(addToHistory.fulfilled, () => {});
    b.addCase(toggleSubscription.fulfilled, (state, action) => {
    if (!state.channel) return;

    if (state.channel._id !== action.meta.arg) return;

    state.channel.isSubscribed = action.payload.subscribed;
    state.channel.subscribersCount =
        action.payload.subscribersCount;
})
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
