import { Search } from "lucide-react";

export default function CategoryBar({
  categories,
  activeCategory,
  setActiveCategory,
  search,
  setSearch,
}) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search videos or channels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-zinc-900
            py-3
            pl-12
            pr-4
            text-sm
            text-white
            placeholder:text-zinc-500
            outline-none
            transition-all
            duration-300
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Categories */}
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-hide
        "
      >
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                whitespace-nowrap
                rounded-full
                border
                px-5
                py-2
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  active
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}