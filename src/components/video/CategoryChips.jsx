import { motion } from "framer-motion";

const DEFAULT_CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "Programming",
  "React",
  "JavaScript",
  "Node.js",
  "Movies",
  "Podcasts",
  "News",
  "Education",
  "Sports",
  "Technology",
  "Live",
  "Recently Uploaded",
];

const CategoryChips = ({
  categories = DEFAULT_CATEGORIES,
  activeCategory = "All",
  onSelect,
}) => {
  return (
    <div className="mb-8 flex items-center gap-3 overflow-x-auto scrollbar-none">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <motion.button
            key={category}
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.15 }}
            onClick={() => onSelect?.(category)}
            className={`
              whitespace-nowrap
              rounded-full
              border
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                active
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              }
            `}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryChips;