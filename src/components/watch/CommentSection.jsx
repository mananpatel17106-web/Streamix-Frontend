import { Trash2, Send } from "lucide-react";
import { timeAgo } from "../../utils/format";

export default function CommentSection({
  user,
  comment,
  setComment,
  submitComment,
  comments,
  commentCount,
  removeComment,
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">
        {commentCount.toLocaleString()} Comments
      </h2>

      {user && (
        <form
          onSubmit={submitComment}
          className="mb-8 mt-5 flex items-start gap-3"
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="h-10 w-10 rounded-full object-cover"
          />

          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="input flex-1"
          />

          <button type="submit" className="btn-primary">
            <Send size={18} />
          </button>
        </form>
      )}

      {!comments.length ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-900 py-14 text-center">
          <h3 className="text-lg font-semibold">
            No comments yet
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            Be the first one to start the discussion.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-4 rounded-xl border border-white/5 bg-neutral-900/50 p-4 transition hover:border-white/10"
            >
              <img
                src={c.owner?.avatar}
                alt={c.owner?.username}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-white">
                    {c.owner?.fullName ||
                      c.owner?.username}
                  </span>

                  <span className="text-xs text-neutral-500">
                    @{c.owner?.username}
                  </span>

                  <span className="text-xs text-neutral-600">
                    •
                  </span>

                  <span className="text-xs text-neutral-500">
                    {timeAgo(c.createdAt)}
                  </span>
                </div>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-neutral-300">
                  {c.content}
                </p>
              </div>

              {user?._id === c.owner?._id && (
                <button
                  onClick={() => removeComment(c._id)}
                  className="self-start rounded-lg p-2 text-neutral-500 transition hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}