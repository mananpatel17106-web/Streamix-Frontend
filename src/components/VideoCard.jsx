import { Link } from "react-router-dom";
import { CheckCircle2, Play } from "lucide-react";
import { formatDuration, formatViews, timeAgo } from "../utils/format";

export default function VideoCard({ video }) {
  if (!video) return null;

  const {
    _id,
    title,
    thumbnail,
    duration,
    views,
    createdAt,
    owner,
  } = video;

  const avatar =
    owner?.avatar ||
    "https://ui-avatars.com/api/?name=User&background=1f2937&color=fff";

  return (
    <Link
      to={`/watch/${_id}`}
      aria-label={title}
      className="group block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10">

        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 shadow-xl backdrop-blur-md">
            <Play
              className="ml-1"
              size={24}
              fill="white"
              color="white"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {formatDuration(duration)}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex gap-3">
        <img
          src={avatar}
          alt={owner?.username}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-white transition-colors duration-300 group-hover:text-red-400">
            {title}
          </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-neutral-400">
            <span className="truncate">
              {owner?.fullName || owner?.username || "Streamix Creator"}
            </span>

            {(owner?.isVerified || owner?.verified) && (
              <CheckCircle2
                size={14}
                className="shrink-0 fill-sky-500 text-sky-500"
              />
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span>{formatViews(views)} views</span>

            <span className="h-1 w-1 rounded-full bg-neutral-600" />

            <span>{timeAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}