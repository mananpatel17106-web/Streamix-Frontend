import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, Video, Search } from "lucide-react";

import {
  fetchSubscribedChannels,
  toggleSubscription,
} from "../features/subscription/subscriptionSlice";

export default function Subscriptions() {
  const dispatch = useDispatch();

  const user = useSelector((s) => s.auth.user);

  const { channels, subscribedChannelIds, status } = useSelector(
    (s) => s.subscriptions,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchSubscribedChannels(user._id));
    }
  }, [dispatch, user]);

  const filteredChannels = useMemo(() => {
    return channels.filter((item) => {
      const ch = item.channel || item;

      const text = (
        (ch.fullName || "") +
        " " +
        (ch.username || "")
      ).toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [channels, search]);

  const handleUnsubscribe = (channelId) => {
    dispatch(toggleSubscription(channelId));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>

          <p className="text-muted mt-2">
            Manage all your subscribed channels.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 pointer-events-none text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search channels..."
            className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {status === "loading" && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-36 bg-white/5" />

              <div className="p-5">
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-full bg-white/10" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 rounded bg-white/10 w-40" />

                    <div className="h-4 rounded bg-white/10 w-28" />

                    <div className="h-4 rounded bg-white/10 w-52" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {status !== "loading" && filteredChannels.length === 0 && (
        <div className="card py-24 text-center">
          <Users className="mx-auto mb-5 text-muted" size={60} />

          <h2 className="text-2xl font-bold">No subscriptions found</h2>

          <p className="mt-2 text-muted">
            Subscribe to your favourite creators to see them here.
          </p>
        </div>
      )}

      {status !== "loading" && filteredChannels.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredChannels.map((item) => {
            const ch = item.channel || item;

            const latest = ch.latestVideo;

            const subscribed = subscribedChannelIds.includes(ch._id);

            return (
              <div
                key={ch._id}
                className="card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <div className="relative h-40 overflow-hidden bg-neutral-900">
                  {ch.coverImage ? (
                    <img
                      src={ch.coverImage}
                      alt={ch.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-r from-zinc-800 to-zinc-900 text-5xl font-bold">
                      {(ch.fullName || ch.username)?.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex gap-4">
                    <Link to={`/c/${ch.username}`}>
                      <img
                        src={ch.avatar}
                        alt={ch.fullName}
                        className="h-16 w-16 rounded-full border-2 border-white/10 object-cover"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link
                        to={`/c/${ch.username}`}
                        className="text-lg font-semibold hover:text-primary">
                        {ch.fullName}
                      </Link>

                      <p className="text-sm text-muted">@{ch.username}</p>

                      <div className="mt-2 flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {ch.subscribersCount?.toLocaleString() || 0}
                        </span>

                        {latest && (
                          <span className="flex items-center gap-1">
                            <Video size={14} />
                            Latest Upload
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {latest && (
                    <Link
                      to={`/watch/${latest._id}`}
                      className="mt-5 block overflow-hidden rounded-xl border border-white/10 hover:border-primary/40">
                      <img
                        src={latest.thumbnail}
                        alt={latest.title}
                        className="h-40 w-full object-cover"
                      />

                      <div className="p-3">
                        <h3 className="line-clamp-2 font-medium">
                          {latest.title}
                        </h3>

                        <p className="mt-1 text-xs text-muted">
                          {(latest.views || 0).toLocaleString()} views
                        </p>
                      </div>
                    </Link>
                  )}

                  <button
                    onClick={() => handleUnsubscribe(ch._id)}
                    className={`mt-5 w-full rounded-xl px-4 py-2 font-semibold transition ${
                      subscribed
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-primary text-white hover:opacity-90"
                    }`}>
                    {subscribed ? "Unsubscribe" : "Subscribe"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
