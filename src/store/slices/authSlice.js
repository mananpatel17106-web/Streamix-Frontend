import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import authService from "../../services/auth.service";

const initialState = {
  user: null,

  isAuthenticated: false,

  loading: false,

  error: null,
};

export const registerUser =
  createAsyncThunk(
    "auth/register",
    async (formData, thunkAPI) => {
      try {
        return await authService.register(
          formData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const loginUser =
  createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
      try {
        return await authService.login(
          credentials
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const logoutUser =
  createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
      try {
        await authService.logout();

        return true;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const getCurrentUser =
  createAsyncThunk(
    "auth/currentUser",
    async (_, thunkAPI) => {
      try {
        return await authService.getCurrentUser();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );


export const refreshUser =
  createAsyncThunk(
    "auth/refreshUser",
    async (_, thunkAPI) => {
      try {
        await authService.refreshToken();

        return await authService.getCurrentUser();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    resetAuth: (state) => {
      state.user = null;

      state.loading = false;

      state.isAuthenticated = false;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )
            // =========================
      // LOGIN
      // =========================

      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;

          // Login API returns:
          // data -> { user, accessToken, refreshToken }

          state.user =
            action.payload?.data?.user;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;

          state.user = null;

          state.isAuthenticated = false;
        }
      )

      // =========================
      // CURRENT USER
      // =========================

      .addCase(
        getCurrentUser.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        getCurrentUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload?.data;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      .addCase(
        getCurrentUser.rejected,
        (state) => {
          state.loading = false;

          state.user = null;

          state.isAuthenticated = false;
        }
      )

      // =========================
      // REFRESH USER
      // =========================

      .addCase(
        refreshUser.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        refreshUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload?.data;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      .addCase(
        refreshUser.rejected,
        (state) => {
          state.loading = false;

          state.user = null;

          state.isAuthenticated = false;
        }
      )

      .addCase(
        logoutUser.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.loading = false;

          state.user = null;

          state.isAuthenticated = false;

          state.error = null;
        }
      )

      .addCase(
        logoutUser.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAuthError,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;