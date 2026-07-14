import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const Logo = ({ collapsed = false }) => {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 select-none"
      aria-label="Streamix Home"
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-lg shadow-black/20"
      >
        <Play
          size={20}
          strokeWidth={2.3}
          className="translate-x-[1px] fill-white text-white"
        />
      </motion.div>

      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col leading-none"
        >
          <span className="text-lg font-semibold tracking-tight text-white">
            Streamix
          </span>

          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Premium Streaming
          </span>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;