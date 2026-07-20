import { Link } from "react-router-dom";
import {
  Bell,
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  Share2,
  ThumbsUp,
} from "lucide-react";

import { formatViews, timeAgo } from "../../utils/format";

export default function VideoInfo({
  current,
  liked,
  subscribed,
  subscriberCount,
  isOwnChannel,
  like,
  sub,
  share,
  setPlaylistOpen,
  showFullDescription,
  setShowFullDescription,
  user,
}) {
  return (
    <>
      <h1 className="mt-4 text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
        {current.title}
      </h1>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          to={`/c/${current.owner?.username}`}
          className="flex items-center gap-4">
          <img
            src={current.owner?.avatar}
            alt=""
            className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/10 object-cover"
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
              className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700">
              Edit Video
            </Link>
          ) : (
            <button
              onClick={sub}
              className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-medium transition ${
                subscribed
                  ? "border border-white/10 bg-neutral-800 text-white hover:bg-neutral-700"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}>
              <Bell size={18} />
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}

          <button
            onClick={like}
            className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-medium transition ${
              liked
                ? "bg-white text-black"
                : "border border-white/10 bg-neutral-900 text-white"
            }`}>
            <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />

            <span>{liked ? "Liked" : "Like"}</span>

            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {current.likesCount ?? 0}
            </span>
          </button>

          <button
            onClick={() => {
              if (!user) return;
              setPlaylistOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800">
            <BookmarkPlus size={18} />
            Save
          </button>

          <button
            onClick={share}
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur-sm p-4 sm:p-5">
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
            onClick={() => setShowFullDescription((prev) => !prev)}
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
    </>
  );
}
