import { Clock3, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const formatViews = (views = 0) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }

    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }

    return views;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);

    const seconds = Math.floor(
      (now - created) / 1000
    );

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const key in intervals) {
      const value = Math.floor(
        seconds / intervals[key]
      );

      if (value >= 1) {
        return `${value} ${key}${value > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  return (
    <Link
      to={`/watch/${video._id}`}
      className="group block"
    >
      {/* Thumbnail */}

      <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

        <span className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur">
          {video.duration || "00:00"}
        </span>
      </div>

      {/* Content */}

      <div className="mt-4 flex gap-3">
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-white transition group-hover:text-zinc-200">
            {video.title}
          </h3>

          <p className="mt-1 truncate text-sm text-zinc-500">
            {video.owner?.fullName}
          </p>

          <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Eye size={13} />
              {formatViews(video.views)}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={13} />
              {timeAgo(video.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;