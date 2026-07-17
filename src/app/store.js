import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import videoReducer from "../features/video/videoSlice";
import commentReducer from "../features/comment/commentSlice";
import likeReducer from "../features/likes/likeSlice";
import playlistReducer from "../features/playlist/playlistSlice";
import subscriptionReducer from "../features/subscription/subscriptionSlice";
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
