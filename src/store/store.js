import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import videoReducer from "./slices/videoSlice";
import playlistReducer from "./slices/playlistSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    video: videoReducer,
    playlist: playlistReducer,
    subscription: subscriptionReducer,
  },
  devTools: import.meta.env.DEV,
});