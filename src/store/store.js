import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice";
import likeReducer from "./slices/likeSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import playlistReducer from "./slices/playlistSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    like: likeReducer,
    playlist: playlistReducer,
    subscription: subscriptionReducer,
  },
});

export default store;