import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  ListPlus,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

const ActionButton = ({
  icon: Icon,
  label,
  count,
  active = false,
  onClick,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all ${
        active
          ? "border-white bg-white text-black"
          : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      <Icon size={18} />

      <span className="text-sm font-medium">
        {label}
      </span>

      {count !== undefined && (
        <span className="text-xs opacity-80">
          {count}
        </span>
      )}
    </motion.button>
  );
};

const VideoActions = ({
  video,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike,
  onShare,
  onSave,
  onDownload,
}) => {
  if (!video) return null;

  const formatNumber = (num = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <ActionButton
        icon={ThumbsUp}
        label="Like"
        count={formatNumber(video.likesCount)}
        active={isLiked}
        onClick={onLike}
      />

      <ActionButton
        icon={ThumbsDown}
        label="Dislike"
        active={isDisliked}
        onClick={onDislike}
      />

      <ActionButton
        icon={Share2}
        label="Share"
        onClick={onShare}
      />

      <ActionButton
        icon={ListPlus}
        label="Save"
        onClick={onSave}
      />

      <ActionButton
        icon={Download}
        label="Download"
        onClick={onDownload}
      />
    </div>
  );
};

export default VideoActions;