import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import videoReducer from "../features/videos/videoSlice";
import commentReducer from "../features/comments/commentSlice";
import likeReducer from "../features/likes/likeSlice";
import playlistReducer from "../features/playlists/playlistSlice";
import subscriptionReducer from "../features/subscriptions/subscriptionSlice";
import tweetReducer from "../features/tweets/tweetSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    comments: commentReducer,
    likes: likeReducer,
    playlists: playlistReducer,
    subscriptions: subscriptionReducer,
    tweets: tweetReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});
