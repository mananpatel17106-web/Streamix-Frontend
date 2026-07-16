import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscribedChannels } from "../../../../cielo/lovable/src/features/subscriptions/subscriptionSlice";
import { Link } from "react-router-dom";

export default function Subscriptions() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const { channels } = useSelector((s) => s.subscriptions);
  useEffect(() => {
    if (user) dispatch(fetchSubscribedChannels(user._id));
  }, [dispatch, user]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Subscriptions</h1>
      {channels.length === 0 ? (
        <div className="text-muted py-16 text-center">
          You're not subscribed to anyone yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => {
            const ch = c.channel || c;
            return (
              <Link
                key={ch._id}
                to={`/c/${ch.username}`}
                className="card p-4 flex items-center gap-3 hover:border-primary/40">
                <img
                  src={ch.avatar}
                  className="w-12 h-12 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <div className="font-semibold">
                    {ch.fullName || ch.username}
                  </div>
                  <div className="text-xs text-muted">@{ch.username}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
