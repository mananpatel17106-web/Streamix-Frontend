import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <div className="flex pt-16">

        <Sidebar />

        <main className="ml-64 flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;