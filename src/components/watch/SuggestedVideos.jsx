import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const SuggestedVideos = ({
  videos = [],
  currentVideoId,
}) => {
  const formatViews = (views = 0) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }

    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }

    return views;
  };

  const filteredVideos = videos.filter(
    (video) => video._id !== currentVideoId
  );

  if (!filteredVideos.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="text-lg font-semibold text-white">
          Suggested Videos
        </h3>

        <p className="mt-3 text-sm text-zinc-500">
          No suggested videos available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <h2 className="text-xl font-bold text-white">
        Suggested Videos
      </h2>

      {filteredVideos.map((video) => (
        <Link
          key={video._id}
          to={`/watch/${video._id}`}
          className="group flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 transition hover:border-zinc-700 hover:bg-zinc-900"
        >
          {/* Thumbnail */}

          <div className="relative w-44 overflow-hidden rounded-xl">

            <img
              src={video.thumbnail}
              alt={video.title}
              className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
            />

            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-[10px] text-white">
              {video.duration || "00:00"}
            </span>

          </div>

          {/* Info */}

          <div className="min-w-0 flex-1">

            <h3 className="line-clamp-2 font-semibold text-white">
              {video.title}
            </h3>

            <p className="mt-2 truncate text-sm text-zinc-400">
              {video.owner?.fullName}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">

              <Eye size={13} />

              {formatViews(video.views)} views

            </div>

          </div>
        </Link>
      ))}
    </div>
  );
};

export default SuggestedVideos;