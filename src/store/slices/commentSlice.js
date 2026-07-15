import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import commentService from "../../services/comment.service";

const initialState = {
  comments: [],
  totalComments: 0,
  loading: false,
  error: null,
};

export const getVideoComments =
  createAsyncThunk(
    "comment/getVideoComments",
    async (
      { videoId, page = 1, limit = 10 },
      thunkAPI
    ) => {
      try {
        return await commentService.getVideoComments(
          videoId,
          page,
          limit
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const addComment =
  createAsyncThunk(
    "comment/addComment",
    async (
      { videoId, content },
      thunkAPI
    ) => {
      try {
        return await commentService.addComment(
          videoId,
          content
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const updateComment =
  createAsyncThunk(
    "comment/updateComment",
    async (
      { commentId, content },
      thunkAPI
    ) => {
      try {
        return await commentService.updateComment(
          commentId,
          content
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const deleteComment =
  createAsyncThunk(
    "comment/deleteComment",
    async (commentId, thunkAPI) => {
      try {
        await commentService.deleteComment(
          commentId
        );

        return commentId;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

const commentSlice = createSlice({
  name: "comment",

  initialState,

  reducers: {
    clearCommentError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        getVideoComments.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getVideoComments.fulfilled,
        (state, action) => {
          state.loading = false;

          state.comments =
            action.payload?.data?.docs || [];

          state.totalComments =
            action.payload?.data?.totalDocs ||
            0;
        }
      )

      .addCase(
        getVideoComments.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      )
            .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;

        state.comments.unshift(action.payload.data);

        state.totalComments += 1;
      })

      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.comments.findIndex(
          (comment) =>
            comment._id === action.payload.data._id
        );

        if (index !== -1) {
          state.comments[index] =
            action.payload.data;
        }
      })

      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;

        state.comments = state.comments.filter(
          (comment) =>
            comment._id !== action.payload
        );

        state.totalComments -= 1;
      })

      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
  });
  },
});

export const {
  clearCommentError,
} = commentSlice.actions;

export default commentSlice.reducer;