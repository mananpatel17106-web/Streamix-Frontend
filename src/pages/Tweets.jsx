import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTweets,
  createTweet,
  updateTweet,
  deleteTweet,
} from "../features/tweets/tweetSlice";

import { toggleTweetLike } from "../features/likes/likeSlice";

import { timeAgo } from "../utils/format";
import { Trash2, Heart, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Tweets() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.tweets);
  const user = useSelector((s) => s.auth.user);
  const [content, setContent] = useState("");
  const isMine = user?._id === userId;

  useEffect(() => {
    dispatch(fetchUserTweets(userId));
  }, [dispatch, userId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const r = await dispatch(createTweet(content.trim()));
    if (r.meta.requestStatus === "fulfilled") setContent("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-bold mb-6">Tweets</h1>
      {isMine && (
        <form onSubmit={submit} className="card p-4 flex gap-2 mb-6">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input flex-1"
            placeholder="What's happening?"
          />
          <button className="btn-primary">
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
      <ul className="space-y-3">
        {list.map((t) => (
          <li key={t._id} className="card p-4">
            <div className="text-xs text-muted mb-1">
              {timeAgo(t.createdAt)}
            </div>
            <div className="text-sm">{t.content}</div>
            <div className="mt-2 flex gap-3 text-muted text-xs">
              <button
                onClick={() =>
                  dispatch(toggleTweetLike(t._id)).then(() =>
                    toast.success("Liked"),
                  )
                }
                className="flex items-center gap-1 hover:text-primary-soft">
                <Heart className="w-3 h-3" /> Like
              </button>
              {isMine && (
                <button
                  onClick={() => dispatch(deleteTweet(t._id))}
                  className="flex items-center gap-1 hover:text-primary-soft">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
