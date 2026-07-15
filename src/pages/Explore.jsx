import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/ui/Loader";
import VideoCard from "../components/video/VideoCard";

import { getVideos } from "../store/slices/videoSlice";

const Explore = () => {
  const dispatch = useDispatch();

  const { videos, loading } = useSelector((state) => state.video);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");

  const [sortType, setSortType] = useState("desc");

  useEffect(() => {
    dispatch(
      getVideos({
        page: 1,
        limit: 20,
        query: search,
        sortBy,
        sortType,
      }),
    );
  }, [dispatch, search, sortBy, sortType]);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Explore</h1>

        <p className="mt-2 text-zinc-500">Discover amazing videos.</p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-12 pr-4 text-white outline-none focus:border-zinc-600"
          />
        </div>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="h-12 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-white outline-none">
          <option value="desc">Latest</option>

          <option value="asc">Oldest</option>
        </select>
      </div>

      {loading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {videos.length === 0 ? (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">
                <Search size={60} className="mb-6 text-zinc-700" />

                <h2 className="text-2xl font-semibold text-white">
                  No Videos Found
                </h2>

                <p className="mt-3 max-w-md text-center text-zinc-500">
                  Try searching with another keyword.
                </p>
              </div>
            </div>
          ) : (
            videos.map((video) => <VideoCard key={video._id} video={video} />)
          )}
        </div>
      )}
    </section>
  );
};

export default Explore;
