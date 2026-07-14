import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  CircleUserRound,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logoutUser } from "../../store/slices/authSlice";

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged Out Successfully");

      navigate("/login", {
        replace: true,
      });
    }
  };

  const avatar =
    user?.avatar ||
    "https://ui-avatars.com/api/?background=18181b&color=fff&name=User";

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-2 py-2 transition hover:border-zinc-700"
      >
        <img
          src={avatar}
          alt={user?.username || "User"}
          className="h-9 w-9 rounded-full object-cover"
        />

        <div className="hidden text-left lg:block">
          <p className="max-w-[140px] truncate text-sm font-medium text-white">
            {user?.username || "Guest"}
          </p>

          <p className="text-xs text-zinc-500">
            @{user?.username || "guest"}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`hidden text-zinc-400 transition-transform lg:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-zinc-800 bg-[#111111] shadow-2xl"
          >
            {/* User Info */}

            <div className="border-b border-zinc-800 p-4">
              <p className="truncate font-semibold text-white">
                {user?.fullName || "Guest User"}
              </p>

              <p className="truncate text-sm text-zinc-500">
                {user?.email || "guest@streamix.com"}
              </p>
            </div>

            {/* Menu */}

            <div className="py-2">
              <Link
                to={`/profile/${user?.username}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                <CircleUserRound size={18} />
                Profile
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                <Settings size={18} />
                Settings
              </Link>
            </div>

            {/* Logout */}

            <div className="border-t border-zinc-800 p-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;