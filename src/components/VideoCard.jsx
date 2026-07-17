import { Link } from "react-router-dom";
import { formatDuration, formatViews, timeAgo } from "../utils/format";

export default function VideoCard({ video }) {
  if (!video) return null;
  return (
    <Link to={`/watch/${video._id}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-lg transition-all duration-300 group-hover:shadow-red-500/10 group-hover:-translate-y-1">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        />
       <div className="absolute bottom-2 right-2 rounded-md bg-black/90 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        {video.owner?.avatar && (
          <img src={video.owner.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover" />
        )}
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white transition-colors duration-300 group-hover:text-red-400">{video.title}</h3>
          <div className="mt-1 truncate text-xs text-neutral-400">{video.owner?.username || "Streamix creator"}</div>
          <div className="mt-1 text-xs text-neutral-500">{formatViews(video.views)} views · {timeAgo(video.createdAt)}</div>
        </div>
      </div>
    </Link>
  );
}
