import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const [openMobile, setOpenMobile] = useState(false);
  return (
    <div className="min-h-screen bg-bg">
      <Navbar onMenu={() => setOpenMobile((v) => !v)} />
      <div className="flex">
        <Sidebar open={openMobile} onClose={() => setOpenMobile(false)} />
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 md:pl-72">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
