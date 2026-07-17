import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./app/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 3000,

            success: {
              style: {
                background: "#111827",
                color: "#fff",
                border: "1px solid #374151",
              },
            },

            error: {
              style: {
                background: "#7f1d1d",
                color: "#fff",
              },
            },

            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "12px",
              padding: "14px 16px",
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);