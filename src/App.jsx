import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authSlice";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";
import EditVideo from "./pages/EditVideo";
import Channel from "./pages/Channel";
import Profile from "./pages/Profile";
import LikedVideos from "./pages/LikedVideos";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Playlists from "./pages/Playlists";
import PlaylistPage from "./pages/PlaylistPage";
import Subscriptions from "./pages/Subscriptions";
import Tweets from "./pages/Tweets";
import NotFound from "./pages/NotFound";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.accessToken);

  useEffect(() => {
    if (token) dispatch(fetchCurrentUser());
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        <Route path="/c/:username" element={<Channel />} />
        <Route path="/tweets/:userId" element={<Tweets />} />
        <Route path="/playlist/:playlistId" element={<PlaylistPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit/:videoId" element={<EditVideo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liked" element={<LikedVideos />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/404" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
