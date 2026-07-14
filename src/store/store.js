import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice";
// import playlistReducer from "./slices/playlistSlice";
// import subscriptionReducer from "./slices/subscriptionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    // playlist: playlistReducer,
    // subscription: subscriptionReducer,
  },
});

export default store;