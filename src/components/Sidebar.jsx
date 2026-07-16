import { NavLink } from "react-router-dom";
import {
  Home, Flame, Users, ListVideo, Heart, History, LayoutDashboard, MessageSquare, X,
} from "lucide-react";
import { useSelector } from "react-redux";

const link = ({ isActive }) =>
  `flex items-center gap-3 px-4 h-11 rounded-xl text-sm font-medium transition-colors ${
    isActive ? "bg-card text-white" : "text-muted hover:bg-card hover:text-text"
  }`;

export default function Sidebar({ open, onClose }) {
  const user = useSelector((s) => s.auth.user);
  return (
    <>
      <aside className={`fixed z-40 md:z-10 top-16 left-0 w-64 bg-surface md:bg-transparent border-r border-border md:border-r-0 h-[calc(100vh-4rem)] p-4 overflow-y-auto scrollbar-thin transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <button className="md:hidden mb-3 p-2 rounded-lg hover:bg-card" onClick={onClose}><X className="w-4 h-4"/></button>
        <nav className="space-y-1">
          <NavLink end to="/" className={link}><Home className="w-4 h-4" /> Home</NavLink>
          <NavLink to="/?filter=trending" className={link}><Flame className="w-4 h-4" /> Trending</NavLink>
          {user && (
            <>
              <div className="mt-6 px-4 text-[10px] font-bold uppercase tracking-widest text-muted">You</div>
              <NavLink to="/subscriptions" className={link}><Users className="w-4 h-4" /> Subscriptions</NavLink>
              <NavLink to="/history" className={link}><History className="w-4 h-4" /> History</NavLink>
              <NavLink to="/liked" className={link}><Heart className="w-4 h-4" /> Liked Videos</NavLink>
              <NavLink to="/playlists" className={link}><ListVideo className="w-4 h-4" /> Playlists</NavLink>
              <NavLink to={`/tweets/${user._id}`} className={link}><MessageSquare className="w-4 h-4" /> My Tweets</NavLink>
              <NavLink to="/dashboard" className={link}><LayoutDashboard className="w-4 h-4" /> Studio</NavLink>
            </>
          )}
        </nav>
        <div className="mt-8 p-4 rounded-2xl border border-border bg-card/60">
          <div className="font-display text-sm font-semibold">Streamix Studio</div>
          <p className="mt-1 text-xs text-muted">Upload, analyze, and grow your channel with real-time insights.</p>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}
    </>
  );
}
