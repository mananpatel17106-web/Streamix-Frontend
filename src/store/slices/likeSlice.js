import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import likeService from "../../services/like.service";

const initialState = {
  loading: false,
  error: null,
};

export const toggleVideoLike =
  createAsyncThunk(
    "like/toggleVideoLike",
    async (videoId, thunkAPI) => {
      try {
        return await likeService.toggleVideoLike(
          videoId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

const likeSlice = createSlice({
  name: "like",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        toggleVideoLike.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        toggleVideoLike.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        toggleVideoLike.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default likeSlice.reducer;