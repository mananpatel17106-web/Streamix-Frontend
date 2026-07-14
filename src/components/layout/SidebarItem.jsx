import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  collapsed = false,
  badge,
}) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className={`group relative flex h-12 items-center rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          {isActive && (
            <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-white" />
          )}

          <div
            className={`flex w-full items-center ${
              collapsed ? "justify-center" : "px-4"
            }`}
          >
            <Icon
              size={20}
              strokeWidth={2}
              className={`transition-transform duration-200 ${
                isActive ? "scale-105" : "group-hover:scale-105"
              }`}
            />

            {!collapsed && (
              <>
                <span className="ml-4 flex-1 text-sm font-medium tracking-wide">
                  {label}
                </span>

                {badge && (
                  <span className="rounded-md bg-zinc-700 px-2 py-0.5 text-xs text-zinc-200">
                    {badge}
                  </span>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </NavLink>
  );
};

export default SidebarItem;