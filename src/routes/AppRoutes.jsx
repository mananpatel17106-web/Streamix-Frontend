import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Playlist from "../pages/Playlist";
import History from "../pages/History";
import UploadVideo from "../pages/UploadVideo";
import WatchVideo from "../pages/WatchVideo";
import NotFound from "../pages/NotFound";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import Search from "../pages/Search";
import Explore from "../pages/Explore";
import Subscription from "../pages/Subscription";
import YourVideos from "../pages/YourVideos";
import LikedVideos from "../pages/LikedVideos";
import Channel from "../pages/Channel";
import EditVideo from "../pages/EditVideo";
import Explore from "../pages/Explore";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Guest */}

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/watch/:videoId" element={<WatchVideo />} />

          <Route path="/upload" element={<UploadVideo />} />

          <Route path="/history" element={<History />} />

          <Route path="/playlists" element={<Playlist />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />

          <Route path="/subscriptions" element={<Subscription />} />

          <Route path="/your-videos" element={<YourVideos />} />

          <Route path="/liked-videos" element={<LikedVideos />} />

          <Route path="/channel/:username" element={<Channel />} />

          <Route path="/edit-video/:videoId" element={<EditVideo />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
