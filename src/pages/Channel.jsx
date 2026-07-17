import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelProfile } from "../features/auth/authSlice";
import { toggleSubscription } from "../features/subscription/subscriptionSlice";
import { Bell } from "lucide-react";
import toast from "react-hot-toast";
import { formatViews } from "../utils/format";

export default function Channel() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const channel = useSelector((s) => s.auth.channel);

  useEffect(() => {
    dispatch(fetchChannelProfile(username));
  }, [dispatch, username]);

  if (!channel) return null;

  const sub = async () => {
    await dispatch(toggleSubscription(channel._id));
    toast.success("Updated");
  };

  return (
    <div>
      <div className="h-48 md:h-64 rounded-2xl overflow-hidden bg-card">
        {channel.coverImage && (
          <img
            src={channel.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <img
          src={channel.avatar}
          className="w-24 h-24 rounded-full object-cover border-4 border-bg -mt-16"
          alt=""
        />
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl font-bold">
            {channel.fullName}
          </h1>
          <div className="text-sm text-muted">
            @{channel.username} · {formatViews(channel.subscribersCount || 0)}{" "}
            subscribers · {formatViews(channel.channelsSubscribedToCount || 0)}{" "}
            subscribed
          </div>
        </div>
        <button
          onClick={sub}
          className={channel.isSubscribed ? "btn-ghost" : "btn-primary"}>
          <Bell className="w-4 h-4" />{" "}
          {channel.isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
