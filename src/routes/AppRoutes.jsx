import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import UploadVideo from "../pages/UploadVideo";
import WatchVideo from "../pages/WatchVideo";
import Playlist from "../pages/Playlist";
import History from "../pages/History";
import Subscription from "../pages/Subscription";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/upload" element={<UploadVideo />} />

        <Route path="/watch/:videoId" element={<WatchVideo />} />

        <Route path="/playlist" element={<Playlist />} />

        <Route path="/history" element={<History />} />

        <Route
          path="/subscriptions"
          element={<Subscription />}
        />

        <Route path="/search" element={<Search />} />

        <Route
          path="/profile/:username"
          element={<Profile />}
        />

        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;