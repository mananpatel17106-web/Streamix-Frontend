import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

const RelatedVideoCard = ({ video }) => {
  if (!video) return null;

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

  const formatDate = (date) => {
    const diff = Math.floor(
      (Date.now() - new Date(date).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff <= 0) return "Today";
    if (diff === 1) return "1 day ago";
    if (diff < 30) return `${diff} days ago`;
    if (diff < 365) return `${Math.floor(diff / 30)} months ago`;

    return `${Math.floor(diff / 365)} years ago`;
  };

  const formatDuration = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/watch/${_id}`}
        className="flex gap-3 rounded-xl p-2 transition hover:bg-zinc-900"
      >
        {/* Thumbnail */}

        <div className="relative w-44 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />

          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-[10px] text-white">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Info */}

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 truncate text-xs text-zinc-400">
            {owner?.fullName}
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
            <Eye size={12} />
            <span>{formatViews(views)}</span>
          </div>

          <p className="mt-1 text-xs text-zinc-500">
            {formatDate(createdAt)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default RelatedVideoCard;