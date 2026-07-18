import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  Search,
  Upload,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  X,
  Sparkles,
  History,
  Heart,
  ListVideo,
  UserPlus,
  MessageCircle,
  CheckCheck,
  Video,
  Tv,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { logoutUser } from "../features/auth/authSlice";

export default function Navbar({ onMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "subscriber",
      title: "New Subscriber",
      text: "Alex subscribed to your channel.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "like",
      title: "New Like",
      text: "Your video received a new like.",
      time: "10 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "comment",
      title: "New Comment",
      text: "Someone commented on your latest upload.",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      type: "upload",
      title: "Upload Complete",
      text: "Your latest upload is live.",
      time: "Today",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        unread: false,
      })),
    );
  };

  const notificationRef = useRef(null);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";

    if (currentQuery !== query) {
      setQuery(currentQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const value = query.trim();

    const timer = setTimeout(() => {
      if (value.length === 0) {
        navigate("/", {
          replace: true,
        });
        return;
      }

      if (value.length >= 2) {
        navigate(`/?query=${encodeURIComponent(value)}`, {
          replace: true,
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const logout = async () => {
    await dispatch(logoutUser());

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          h-16
          border-b
          border-neutral-800
          bg-neutral-950/90
          backdrop-blur-xl
        ">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          {/* Left */}

          <div className="flex items-center gap-3">
            <button
              onClick={onMenu}
              className="
                lg:hidden
                h-10
                w-10
                rounded-xl
                hover:bg-neutral-900
                transition
              ">
              <Menu className="w-5 h-5 mx-auto" />
            </button>

            <Link to="/" className="flex items-center gap-3">
              <div
                className="
                  h-10
                  w-10
                  rounded-xl
                  bg-gradient-to-br
                  from-rose-600
                  via-pink-500
                  to-yellow-400
                  flex
                  items-center
                  justify-center
                  shadow-lg
                ">
                <Sparkles className="text-white" size={20} />
              </div>

              <div className="hidden sm:block">
                <h2 className="font-bold text-xl">Streamix</h2>

                <p className="text-xs text-neutral-400">Premium Streaming</p>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}

          <form
            onSubmit={submit}
            className="
              hidden
              md:flex
              flex-1
              max-w-2xl
              mx-8
            ">
            <div className="relative w-full">
              <Search
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-neutral-500
                "
                size={18}
              />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search videos, creators..."
                className="
                  w-full
                  h-11
                  rounded-full
                  bg-neutral-900
                  border
                  border-neutral-800
                  pl-11
                  pr-5
                  outline-none
                  focus:border-rose-500
                  transition
                "
              />
            </div>
          </form>

          {/* Right */}

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => setShowSearch((v) => !v)}
                  className="
                    md:hidden
                    h-10
                    w-10
                    rounded-xl
                    hover:bg-neutral-900
                    transition
                  ">
                  {showSearch ? <X size={18} /> : <Search size={18} />}
                </button>

                <Link
                  to="/upload"
                  className="
                    hidden
                    sm:flex
                    items-center
                    gap-2
                    h-10
                    px-4
                    rounded-xl
                    bg-rose-600
                    hover:bg-rose-500
                    transition
                    font-medium
                  ">
                  <Upload size={18} />
                  Upload
                </Link>

                <div ref={notificationRef} className="relative">
                  <button
                    onClick={() => setShowNotifications((v) => !v)}
                    className="relative h-10 w-10 rounded-xl hover:bg-neutral-900 transition">
                    <Bell size={19} className="mx-auto" />

                    {unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
                      <div className="flex items-center justify-between border-b border-neutral-800 p-4">
                        <h3 className="font-semibold">Notifications</h3>

                        <button
                          onClick={markAllRead}
                          className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300">
                          <CheckCheck size={15} />
                          Mark all read
                        </button>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((item, i) => (
                          <button
                            key={i}
                            className="flex w-full flex-col items-start border-b border-neutral-900 px-4 py-4 text-left hover:bg-neutral-900">
                            <span className="font-medium">{item.title}</span>

                            <span className="mt-1 text-sm text-neutral-400">
                              {item.text}
                            </span>

                            <span className="mt-2 text-xs text-neutral-500">
                              {item.time}
                            </span>
                          </button>
                        ))}
                      </div>

                      <button className="w-full border-t border-neutral-800 py-3 text-sm font-medium hover:bg-neutral-900">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>

                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setShowProfile((v) => !v)}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      hover:ring-2
                      hover:ring-rose-500
                      transition
                    ">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="
                        h-10
                        w-10
                        rounded-full
                        object-cover
                        border
                        border-neutral-700
                      "
                    />
                  </button>

                  {showProfile && (
                    <div
                      className="
                        absolute
                        right-0
                        mt-3
                        w-72
                        rounded-2xl
                        border
                        border-neutral-800
                        bg-neutral-950
                        shadow-2xl
                        overflow-hidden
                      ">
                      <div className="p-5 border-b border-neutral-800">
                        <img
                          src={user.avatar}
                          alt=""
                          className="
                            h-14
                            w-14
                            rounded-full
                            object-cover
                            mb-3
                          "
                        />

                        <h3 className="font-semibold text-lg">
                          {user.fullName}
                        </h3>

                        <p className="text-sm text-neutral-400">
                          @{user.username}
                        </p>

                        <div className="mt-3 inline-flex rounded-full bg-rose-600/15 px-3 py-1 text-xs font-medium text-rose-400">
                          Premium Creator
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <User size={18} />
                          Profile
                        </Link>

                        <Link
                          to={`/channel/${user.username}`}
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <Tv size={18} />
                          Your Channel
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <ListVideo size={18} />
                          Your Videos
                        </Link>

                        <Link
                          to="/playlists"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <ListVideo size={18} />
                          Playlists
                        </Link>

                        <Link
                          to="/liked"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <Heart size={18} />
                          Liked Videos
                        </Link>

                        <Link
                          to="/history"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <History size={18} />
                          Watch History
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-neutral-900">
                          <Settings size={18} />
                          Settings
                        </Link>

                        <div className="my-2 border-t border-neutral-800" />

                        <button
                          onClick={logout}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 hover:bg-red-500/10">
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    rounded-xl
                    border
                    border-neutral-700
                    px-4
                    py-2
                    hover:bg-neutral-900
                  ">
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="
                    rounded-xl
                    bg-rose-600
                    px-4
                    py-2
                    hover:bg-rose-500
                    transition
                  ">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {showSearch && (
          <div className="border-t border-neutral-800 p-4 md:hidden">
            <form onSubmit={submit}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="
                  w-full
                  h-11
                  rounded-xl
                  border
                  border-neutral-800
                  bg-neutral-900
                  px-4
                  outline-none
                  focus:border-rose-500
                "
              />
            </form>
          </div>
        )}
      </header>
    </>
  );
}
