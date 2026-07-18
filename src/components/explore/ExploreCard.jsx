import { Link } from "react-router-dom";
import { Clock3, Eye } from "lucide-react";

export default function ExploreCard({ video }) {
  const owner = video.owner || {};

  const formatViews = (views = 0) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  const timeAgo = (date) => {
    if (!date) return "";

    const seconds = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000
    );

    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
    ];

    for (const [label, value] of units) {
      const amount = Math.floor(seconds / value);
      if (amount >= 1) {
        return `${amount} ${label}${amount > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  return (
    <Link
      to={`/watch/${video._id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-3">
          <img
            src={
              owner.avatar ||
              "https://ui-avatars.com/api/?background=18181b&color=fff&name=User"
            }
            alt={owner.fullName}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-semibold text-white transition group-hover:text-primary">
              {video.title}
            </h3>

            <p className="mt-1 truncate text-sm text-zinc-400">
              {owner.fullName}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {formatViews(video.views)}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={14} />
                {timeAgo(video.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}