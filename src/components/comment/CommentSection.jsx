import { useEffect, useState } from "react";
import { Send } from "lucide-react";

import CommentCard from "./CommentCard";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Backend API pachi connect karishu
    setComments([]);
  }, [videoId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    const newComment = {
      _id: Date.now(),
      content: comment,
      owner: {
        fullName: "You",
        username: "you",
        avatar:
          "https://ui-avatars.com/api/?name=You",
      },
      createdAt: new Date(),
    };

    setComments((prev) => [
      newComment,
      ...prev,
    ]);

    setComment("");
  };

  return (
    <section className="mt-10">

      {/* Heading */}

      <h2 className="mb-6 text-2xl font-bold text-white">

        {comments.length} Comments

      </h2>

      {/* Add Comment */}

      <form
        onSubmit={handleSubmit}
        className="mb-8 flex gap-4"
      >

        <img
          src="https://ui-avatars.com/api/?name=You"
          alt=""
          className="h-11 w-11 rounded-full"
        />

        <div className="flex-1">

          <textarea
            rows={3}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Add a comment..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white outline-none transition focus:border-zinc-600"
          />

          <div className="mt-3 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              <Send size={18} />

              Comment
            </button>

          </div>

        </div>

      </form>

            <div className="space-y-6">

        {comments.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-zinc-800 py-12 text-center">

            <h3 className="text-lg font-semibold text-white">
              No comments yet
            </h3>

            <p className="mt-2 text-zinc-500">
              Be the first one to comment on this video.
            </p>

          </div>

        ) : (

          comments.map((item) => (
            <CommentCard
              key={item._id}
              comment={item}
            />
          ))

        )}

      </div>

    </section>
  );
};

export default CommentSection;