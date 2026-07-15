import { Link } from "react-router-dom";
import { Eye, Clock } from "lucide-react";

const VideoCard = ({ video }) => {
  const formatViews = (views = 0) => {
    if (views >= 1000000)
      return `${(views / 1000000).toFixed(1)}M`;

    if (views >= 1000)
      return `${(views / 1000).toFixed(1)}K`;

    return views;
  };

  const formatDuration = (duration = 0) => {
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const timeAgo = (date) => {
    const seconds = Math.floor(
      (Date.now() - new Date(date)) / 1000
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
      const count = Math.floor(seconds / value);

      if (count >= 1) {
        return `${count} ${label}${
          count > 1 ? "s" : ""
        } ago`;
      }
    }

    return "Just now";
  };

  return (
    <Link
      to={`/watch/${video._id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
    >
      <div className="relative overflow-hidden">

        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs text-white">

          {formatDuration(video.duration)}

        </span>

      </div>

      <div className="p-5">

        <div className="flex gap-4">

          <img
            src={video.owner.avatar}
            alt={video.owner.username}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="flex-1">
                        <h3 className="line-clamp-2 text-lg font-semibold leading-7 text-white transition group-hover:text-zinc-200">

              {video.title}

            </h3>

            <p className="mt-2 text-sm text-zinc-400">

              {video.owner.fullName}

            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-500">

              <span className="flex items-center gap-1">

                <Eye size={15} />

                {formatViews(video.views)} views

              </span>

              <span className="flex items-center gap-1">

                <Clock size={15} />

                {timeAgo(video.createdAt)}

              </span>

            </div>

          </div>

        </div>

      </div>

    </Link>
  );
};

export default VideoCard;