import { NavLink } from "react-router-dom";
import { navigation } from "../../utils/navigation";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-neutral-800 bg-[#0f0f0f]">
      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }
                `
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;