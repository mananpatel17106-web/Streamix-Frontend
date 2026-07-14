import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CommentCard = ({
  comment,
  currentUser,
  onLike,
  onReply,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!comment) return null;

  const {
    owner,
    content,
    createdAt,
    likesCount = 0,
    isLiked = false,
  } = comment;

  const isOwner = currentUser?._id === owner?._id;

  const formatTime = (date) => {
    const diff = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000
    );

    if (diff < 60) return "Just now";

    if (diff < 3600) {
      return `${Math.floor(diff / 60)} min ago`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hr ago`;
    }

    if (diff < 2592000) {
      return `${Math.floor(diff / 86400)} days ago`;
    }

    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
    >
      {/* Avatar */}

      <img
        src={owner?.avatar}
        alt={owner?.username}
        className="h-11 w-11 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold text-white">
              {owner?.fullName}
            </h4>

            {owner?.isVerified && (
              <CheckCircle2
                size={16}
                className="text-sky-400"
              />
            )}

            <span className="text-xs text-zinc-500">
              @{owner?.username}
            </span>

            <span className="text-xs text-zinc-600">
              •
            </span>

            <span className="text-xs text-zinc-500">
              {formatTime(createdAt)}
            </span>
          </div>

          {isOwner && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
              >
                <MoreVertical size={18} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: .95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: .95 }}
                    className="absolute right-0 top-11 z-20 w-40 rounded-xl border border-zinc-800 bg-zinc-950 py-2 shadow-xl"
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit?.(comment);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete?.(comment);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Comment */}

        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-300">
          {content}
        </p>

        {/* Footer */}

        <div className="mt-4 flex items-center gap-6">
          <button
            onClick={() => onLike?.(comment)}
            className={`flex items-center gap-2 text-sm transition ${
              isLiked
                ? "text-red-400"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <Heart
              size={17}
              fill={isLiked ? "currentColor" : "none"}
            />

            {likesCount}
          </button>

          <button
            onClick={() => onReply?.(comment)}
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <MessageCircle size={17} />
            Reply
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default CommentCard;