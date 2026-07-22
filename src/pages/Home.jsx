import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Flame, TrendingUp, Sparkles } from "lucide-react";

import { fetchVideos } from "../features/video/videoSlice";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

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
export default function Home() {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const query = params.get("query") || "";
  const filter = params.get("filter") || "";
  const isSearching = query.trim().length > 0;

  const { list, status } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(
      fetchVideos({
        query,
        category: filter || undefined,
        sortBy: filter === "trending" ? "views" : "createdAt",
        sortType: "desc",
      }),
    );
  }, [dispatch, query, filter]);

  const videos = useMemo(() => list || [], [list]);

  return (
    <div className="space-y-10 pb-10">
      {/* Hero */}
      {!isSearching && !filter && (
        <section className="hidden lg:block  relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-950 px-5 py-7 sm:px-8 md:px-12 md:py-12">
          <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-rose-600/10 blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/70 px-4 py-2 text-sm font-medium text-neutral-200 backdrop-blur">
                <Sparkles size={15} className="text-yellow-400" />
                Premium Streaming Platform
              </div>

              <h1 className="mt-7 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                Discover.
                <br />
                Watch.
                <br />
                <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                  Create.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base lg:text-lg lg:leading-8">
                Watch millions of videos, discover talented creators, and enjoy
                high-quality content across every category.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 520, behavior: "smooth" })
                  }
                  className="w-full sm:w-auto rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-rose-500 hover:scale-[1.03]">
                  ▶ Start Watching
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full sm:w-auto rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-3 font-semibold transition hover:border-neutral-500 hover:bg-neutral-800">
                  📺 Browse Categories
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="hidden lg:flex justify-end">
              <div className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900/70 p-7 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600/20 text-rose-500">
                    <TrendingUp size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Trending Today</h3>

                    <p className="text-sm text-neutral-400">
                      Explore what's popular
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 px-4 py-3">
                    <span>🎵 Music</span>
                    <span className="text-neutral-400">Popular</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 px-4 py-3">
                    <span>🎮 Gaming</span>
                    <span className="text-neutral-400">Trending</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 px-4 py-3">
                    <span>💻 Technology</span>
                    <span className="text-neutral-400">Hot</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-neutral-800/60 px-4 py-3">
                    <span>🎬 Entertainment</span>
                    <span className="text-neutral-400">New</span>
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-400">
                  🔥 Updated continuously
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {!isSearching && (
        <div
          id="categories"
          className="flex w-full gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-2 no-scrollbar touch-pan-x">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setParams(
                  category === "All"
                    ? {}
                    : {
                        filter: category,
                      },
                )
              }
              className={`flex-none rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                (category === "All" && !filter) ||
                filter === category
                  ? "bg-white text-black shadow-lg"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
              }`}>
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Videos */}

      {status === "loading" ? (
        <Loader />
      ) : videos.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-neutral-800
            bg-neutral-900
            py-24
            text-center
          ">
          <div
            className="
              mb-6
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-neutral-800
            ">
            <Flame size={36} className="text-rose-500" />
          </div>

          <h2 className="text-3xl font-bold">Nothing to show</h2>

          <p className="mt-4 max-w-md text-neutral-400 leading-7">
            {isSearching ? (
              <>
                We couldn't find any videos matching
                <br />
                <span className="font-semibold text-white">"{query}"</span>
              </>
            ) : (
              <>
                Looks like there are no videos yet. Upload your first video and
                start your journey.
              </>
            )}
          </p>

          <button
            className="
              mt-8
              rounded-xl
              bg-rose-600
              px-6
              py-3
              font-semibold
              transition
              hover:bg-rose-500
            ">
            Start Uploading
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              {isSearching && (
                <div
                  className="
        inline-flex
        items-center
        rounded-full
        bg-rose-600/15
        border
        border-rose-600/30
        px-4
        py-2
        text-sm
        text-rose-300
        mb-4
      ">
                  Search Mode
                </div>
              )}
              <h2 className="text-2xl font-bold">
                {isSearching
                  ? `Search Results for "${query}"`
                  : "Recommended Videos"}
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                {isSearching
                  ? `${videos.length} matching videos`
                  : "Fresh videos picked for you"}
              </p>
            </div>

            <button
              className="
                hidden
                md:block
                rounded-xl
                border
                border-neutral-700
                px-5
                py-2
                text-sm
                hover:bg-neutral-900
              ">
              View All
            </button>
          </div>

          <div
            className="
  grid
  grid-cols-1
  gap-4
  sm:grid-cols-2
  sm:gap-5
  lg:grid-cols-3
  lg:gap-6
  2xl:grid-cols-4
">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
