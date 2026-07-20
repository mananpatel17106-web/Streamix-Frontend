import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
  setSidebarOpen(false);
}, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar
        onMenu={() => setSidebarOpen((prev) => !prev)}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        className="
          min-h-screen
          pt-16
          lg:pl-64
          transition-all
          duration-300
        ">
        <div className="mx-auto max-w-[1800px] p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}