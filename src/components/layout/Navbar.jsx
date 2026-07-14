import { Bell, Menu, Upload } from "lucide-react";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const Navbar = ({
  user,
  onLogout,
  onSearch,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#09090B]/90 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        {/* Mobile Menu */}

        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-700 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Search */}

        <div className="flex-1">
          <SearchBar
            onSubmit={onSearch}
          />
        </div>

        {/* Actions */}

        <div className="flex items-center gap-3">

          <button
            className="hidden items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white md:flex"
          >
            <Upload size={18} />
            Upload
          </button>

          <button
            className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <UserMenu
            user={user}
            onLogout={onLogout}
          />

        </div>
      </div>
    </header>
  );
};

export default Navbar;