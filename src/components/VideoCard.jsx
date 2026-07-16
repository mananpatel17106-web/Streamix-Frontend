import { Link } from "react-router-dom";
import { formatDuration, formatViews, timeAgo } from "../utils/format";

export default function VideoCard({ video }) {
  if (!video) return null;
  return (
    <Link to={`/watch/${video._id}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-2 bottom-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        {video.owner?.avatar && (
          <img src={video.owner.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary-soft transition-colors">{video.title}</h3>
          <div className="mt-1 text-xs text-muted truncate">{video.owner?.username || "Streamix creator"}</div>
          <div className="text-xs text-muted">{formatViews(video.views)} views · {timeAgo(video.createdAt)}</div>
        </div>
      </div>
    </Link>
  );
}
