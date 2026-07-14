import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const VideoInfo = ({ video }) => {
  const [expanded, setExpanded] = useState(false);

  const formatViews = (views = 0) => {
    if (views >= 1000000)
      return `${(views / 1000000).toFixed(1)}M`;

    if (views >= 1000)
      return `${(views / 1000).toFixed(1)}K`;

    return views;
  };

  const publishedAt = useMemo(() => {
    if (!video?.createdAt) return "";

    return new Date(
      video.createdAt
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [video]);

  return (
    <section className="mt-6">

      {/* Title */}

      <h1 className="text-2xl font-bold leading-snug text-white lg:text-3xl">
        {video?.title}
      </h1>

      {/* Meta */}

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-400">

        <span className="flex items-center gap-2">

          <Eye size={16} />

          {formatViews(video?.views)} views

        </span>

        <span className="flex items-center gap-2">

          <CalendarDays size={16} />

          {publishedAt}

        </span>

      </div>

      {/* Creator */}

      <div className="mt-8 flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <img
            src={video?.owner?.avatar}
            alt={video?.owner?.username}
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>

            <Link
              to={`/profile/${video?.owner?.username}`}
              className="text-lg font-semibold text-white hover:underline"
            >
              {video?.owner?.fullName}
            </Link>

            <p className="mt-1 text-sm text-zinc-500">
              @{video?.owner?.username}
            </p>

          </div>

        </div>

        <button
          className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Subscribe
        </button>

      </div>

      {/* Description */}

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "max-h-[500px]" : "max-h-24"
          }`}
        >
          <p className="whitespace-pre-wrap leading-7 text-zinc-300">
            {video?.description ||
              "No description available."}
          </p>
        </div>

        {video?.description?.length > 180 && (
          <button
            onClick={() =>
              setExpanded((prev) => !prev)
            }
            className="mt-5 flex items-center gap-2 text-sm font-medium text-white transition hover:text-zinc-300"
          >
            {expanded ? (
              <>
                Show Less
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show More
                <ChevronDown size={18} />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoInfo;