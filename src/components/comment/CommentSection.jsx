import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { getVideoComments, addComment } from "../../store/slices/commentSlice";

import CommentCard from "./CommentCard";

const CommentSection = ({ videoId }) => {
  const dispatch = useDispatch();

  const { comments, totalComments, loading } = useSelector(
    (state) => state.comment,
  );

  const { user } = useSelector((state) => state.auth);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (!videoId) return;

    dispatch(
      getVideoComments({
        videoId,
      }),
    );
  }, [dispatch, videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Comment cannot be empty");

      return;
    }

    const result = await dispatch(
      addComment({
        videoId,
        content,
      }),
    );

    if (addComment.fulfilled.match(result)) {
      toast.success("Comment added successfully");

      setContent("");

      dispatch(
        getVideoComments({
          videoId,
        }),
      );
    } else {
      toast.error(result.payload || "Failed to add comment");
    }
  };

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-white">
        {totalComments} Comments
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
        <img
          src={user?.avatar}
          alt={user?.username}
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="flex-1">
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white outline-none transition focus:border-zinc-600"
          />

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60">
              <Send size={18} />

              {loading ? "Posting..." : "Comment"}
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />

            <p className="text-zinc-400">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 py-12 text-center">
            <h3 className="text-lg font-semibold text-white">
              No comments yet
            </h3>

            <p className="mt-2 text-zinc-500">
              Be the first to comment on this video.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              videoId={videoId}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
