import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Redux auth state sathe replace karvanu
  const user = {
    username: "manan",
    fullName: "Manan Patel",
    email: "manan@example.com",
    avatar: "",
  };

  const handleSearch = (query) => {
    console.log("Search:", query);

    // TODO:
    // navigate(`/search?q=${encodeURIComponent(query)}`)
  };

  const handleLogout = () => {
    console.log("Logout");

    // TODO:
    // dispatch(logout())
    // navigate("/login")
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex">
        {/* Sidebar */}

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main */}

        <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
          <Navbar
            user={user}
            onLogout={handleLogout}
            onSearch={handleSearch}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;