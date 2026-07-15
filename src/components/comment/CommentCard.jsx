import { useMemo, useState } from "react";
import { ThumbsUp, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  updateComment,
  deleteComment,
  getVideoComments,
} from "../../store/slices/commentSlice";

const CommentCard = ({ comment, videoId }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.comment);

  const { user } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(false);

  const [editing, setEditing] = useState(false);

  const [text, setText] = useState(comment?.content || "");

  const isOwner = user?._id === comment?.owner?._id;

  const timeAgo = useMemo(() => {
    if (!comment?.createdAt) return "";

    const seconds = Math.floor(
      (Date.now() - new Date(comment.createdAt)) / 1000,
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
        return `${count} ${label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  }, [comment]);

  const handleUpdate = async () => {
    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const result = await dispatch(
      updateComment({
        commentId: comment._id,
        content: text,
      }),
    );

    if (updateComment.fulfilled.match(result)) {
      toast.success("Comment updated");

      setEditing(false);

      dispatch(
        getVideoComments({
          videoId,
        }),
      );
    } else {
      toast.error(result.payload || "Failed to update");
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteComment(comment._id));

    if (deleteComment.fulfilled.match(result)) {
      toast.success("Comment deleted");

      dispatch(
        getVideoComments({
          videoId,
        }),
      );
    } else {
      toast.error(result.payload || "Failed to delete");
    }
  };

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

          <span className="text-xs text-zinc-600">•</span>

          <span className="text-xs text-zinc-500">{timeAgo}</span>
        </div>

        {!editing ? (
          <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-300">
            {text}
          </p>
        ) : (
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
          />
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setLiked((prev) => !prev)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              liked
                ? "bg-white text-black"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}>
            <ThumbsUp size={16} />

            {liked ? "Liked" : "Like"}
          </button>

          {isOwner && (
            <>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
                  <Pencil size={16} />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    disabled={loading}
                    onClick={handleUpdate}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm text-white transition hover:bg-emerald-600 disabled:opacity-60">
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Check size={16} />
                    )}
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditing(false);
                      setText(comment.content);
                    }}
                    className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white transition hover:bg-zinc-700">
                    <X size={16} />
                    Cancel
                  </button>
                </>
              )}

              <button
                disabled={loading}
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-60">
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
