import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice";
import likeReducer from "./slices/likeSlice";
// import playlistReducer from "./slices/playlistSlice";
// import subscriptionReducer from "./slices/subscriptionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    like: likeReducer,
    // playlist: playlistReducer,
    // subscription: subscriptionReducer,
  },
});

export default store;