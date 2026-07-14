import { useState } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CommentInput = ({
  currentUser,
  loading = false,
  onSubmit,
}) => {
  const [comment, setComment] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const value = comment.trim();

    if (!value) return;

    onSubmit?.(value);
    setComment("");
    setFocused(false);
  };

  const handleCancel = () => {
    setComment("");
    setFocused(false);
  };

  return (
    <div className="mt-8">
      <div className="flex gap-4">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.username}
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="flex-1">
          <textarea
            rows={focused ? 3 : 1}
            value={comment}
            onFocus={() => setFocused(true)}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-700"
          />

          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="mt-4 flex justify-end gap-3"
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-zinc-800 px-5 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <X size={16} className="mr-2 inline" />
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={!comment.trim() || loading}
                  onClick={handleSubmit}
                  className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={16} className="mr-2 inline" />
                  {loading ? "Posting..." : "Comment"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;