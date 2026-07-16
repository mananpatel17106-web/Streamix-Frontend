import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelStats,
  fetchChannelVideos,
} from "../../../../cielo/lovable/src/features/dashboard/dashboardSlice";
import {
  formatViews,
  timeAgo,
} from "../../../../cielo/lovable/src/utils/format";
import { Link } from "react-router-dom";

function Stat({ label, value }) {
  return (
    <div className="card p-5">
      <div className="text-xs uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold text-gradient">
        {value}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, videos } = useSelector((s) => s.dashboard);
  useEffect(() => {
    dispatch(fetchChannelStats());
    dispatch(fetchChannelVideos());
  }, [dispatch]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Studio</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <Stat label="Total views" value={formatViews(stats?.totalViews || 0)} />
        <Stat
          label="Subscribers"
          value={formatViews(stats?.totalSubscribers || 0)}
        />
        <Stat label="Videos" value={stats?.totalVideos || 0} />
        <Stat label="Likes" value={formatViews(stats?.totalLikes || 0)} />
      </div>
      <div className="mt-10">
        <h2 className="font-display font-bold text-xl mb-4">Your videos</h2>
        <div className="card divide-y divide-border">
          {videos.length === 0 && (
            <div className="p-6 text-muted text-sm">No videos yet.</div>
          )}
          {videos.map((v) => (
            <div key={v._id} className="flex items-center gap-4 p-4">
              <img
                src={v.thumbnail}
                className="w-32 aspect-video rounded-lg object-cover"
                alt=""
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{v.title}</div>
                <div className="text-xs text-muted">
                  {formatViews(v.views)} views · {timeAgo(v.createdAt)}
                </div>
              </div>
              <Link to={`/edit/${v._id}`} className="btn-ghost">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
