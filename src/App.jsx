import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/ui/Loader";

import { getCurrentUser } from "./store/slices/authSlice";
import { refreshUser } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // dispatch(getCurrentUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181B",
            color: "#ffffff",
            border: "1px solid #27272A",
          },
          success: {
            iconTheme: {
              primary: "#22C55E",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <AppRoutes />
    </>
  );
};

export default App;