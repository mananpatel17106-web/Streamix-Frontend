import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  toggleSubscription,
  getChannelSubscribers,
} from "../../store/slices/subscriptionSlice";

const VideoInfo = ({ video }) => {
  const dispatch = useDispatch();

  const { loading, channelSubscribers } = useSelector(
    (state) => state.subscription,
  );

  const { user } = useSelector((state) => state.auth);

  const [expanded, setExpanded] = useState(false);

  const [subscribed, setSubscribed] = useState(false);

  const formatViews = (views = 0) => {
    if (views >= 1000000000) return `${(views / 1000000000).toFixed(1)}B`;

    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;

    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;

    return views;
  };

  const publishedAt = useMemo(() => {
    if (!video?.createdAt) return "";

    return new Date(video.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [video]);

  const subscriberCount = channelSubscribers?.length || 0;

  const handleSubscription = async () => {
    if (!video?.owner?._id) return;

    const result = await dispatch(toggleSubscription(video.owner._id));

    if (toggleSubscription.fulfilled.match(result)) {
      setSubscribed((prev) => !prev);

      dispatch(getChannelSubscribers(video.owner._id));

      toast.success(subscribed ? "Channel Unsubscribed" : "Channel Subscribed");
    } else {
      toast.error(result.payload || "Subscription Failed");
    }
  };

  return (
    <section className="mt-6">
      {/* Title */}

      <h1 className="text-2xl font-bold leading-snug text-white lg:text-3xl">
        {video?.title}
      </h1>

      {/* Meta */}

      <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-zinc-400">
        <span className="flex items-center gap-2">
          <Eye size={16} />
          {formatViews(video?.views)} views
        </span>

        <span className="flex items-center gap-2">
          <CalendarDays size={16} />

          {publishedAt}
        </span>
      </div>
      {/* Creator */}

      <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex items-center gap-4">
          <img
            src={video?.owner?.avatar}
            alt={video?.owner?.username}
            className="h-16 w-16 rounded-full border border-zinc-700 object-cover"
          />

          <div>
            <Link
              to={`/profile/${video?.owner?.username}`}
              className="text-xl font-semibold text-white transition hover:text-zinc-300">
              {video?.owner?.fullName}
            </Link>

            <p className="mt-1 text-sm text-zinc-400">
              @{video?.owner?.username}
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              {subscriberCount} Subscriber
              {subscriberCount !== 1 && "s"}
            </p>
          </div>
        </div>

        {/* Right */}

        {user?._id !== video?.owner?._id && (
          <button
            disabled={loading}
            onClick={handleSubscription}
            className={`flex h-12 min-w-[170px] items-center justify-center rounded-xl px-6 font-semibold transition

            ${
              subscribed
                ? "border border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
                : "bg-white text-black hover:bg-zinc-200"
            }

            disabled:cursor-not-allowed
            disabled:opacity-70`}>
            {loading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Please Wait
              </>
            ) : subscribed ? (
              "Subscribed"
            ) : (
              "Subscribe"
            )}
          </button>
        )}
      </div>

      {/* Description */}

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
        <div
          className={`overflow-hidden transition-all duration-300

          ${expanded ? "max-h-[700px]" : "max-h-28"}`}>
          <p className="whitespace-pre-wrap leading-8 text-zinc-300">
            {video?.description || "No description available."}
          </p>
        </div>
        {video?.description?.length > 180 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-5 flex items-center gap-2 text-sm font-medium text-white transition hover:text-zinc-300">
            {expanded ? (
              <>
                Show Less
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show More
                <ChevronDown size={18} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Extra Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h4 className="text-sm text-zinc-500">Views</h4>

          <p className="mt-2 text-xl font-bold text-white">
            {formatViews(video?.views)}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h4 className="text-sm text-zinc-500">Likes</h4>

          <p className="mt-2 text-xl font-bold text-white">
            {video?.likesCount || 0}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h4 className="text-sm text-zinc-500">Subscribers</h4>

          <p className="mt-2 text-xl font-bold text-white">{subscriberCount}</p>
        </div>
      </div>
    </section>
  );
};

export default VideoInfo;
