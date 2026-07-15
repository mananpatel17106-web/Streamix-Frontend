import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";

import Loader from "./components/ui/Loader";

import { refreshUser } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
     dispatch(refreshUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090B]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,

          style: {
            background: "#18181B",

            color: "#fff",

            border: "1px solid #27272A",
          },
        }}
      />
          </>
  );
}

export default App;