import {
  Bell,
  Menu,
  Plus,
  Search,
} from "lucide-react";

import Button from "../ui/Button";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-neutral-800 bg-[#0f0f0f]">
      <div className="mx-auto flex h-full items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 hover:bg-neutral-800">
            <Menu size={22} />
          </button>

          <Logo />
        </div>

        {/* Center */}

        <div className="hidden w-full max-w-xl items-center md:flex">
          <div className="flex w-full items-center rounded-full border border-neutral-700 bg-neutral-900">

            <input
              type="text"
              placeholder="Search videos..."
              className="flex-1 bg-transparent px-5 py-2 outline-none"
            />

            <button className="border-l border-neutral-700 px-5 py-2 hover:bg-neutral-800">
              <Search size={20} />
            </button>

          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <Button
            variant="secondary"
            className="hidden md:flex"
          >
            <Plus size={18} />

            <span className="ml-2">
              Upload
            </span>
          </Button>

          <button className="rounded-full p-2 hover:bg-neutral-800">
            <Bell size={21} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-black">
            M
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;