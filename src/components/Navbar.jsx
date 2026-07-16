import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Sparkles, Search, Menu, Upload, LogOut, User } from "lucide-react";
import { logoutUser } from "../features/auth/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar({ onMenu }) {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);

  const doLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Signed out");
    navigate("/login");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/?query=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 h-16 px-4 md:px-6">
        <button className="md:hidden p-2 rounded-lg hover:bg-card" onClick={onMenu}>
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </span>
          <span className="font-display font-bold text-xl hidden sm:block">Streamix</span>
        </Link>

        <form onSubmit={submit} className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e)=>setQ(e.target.value)}
              className="input pl-10" placeholder="Search creators, videos, playlists…" />
          </div>
        </form>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/upload" className="btn-primary hidden sm:inline-flex">
                <Upload className="w-4 h-4" /> Upload
              </Link>
              <div className="relative">
                <button onClick={()=>setMenu(v=>!v)} className="flex items-center gap-2 p-1 rounded-full hover:bg-card">
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-border" />
                </button>
                {menu && (
                  <div className="absolute right-0 top-12 w-56 card p-2 shadow-elevated">
                    <div className="px-3 py-2 border-b border-border">
                      <div className="font-semibold text-sm">{user.fullName}</div>
                      <div className="text-xs text-muted">@{user.username}</div>
                    </div>
                    <Link to="/profile" onClick={()=>setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface text-sm"><User className="w-4 h-4"/>Profile</Link>
                    <Link to="/dashboard" onClick={()=>setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface text-sm">Dashboard</Link>
                    <button onClick={doLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface text-sm text-primary-soft">
                      <LogOut className="w-4 h-4"/> Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Sign in</Link>
              <Link to="/register" className="btn-primary">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
