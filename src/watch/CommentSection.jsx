import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";

const CommentSection = ({
  comments = [],
  currentUser,
  loading = false,
  totalComments = 0,

  onAddComment,
  onLikeComment,
  onReplyComment,
  onEditComment,
  onDeleteComment,
}) => {
  return (
    <section className="mt-10">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {totalComments} Comments
        </h2>
      </div>

      {/* Add Comment */}

      <CommentInput
        currentUser={currentUser}
        loading={loading}
        onSubmit={onAddComment}
      />

      {/* Empty State */}

      {!loading && comments.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-10 text-center">
          <h3 className="text-lg font-semibold text-white">
            No comments yet
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Be the first person to comment on this video.
          </p>
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div className="mt-8 space-y-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
            >
              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-full bg-zinc-800" />

                <div className="flex-1">
                  <div className="h-4 w-40 rounded bg-zinc-800" />

                  <div className="mt-4 h-4 w-full rounded bg-zinc-800" />

                  <div className="mt-2 h-4 w-4/5 rounded bg-zinc-800" />

                  <div className="mt-5 h-4 w-24 rounded bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment List */}

      {!loading && comments.length > 0 && (
        <div className="mt-8 space-y-5">
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              currentUser={currentUser}
              onLike={onLikeComment}
              onReply={onReplyComment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentSection;