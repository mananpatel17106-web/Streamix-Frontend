import { useEffect, useMemo, useState } from "react";
import { Compass, SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchVideos } from "../features/video/videoSlice";

import CategoryBar from "../components/explore/CategoryBar";
import ExploreGrid from "../components/explore/ExploreGrid";
import ExploreSkeleton from "../components/explore/ExploreSkeleton";

const categories = [
  "All",
  "Programming",
  "AI",
  "Gaming",
  "Music",
  "Education",
  "News",
  "Sports",
  "Movies",
  "Live",
];

const sortOptions = [
  {
    label: "Latest",
    value: "latest",
  },
  {
    label: "Most Viewed",
    value: "views",
  },
  {
    label: "A - Z",
    value: "title",
  },
];

export default function Explore() {
  const dispatch = useDispatch();

  const {
    list: videos = [],
    status,
    page,
    totalPages,
  } = useSelector((state) => state.videos);

  const loading = status === "loading";

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [limit, setLimit] = useState(24);

  useEffect(() => {
    dispatch(
      fetchVideos({
        page: 1,
        limit,
        category: activeCategory === "All" ? undefined : activeCategory,
      }),
    );
  }, [dispatch, limit, activeCategory]);

  const filteredVideos = useMemo(() => {
    let list = [...videos];


    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter((video) => {
        const owner =
          video.owner?.fullName?.toLowerCase() ||
          video.owner?.username?.toLowerCase() ||
          "";

        return video.title?.toLowerCase().includes(q) || owner.includes(q);
      });
    }

    switch (sort) {
      case "views":
        list.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;

      case "title":
        list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;

      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [videos, activeCategory, search, sort]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/15 border border-red-500/20">
            <Compass size={30} className="text-red-500" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">Explore</h1>

            <p className="mt-1 text-sm text-neutral-400">
              Discover videos from creators around the world.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-neutral-900 px-4 py-3">
          <SlidersHorizontal size={18} className="text-neutral-400" />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-sm text-white outline-none">
            {sortOptions.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="bg-neutral-900">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          {filteredVideos.length} videos found
        </p>

        <p className="text-xs text-neutral-500">
          Page {page} of {totalPages}
        </p>
      </div>

      {loading ? (
        <ExploreSkeleton />
      ) : filteredVideos.length ? (
        <ExploreGrid videos={filteredVideos} />
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 py-24 text-center">
          <h2 className="text-xl font-semibold text-white">No videos found</h2>

          <p className="mt-2 text-sm text-neutral-500">
            Try another category or search.
          </p>
        </div>
      )}

      {videos.length >= limit && (
        <div className="flex justify-center">
          <button
            onClick={() => setLimit((prev) => prev + 24)}
            className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
