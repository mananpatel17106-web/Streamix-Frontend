import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, apiErr } from "../../services/api";

export const createTweet = createAsyncThunk("tweets/create",
  async (content, { rejectWithValue }) => {
    try { const { data } = await api.post("/tweets", { content }); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const fetchUserTweets = createAsyncThunk("tweets/user",
  async (userId, { rejectWithValue }) => {
    try { const { data } = await api.get(`/tweets/user/${userId}`); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const updateTweet = createAsyncThunk("tweets/update",
  async ({ tweetId, content }, { rejectWithValue }) => {
    try { const { data } = await api.patch(`/tweets/${tweetId}`, { content }); return data.data; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

export const deleteTweet = createAsyncThunk("tweets/delete",
  async (tweetId, { rejectWithValue }) => {
    try { await api.delete(`/tweets/${tweetId}`); return tweetId; }
    catch (e) { return rejectWithValue(apiErr(e)); }
  });

const slice = createSlice({
  name: "tweets",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUserTweets.fulfilled, (s, a) => {
      s.list = Array.isArray(a.payload) ? a.payload : [];
    });
    b.addCase(createTweet.fulfilled, (s, a) => { s.list.unshift(a.payload); });
    b.addCase(deleteTweet.fulfilled, (s, a) => {
      s.list = s.list.filter((t) => t._id !== a.payload);
    });
    b.addCase(updateTweet.fulfilled, (s, a) => {
      const i = s.list.findIndex((t) => t._id === a.payload._id);
      if (i > -1) s.list[i] = a.payload;
    });
  },
});
export default slice.reducer;
