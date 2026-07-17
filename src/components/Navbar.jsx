import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { logoutUser } from "../features/auth/authSlice";

export default function Navbar({ onMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const logout = async () => {
    await dispatch(logoutUser());

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const submit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/?query=${encodeURIComponent(query.trim())}`);

    setShowSearch(false);
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

                <button
                  className="
                    relative
                    h-10
                    w-10
                    rounded-xl
                    hover:bg-neutral-900
                    transition
                  ">
                  <Bell size={19} className="mx-auto" />

                  <span
                    className="
                      absolute
                      top-2
                      right-2
                      h-2
                      w-2
                      rounded-full
                      bg-rose-500
                    "
                  />
                </button>

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
                      </div>

                      <div className="p-2">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfile(false)}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-neutral-900
                          ">
                          <User size={18} />
                          Profile
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setShowProfile(false)}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-neutral-900
                          ">
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setShowProfile(false)}
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-neutral-900
                          ">
                          <Settings size={18} />
                          Settings
                        </Link>

                        <button
                          onClick={logout}
                          className="
                            mt-2
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-left
                            text-red-400
                            hover:bg-red-500/10
                          ">
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
