import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const fetchComments = createAsyncThunk(
  "comments/list",
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/comments/${videoId}`);
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const addComment = createAsyncThunk(
  "comments/add",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/comments/${videoId}`, { content });
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId, { rejectWithValue }) => {
    try { await api.delete(`/comments/c/${commentId}`); return commentId; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/comments/c/${commentId}`, { content });
      return data.data;
    } catch (e) { return rejectWithValue(apiErr(e)); }
  }
);

const slice = createSlice({
  name: "comments",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchComments.pending, (s) => { s.status = "loading"; });
    b.addCase(fetchComments.fulfilled, (s, a) => {
      s.status = "idle";
      s.list = Array.isArray(a.payload) ? a.payload : a.payload?.docs || [];
    });
    b.addCase(addComment.fulfilled, (s, a) => { s.list.unshift(a.payload); });
    b.addCase(deleteComment.fulfilled, (s, a) => {
      s.list = s.list.filter((c) => c._id !== a.payload);
    });
    b.addCase(updateComment.fulfilled, (s, a) => {
      const i = s.list.findIndex((c) => c._id === a.payload._id);
      if (i > -1) s.list[i] = a.payload;
    });
  },
});
export default slice.reducer;
