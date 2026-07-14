import { useState } from "react";
import {
  Home,
  Compass,
  Clock3,
  PlaySquare,
  ListVideo,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: "Home",
      to: "/",
      icon: Home,
    },
    {
      label: "Explore",
      to: "/explore",
      icon: Compass,
    },
    {
      label: "Subscriptions",
      to: "/subscriptions",
      icon: Users,
    },
    {
      label: "History",
      to: "/history",
      icon: Clock3,
    },
    {
      label: "Playlists",
      to: "/playlists",
      icon: ListVideo,
    },
    {
      label: "Your Videos",
      to: "/dashboard/videos",
      icon: PlaySquare,
    },
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: BarChart3,
    },
  ];

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-white/5 bg-[#09090B] transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/5 p-5">
        <Logo collapsed={collapsed} />

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition hover:text-white"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t border-white/5 p-4">
        {!collapsed && (
          <>
            <p className="text-sm font-medium text-zinc-300">
              Streamix
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Premium Streaming Platform
            </p>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;