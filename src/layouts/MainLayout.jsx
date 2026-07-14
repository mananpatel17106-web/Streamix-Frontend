import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-neutral-800 bg-[#0f0f0f]">
        Navbar
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-neutral-800 bg-[#0f0f0f]">
          Sidebar
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;