import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (query) => {
    if (!query.trim()) {
      navigate("/");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="flex">
        {/* Sidebar */}

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content */}

        <div className="flex min-h-screen flex-1 flex-col lg:ml-[270px]">
          <Navbar
            onSearch={handleSearch}
            onMenu={() => setSidebarOpen((prev) => !prev)}
          />

          <main className="flex-1 px-4 pt-20 pb-6 md:px-6 md:pt-20 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
