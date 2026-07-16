import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchVideos } from "../../../../cielo/lovable/src/features/videos/videoSlice";
import VideoCard from "../../../../cielo/lovable/src/components/VideoCard";
import Loader from "../../../../cielo/lovable/src/components/Loader";

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
  const { list, status } = useSelector((s) => s.videos);

  useEffect(() => {
    dispatch(
      fetchVideos({
        query,
        sortBy: filter === "trending" ? "views" : "createdAt",
        sortType: "desc",
      }),
    );
  }, [dispatch, query, filter]);

  const videos = useMemo(() => list || [], [list]);

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-hero p-8 md:p-12 mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            New drops every day
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            Stream beyond the <span className="text-gradient">frame</span>.
          </h1>
          <p className="mt-4 text-muted max-w-lg">
            A cinematic home for creators — upload in minutes, reach your
            audience with zero distractions, and grow with real-time studio
            insights.
          </p>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() =>
              setParams(c === "All" ? {} : { filter: c.toLowerCase() })
            }
            className={`shrink-0 h-9 px-4 rounded-full text-sm border transition-colors ${
              (c === "All" && !filter) || filter === c.toLowerCase()
                ? "bg-white text-black border-white"
                : "border-border bg-card hover:bg-border"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {status === "loading" ? (
        <Loader />
      ) : videos.length === 0 ? (
        <div className="py-24 text-center text-muted">
          No videos yet. Be the first to upload.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
