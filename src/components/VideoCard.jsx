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
    <article className="group">
      <Link
        to={`/watch/${_id}`}
        className="block overflow-hidden rounded-2xl"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 border border-white/10">

          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 backdrop-blur-lg shadow-2xl">

              <Play
                size={26}
                fill="white"
                color="white"
                className="ml-1"
              />

            </div>

          </div>

          {/* Duration */}
          <span className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            {formatDuration(duration)}
          </span>

        </div>
      </Link>

      {/* Content */}
      <div className="mt-4 flex gap-3">

        <Link
          to={`/c/${owner?.username}`}
          className="shrink-0"
        >
          <img
            src={avatar}
            alt={owner?.username}
            loading="lazy"
            className="h-11 w-11 rounded-full border border-white/10 object-cover transition group-hover:border-red-500/40"
          />
        </Link>

        <div className="min-w-0 flex-1">

          <Link to={`/watch/${_id}`}>

            <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-white transition group-hover:text-red-400">
              {title}
            </h3>

          </Link>

          <Link
            to={`/c/${owner?.username}`}
            className="mt-2 inline-flex items-center gap-1 text-sm text-neutral-400 transition hover:text-white"
          >
            <span className="truncate">
              {owner?.fullName ||
                owner?.username ||
                "Streamix Creator"}
            </span>

            {(owner?.verified || owner?.isVerified) && (
              <CheckCircle2
                size={14}
                className="fill-sky-500 text-sky-500"
              />
            )}
          </Link>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-neutral-500">

            <span>
              {formatViews(views)} views
            </span>

            <span className="h-1 w-1 rounded-full bg-neutral-600" />

            <span>
              {timeAgo(createdAt)}
            </span>

          </div>

        </div>

      </div>
    </article>
  );
}