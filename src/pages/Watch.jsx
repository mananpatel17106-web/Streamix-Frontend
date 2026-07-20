import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ThumbsUp,
  Share2,
  Bell,
  Trash2,
  Send,
  ChevronDown,
  ChevronUp,
  BookmarkPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import { fetchVideoById, fetchVideos } from "../features/video/videoSlice";

import {
  fetchComments,
  addComment,
  deleteComment,
} from "../features/comment/commentSlice";

import { toggleVideoLike, fetchLikedVideos } from "../features/likes/likeSlice";

import {
  toggleSubscription,
  fetchSubscribedChannels,
} from "../features/subscription/subscriptionSlice";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";
import PlaylistModal from "../components/playlist/PlaylistModal";

import { formatViews, timeAgo } from "../utils/format";

import { fetchWatchHistory, addToHistory } from "../features/auth/authSlice";

export default function Watch() {
  const { videoId } = useParams();

  const dispatch = useDispatch();

  const { current, list: allVideos } = useSelector((state) => state.videos);

  const { list: comments } = useSelector((state) => state.comments);

  const user = useSelector((state) => state.auth.user);

  const likedVideoIds = useSelector((state) => state.likes.likedVideoIds);

  const liked = likedVideoIds.includes(videoId);

  const [comment, setComment] = useState("");

  const [commentCount, setCommentCount] = useState(0);

  const [subbed, setSubbed] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [playlistOpen, setPlaylistOpen] = useState(false);

  const [subscriberCount, setSubscriberCount] = useState(0);

  const subscribedChannelIds = useSelector(
    (state) => state.subscriptions.subscribedChannelIds,
  );

  const subscribed = current?.owner?._id
    ? subscribedChannelIds.includes(current.owner._id)
    : false;

  const isOwnChannel = user?._id === current?.owner?._id;

  useEffect(() => {
    dispatch(fetchVideoById(videoId));
    dispatch(fetchComments(videoId));
    dispatch(fetchVideos({}));

    if (user) {
      dispatch(fetchLikedVideos());
      dispatch(fetchSubscribedChannels(user._id));
    }
  }, [dispatch, videoId, user]);

  useEffect(() => {
    if (!user || !current?._id) return;

    dispatch(addToHistory(current._id));
  }, [dispatch, user, current?._id]);

  useEffect(() => {
    if (!current?.owner) return;

    setSubbed(current.owner.isSubscribed || current.owner.subscribed || false);
  }, [current]);

  useEffect(() => {
    if (current?.owner?.subscribersCount !== undefined) {
      setSubscriberCount(current.owner.subscribersCount);
    }
  }, [current]);

  useEffect(() => {
    if (current?.commentsCount !== undefined) {
      setCommentCount(current.commentsCount);
    }
  }, [current]);

  const recommendedVideos = useMemo(() => {
    return (allVideos || [])
      .filter((video) => video._id !== videoId)
      .slice(0, 8);
  }, [allVideos, videoId]);

  const like = async () => {
    if (!user) {
      toast.error("Sign in first");
      return;
    }

    const result = await dispatch(toggleVideoLike(videoId));

    if (toggleVideoLike.fulfilled.match(result)) {
      dispatch(fetchLikedVideos());
      dispatch(fetchVideoById(videoId));
    }
  };

  const sub = async () => {
    if (!user) {
      toast.error("Sign in first");
      return;
    }

    if (!current?.owner?._id) return;

    const result = await dispatch(toggleSubscription(current.owner._id));

    if (toggleSubscription.fulfilled.match(result)) {
      if (subscribed) {
        setSubscriberCount((prev) => Math.max(0, prev - 1));
      } else {
        setSubscriberCount((prev) => prev + 1);
      }
    } else {
      toast.error("Unable to subscribe");
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Write something");
      return;
    }

    if (!user) {
      toast.error("Login first");
      return;
    }

    const res = await dispatch(
      addComment({
        videoId,
        content: comment.trim(),
      }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      setComment("");
      toast.success("Comment added");
      setCommentCount((prev) => prev + 1);

      dispatch(fetchComments(videoId));
    }
  };

  const removeComment = async (id) => {
    const res = await dispatch(deleteComment(id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Comment deleted");
    }
    setCommentCount((prev) => Math.max(0, prev - 1));
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied");
    } catch {
      toast.error("Unable to copy");
    }
  };

  if (!current) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      {/* LEFT */}

      <section>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <video
            src={current.videoFile}
            poster={current.thumbnail}
            controls
            controlsList="nodownload"
            className="aspect-video w-full"
          />
        </div>

        <h1 className="mt-4 text-xl font-bold leading-snug text-white sm:text-2xl">
          {current.title}
        </h1>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to={`/c/${current.owner?.username}`}
            className="flex items-center gap-4">
            <img
              src={current.owner?.avatar}
              alt=""
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                {current.owner?.fullName || current.owner?.username}

                {(current.owner?.verified || current.owner?.isVerified) && (
                  <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-xs text-sky-400">
                    Verified
                  </span>
                )}
              </h2>

              <div className="text-sm text-neutral-400">
                <p>@{current.owner?.username}</p>

                <p className="mt-1 text-xs">
                  {subscriberCount.toLocaleString()} subscribers
                </p>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {isOwnChannel ? (
              <Link
                to={`/studio/videos/${current._id}`}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700">
                Edit Video
              </Link>
            ) : (
              <button
                onClick={sub}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-medium transition ${
                  subscribed
                    ? "border border-white/10 bg-neutral-800 hover:bg-neutral-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}>
                <Bell size={18} />
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
            <button
              onClick={like}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-medium transition ${
                liked
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "border border-white/10 bg-neutral-900 text-white hover:bg-neutral-800"
              }`}>
              <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />

              <span>{liked ? "Liked" : "Like"}</span>

              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {current?.likesCount ?? 0}
              </span>
            </button>

            <button
              onClick={() => {
                if (!user) {
                  toast.error("Sign in to save videos");
                  return;
                }

                setPlaylistOpen(true);
              }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800">
              <BookmarkPlus size={18} />
              Save
            </button>

            <button
              onClick={share}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
            <span>
              <strong>{formatViews(current.views)}</strong> views
            </span>

            <span>•</span>

            <span>{timeAgo(current.createdAt)}</span>
            <div className="mt-2 text-xs text-neutral-500">
              Published on {new Date(current.createdAt).toLocaleDateString()}
            </div>
          </div>

          <p
            className={`whitespace-pre-wrap text-sm leading-7 text-neutral-300 ${
              showFullDescription ? "" : "line-clamp-3"
            }`}>
            {current.description}
          </p>

          {current.description?.length > 180 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300">
              {showFullDescription ? (
                <>
                  Show Less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show More
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </div>

        {/* COMMENTS */}

        <section className="mt-8">
          <h2 className="text-lg font-semibold">
            {commentCount.toLocaleString()} Comments
          </h2>
          {user && (
            <form onSubmit={submitComment} className="mb-8 flex items-start gap-3">
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
              <h3 className="text-lg font-semibold">No comments yet</h3>

              <p className="mt-2 text-sm text-neutral-500">
                Be the first one to start the discussion.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((c) => {
                return (
                  <div
                    key={c._id}
                    className="flex gap-4 rounded-xl border border-white/5 bg-neutral-900/50 p-4 transition hover:border-white/10">
                    <img
                      src={c.owner?.avatar}
                      alt={c.owner?.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white">
                          {c.owner?.fullName || c.owner?.username}
                        </span>

                        <span className="text-xs text-neutral-500">
                          @{c.owner?.username}
                        </span>

                        <span className="text-xs text-neutral-600">•</span>

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
                        className="self-start rounded-lg p-2 text-neutral-500 transition hover:bg-red-500/10 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </section>

      {/* RIGHT SIDEBAR */}

      <aside className="h-fit xl:sticky xl:top-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Up Next</h3>

          <span className="text-sm text-neutral-500">
            {recommendedVideos.length} videos
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {recommendedVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </aside>

      <PlaylistModal
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        videoId={current._id}
      />
    </div>
  );
}
