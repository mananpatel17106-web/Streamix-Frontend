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
  FolderOpen,
  Settings,
  CircleHelp,
  MessageSquare,
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
        className="
fixed
top-16
left-0
z-40
h-[calc(100vh-4rem)]
w-[270px]
overflow-y-auto
no-scrollbar
border-r
border-neutral-800
bg-neutral-950
transition-transform
duration-300
shadow-2xl
">
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
        <nav className="space-y-1 px-3 pt-4">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive && !isTrending
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-[1.02]"
                  : "text-neutral-400 hover:bg-neutral-900 hover:translate-x-1 hover:text-white"
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
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-[1.02]"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`
            }>
            <Flame size={18} />
            <span>Trending</span>
          </NavLink>

          {user && (
            <>
              <div className="mt-7 mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                Library
              </div>
              <NavLink to="/subscriptions" className={navItem}>
                <Users size={19} strokeWidth={2.1} />
                <span>Subscriptions</span>
              </NavLink>

              <NavLink to="/history" className={navItem}>
                <History size={19} strokeWidth={2.1} />
                <span>History</span>
              </NavLink>

              <NavLink to="/liked" className={navItem}>
                <Heart size={19} strokeWidth={2.1} />
                <span>Liked Videos</span>
              </NavLink>

              <NavLink to="/playlists" className={navItem}>
                <ListVideo size={19} strokeWidth={2.1} />
                <span>Playlists</span>
              </NavLink>

              <NavLink to={`/tweets/${user?._id}`} className={navItem}>
                <MessageSquare size={19} strokeWidth={2.1} />
                <span>Tweets</span>
              </NavLink>

              <NavLink to="/your-videos" className={navItem}>
                <FolderOpen size={19} strokeWidth={2.1} />
                <span>Your Videos</span>
              </NavLink>

              <NavLink to="/dashboard" className={navItem}>
                <LayoutDashboard size={19} strokeWidth={2.1} />
                <span>Dashboard</span>
              </NavLink>

              <div className="my-4 border-t border-neutral-800" />

              <NavLink to="/settings" className={navItem}>
                <Settings size={19} strokeWidth={2.1} />
                <span>Settings</span>
              </NavLink>

              <NavLink to="/help" className={navItem}>
                <CircleHelp size={19} strokeWidth={2.1} />
                <span>Help & Feedback</span>
              </NavLink>
            </>
          )}
        </nav>
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
