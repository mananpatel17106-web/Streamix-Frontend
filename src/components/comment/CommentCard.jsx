import { useMemo, useState } from "react";
import {
  ThumbsUp,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

const CommentCard = ({ comment }) => {
  const [liked, setLiked] = useState(false);

  const [editing, setEditing] = useState(false);

  const [text, setText] = useState(
    comment?.content || ""
  );

  const timeAgo = useMemo(() => {
    if (!comment?.createdAt) return "";

    const seconds = Math.floor(
      (Date.now() -
        new Date(comment.createdAt)) /
        1000
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
  }, [comment]);

  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">

      <img
        src={comment?.owner?.avatar}
        alt={comment?.owner?.username}
        className="h-11 w-11 rounded-full object-cover"
      />

      <div className="flex-1">

        <div className="flex items-center gap-3">

          <h4 className="font-semibold text-white">
            {comment?.owner?.fullName}
          </h4>

          <span className="text-xs text-zinc-500">
            @{comment?.owner?.username}
          </span>

          <span className="text-xs text-zinc-600">
            •
          </span>

          <span className="text-xs text-zinc-500">
            {timeAgo}
          </span>

        </div>

        {!editing ? (
          <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-300">
            {text}
          </p>
        ) : (
          <textarea
            rows={3}
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
          />
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
                  {/* Like */}

          <button
            onClick={() => setLiked((prev) => !prev)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              liked
                ? "bg-white text-black"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <ThumbsUp size={16} />

            {liked ? "Liked" : "Like"}
          </button>

          {/* Edit */}

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <Pencil size={16} />

              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm text-white transition hover:bg-emerald-600"
              >
                <Check size={16} />

                Save
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  setText(comment?.content || "");
                }}
                className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white transition hover:bg-zinc-700"
              >
                <X size={16} />

                Cancel
              </button>
            </>
          )}

          {/* Delete */}

          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={16} />

            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default CommentCard;