import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Clock3, Eye } from "lucide-react";
import { motion } from "framer-motion";

const VideoCard = forwardRef(({ video }, ref) => {
  const {
    _id,
    title,
    thumbnail,
    duration,
    views,
    createdAt,
    owner,
  } = video;

  const formatViews = (count = 0) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  const formatDuration = (seconds = 0) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const upload = new Date(date);

    const diff = Math.floor(
      (now - upload) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 0) return "Today";
    if (diff === 1) return "1 day ago";
    if (diff < 30) return `${diff} days ago`;
    if (diff < 365) return `${Math.floor(diff / 30)} months ago`;

    return `${Math.floor(diff / 365)} years ago`;
  };

  return (
    <motion.article
      ref={ref}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        to={`/watch/${_id}`}
        className="block"
      >
        {/* Thumbnail */}

        <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            {formatDuration(duration)}
          </div>
        </div>

        {/* Info */}

        <div className="mt-4 flex gap-3">
          <img
            src={owner?.avatar}
            alt={owner?.username}
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-white">
              {title}
            </h3>

            <p className="mt-1 truncate text-sm text-zinc-400">
              {owner?.fullName}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Eye size={13} />
                {formatViews(views)} views
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {formatDate(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});

VideoCard.displayName = "VideoCard";

export default VideoCard;