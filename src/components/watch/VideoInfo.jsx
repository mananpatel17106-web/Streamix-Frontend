import { useState } from "react";
import { Eye, CalendarDays, ChevronDown, ChevronUp } from "lucide-react";

const VideoInfo = ({ video }) => {
  const [expanded, setExpanded] = useState(false);

  if (!video) return null;

  const {
    title,
    description,
    views,
    createdAt,
    tags = [],
  } = video;

  const formatViews = (count = 0) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="mt-6">
      {/* Title */}

      <h1 className="text-2xl font-bold leading-snug text-white">
        {title}
      </h1>

      {/* Meta */}

      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <Eye size={16} />
          <span>{formatViews(views)} views</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>

      {/* Description */}

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"
        >
          Description

          {expanded ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        <p
          className={`whitespace-pre-line text-sm leading-7 text-zinc-300 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {description || "No description available."}
        </p>

        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoInfo;