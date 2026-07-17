import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

// ==================== GET COMMENTS ====================

export const fetchComments = createAsyncThunk(
  "comments/list",
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/comments/${videoId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

// ==================== ADD COMMENT ====================

export const addComment = createAsyncThunk(
  "comments/add",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/comments/${videoId}`, {
        content,
      });

      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

// ==================== UPDATE COMMENT ====================

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/comments/c/${commentId}`, {
        content,
      });

      return data.data;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

// ==================== DELETE COMMENT ====================

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId, { rejectWithValue }) => {
    try {
      await api.delete(`/comments/c/${commentId}`);

      return commentId;
    } catch (error) {
      return rejectWithValue(apiErr(error));
    }
  }
);

// ==================== SLICE ====================

const initialState = {
  list: [],
  total: 0,
  status: "idle",
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==================== FETCH ====================

      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "idle";

        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.total = action.payload.length;
        } else {
          state.list = action.payload?.docs || [];
          state.total =
            action.payload?.totalDocs ||
            action.payload?.total ||
            state.list.length;
        }
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      // ==================== ADD ====================

      .addCase(addComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "idle";
        state.list.unshift(action.payload);
        state.total += 1;
      })

      .addCase(addComment.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      // ==================== UPDATE ====================

      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.list.findIndex(
          (comment) => comment._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(updateComment.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      // ==================== DELETE ====================

      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "idle";

        state.list = state.list.filter(
          (comment) => comment._id !== action.payload
        );

        if (state.total > 0) {
          state.total -= 1;
        }
      })

      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;