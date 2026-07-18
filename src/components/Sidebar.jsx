import { NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  Flame,
  Users,
  Heart,
  History,
  ListVideo,
  LayoutDashboard,
  MessageSquare,
  Upload,
  X,
} from "lucide-react";

const navItem = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
    isActive
      ? "bg-rose-600 text-white shadow-lg"
      : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
  }`;

export default function Sidebar({ open, onClose }) {
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  const isTrending = searchParams.get("filter") === "trending";

  return (
    <>
      <aside
        className={`
          fixed
          top-16
          left-0
          z-40
          h-[calc(100vh-4rem)]
          w-64
          overflow-y-auto
          border-r
          border-neutral-800
          bg-neutral-950
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-bold text-white">Menu</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-neutral-900">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive && !isTrending
                  ? "bg-rose-600 text-white shadow-lg"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`
            }>
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/?filter=trending"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive && isTrending
                  ? "bg-rose-600 text-white shadow-lg"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`
            }>
            <Flame size={18} />
            <span>Trending</span>
          </NavLink>

          {user && (
            <>
              <div className="mt-6 mb-2 px-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Library
              </div>

              <NavLink to="/subscriptions" className={navItem}>
                <Users size={18} />
                <span>Subscriptions</span>
              </NavLink>

              <NavLink to="/history" className={navItem}>
                <History size={18} />
                <span>History</span>
              </NavLink>

              <NavLink to="/liked" className={navItem}>
                <Heart size={18} />
                <span>Liked Videos</span>
              </NavLink>

              <NavLink to="/playlists" className={navItem}>
                <ListVideo size={18} />
                <span>Playlists</span>
              </NavLink>

              <NavLink to={`/tweets/${user?._id}`} className={navItem}>
                <MessageSquare size={18} />
                <span>Tweets</span>
              </NavLink>

              <NavLink to="/dashboard" className={navItem}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/upload" className={navItem}>
                <Upload size={18} />
                <span>Upload</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Creator Studio Card */}
        <div className="mx-3 mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <h3 className="text-lg font-semibold text-white">
            🚀 Creator Studio
          </h3>

          <p className="mt-2 text-sm leading-6 text-neutral-400">
            Upload videos, manage playlists, check analytics and grow your
            audience with Streamix Studio.
          </p>

          <NavLink
            to="/dashboard"
            className="mt-5 flex items-center justify-center rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-500">
            Open Studio
          </NavLink>
        </div>

        {/* Footer */}
        <div className="mx-4 mt-10 border-t border-neutral-800 pt-5 pb-8">
          <p className="text-xs leading-6 text-neutral-500">Streamix © 2026</p>

          <p className="mt-2 text-xs text-neutral-600">
            Built with React, Redux Toolkit & Tailwind CSS.
          </p>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
