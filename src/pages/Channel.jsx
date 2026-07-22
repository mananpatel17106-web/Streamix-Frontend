import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";

import { fetchChannelProfile } from "../features/auth/authSlice";

import { toggleSubscription } from "../features/subscription/subscriptionSlice";
import { fetchVideos } from "../features/video/videoSlice";
import { fetchSubscribedChannels } from "../features/subscription/subscriptionSlice";

import VideoCard from "../components/VideoCard";

import { formatViews } from "../utils/format";

export default function Channel() {
  const { username } = useParams();
  const dispatch = useDispatch();

  const channel = useSelector((state) => state.auth.channel);

  const { list: videos, status } = useSelector((state) => state.videos);

  const user = useSelector((state) => state.auth.user);

  const subscribedChannelIds = useSelector(
    (state) => state.subscriptions.subscribedChannelIds,
  );
  const isSubscribed =
    subscribedChannelIds.includes(channel._id) || channel.isSubscribed;

  useEffect(() => {
    const loadChannel = async () => {
      const res = await dispatch(fetchChannelProfile(username));

      if (res.meta.requestStatus === "fulfilled") {
        const data = res.payload;

        dispatch(
          fetchVideos({
            userId: data._id,
            page: 1,
            limit: 24,
          }),
        );
      }
    };

    loadChannel();
  }, [dispatch, username]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchSubscribedChannels(user._id));
    }
  }, [dispatch, user]);

  const handleSubscribe = async () => {
    const res = await dispatch(toggleSubscription(channel._id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(
        isSubscribed
          ? "Unsubscribed successfully"
          : "Subscribed successfully",
      );

      if (user?._id) {
        dispatch(fetchSubscribedChannels(user._id));
      }
    } else {
      toast.error(res.payload || "Something went wrong");
    }
  };

  if (!channel) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-neutral-400 text-lg">Loading channel...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      {/* Cover */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
        {channel.coverImage ? (
          <img
            src={channel.coverImage}
            alt={channel.fullName}
            className="h-56 md:h-72 w-full object-cover"
          />
        ) : (
          <div className="h-56 md:h-72 w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900" />
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between -mt-14 px-2">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5">
          <img
            src={channel.avatar}
            alt={channel.fullName}
            className="h-32 w-32 rounded-full border-4 border-[#0f0f0f] object-cover bg-neutral-900 shadow-2xl"
          />

          <div className="pb-2">
            <h1 className="text-3xl font-bold text-white">
              {channel.fullName}
            </h1>

            <p className="mt-1 text-sm text-neutral-400">@{channel.username}</p>

            <div className="mt-2 flex flex-wrap gap-2 text-sm text-neutral-400">
              <span>
                {formatViews(channel.subscribersCount || 0)} Subscribers
              </span>

              <span>•</span>

              <span>
                {formatViews(channel.channelsSubscribedToCount || 0)} Following
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition ${
            isSubscribed
              ? "bg-neutral-700 hover:bg-neutral-600 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}>
          <Bell size={18} />

          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      {/* Videos Section Starts Here */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Videos</h2>

          {videos.length > 0 && (
            <span className="text-sm text-neutral-400">
              {videos.length} Video{videos.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {status === "loading" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-video rounded-2xl bg-neutral-800" />

                <div className="mt-4 flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-800" />

                  <div className="flex-1">
                    <div className="h-4 w-full rounded bg-neutral-800" />
                    <div className="mt-3 h-3 w-2/3 rounded bg-neutral-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-700 py-20 text-center">
            <h3 className="text-xl font-semibold text-white">No Videos Yet</h3>

            <p className="mt-2 text-neutral-400">
              This creator hasn't uploaded any videos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
