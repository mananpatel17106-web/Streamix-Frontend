import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Flame,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { fetchVideos } from "../features/video/videoSlice";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Learn",
  "Sports",
  "News",
  "Tech",
  "Live",
];

export default function Home() {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const query = params.get("query") || "";
  const filter = params.get("filter") || "";

  const { list, status } = useSelector(
    (state) => state.videos
  );

  useEffect(() => {
    dispatch(
      fetchVideos({
        query,
        sortBy:
          filter === "trending"
            ? "views"
            : "createdAt",
        sortType: "desc",
      })
    );
  }, [dispatch, query, filter]);

  const videos = useMemo(
    () => list || [],
    [list]
  );

  return (
    <div className="space-y-8">

      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-neutral-800
          bg-gradient-to-br
          from-neutral-900
          via-neutral-950
          to-black
          p-8
          md:p-12
        "
      >
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-rose-600/20 blur-[120px]" />

        <div className="relative max-w-3xl">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-neutral-700
              bg-neutral-900
              px-4
              py-2
              text-sm
            "
          >
            <Sparkles
              size={15}
              className="text-yellow-400"
            />

            New Experience
          </div>

          <h1
            className="
              mt-6
              text-5xl
              md:text-6xl
              font-black
              leading-tight
            "
          >
            Stream
            <span className="text-rose-500">
              {" "}
              Smarter
            </span>

            <br />

            Watch Better.
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-neutral-400
            "
          >
            Discover premium creators,
            trending videos and cinematic
            content built for the next
            generation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              className="
                rounded-xl
                bg-rose-600
                px-6
                py-3
                font-semibold
                transition
                hover:bg-rose-500
              "
            >
              Explore
            </button>

            <button
              className="
                rounded-xl
                border
                border-neutral-700
                px-6
                py-3
                font-semibold
                hover:bg-neutral-900
              "
            >
              Trending
            </button>

          </div>
        </div>
      </section>

      {/* Categories */}

      <div className="flex gap-3 overflow-x-auto pb-2">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setParams(
                category === "All"
                  ? {}
                  : {
                      filter:
                        category.toLowerCase(),
                    }
              )
            }
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${
              (category === "All" &&
                !filter) ||
              filter ===
                category.toLowerCase()
                ? "bg-white text-black"
                : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            {category}
          </button>
        ))}

      </div>

      {/* Trending Strip */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <TrendingUp className="mb-3 text-rose-500" />

          <h3 className="font-semibold">
            Trending Videos
          </h3>

          <p className="mt-2 text-sm text-neutral-400">
            Fresh content updated every
            minute.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <Flame className="mb-3 text-orange-400" />

          <h3 className="font-semibold">
            Most Popular
          </h3>

          <p className="mt-2 text-sm text-neutral-400">
            Videos people are watching
            right now.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <Sparkles className="mb-3 text-yellow-400" />

          <h3 className="font-semibold">
            Recommended
          </h3>

          <p className="mt-2 text-sm text-neutral-400">
            Personalized content for you.
          </p>
        </div>
      </div>
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
          "
        >
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
            "
          >
            <Flame
              size={36}
              className="text-rose-500"
            />
          </div>

          <h2 className="text-2xl font-bold">
            No Videos Found
          </h2>

          <p className="mt-3 max-w-md text-neutral-400">
            Looks like there aren't any
            videos available right now.
            Upload your first video and
            start growing your audience.
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
            "
          >
            Upload First Video
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Latest Videos
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                {videos.length} videos available
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
              "
            >
              View All
            </button>

          </div>

          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              2xl:grid-cols-4
            "
          >
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}