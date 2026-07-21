import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  MessageCircle,
  Pencil,
  Trash2,
  Globe,
  Lock,
} from "lucide-react";

import { formatDuration, formatViews, timeAgo } from "../../utils/format";

export default function DashboardVideoCard({ video, onDelete }) {
  if (!video) return null;

  const {
    _id,
    title,
    thumbnail,
    duration,
    createdAt,
    views = 0,
    isPublished = true,
    likesCount = 0,
    commentsCount = 0,
  } = video;

  
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}

        <Link to={`/watch/${_id}`} className="relative md:w-80">
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video h-full w-full object-cover"
          />

          <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
            {formatDuration(duration)}
          </span>
        </Link>

        {/* Content */}

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="line-clamp-2 text-xl font-semibold text-white">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Published {timeAgo(createdAt)}
                </p>
              </div>

              <span
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                  isPublished
                    ? "bg-green-500/15 text-green-400"
                    : "bg-yellow-500/15 text-yellow-400"
                }`}>
                {isPublished ? (
                  <>
                    <Globe size={14} />
                    Public
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Private
                  </>
                )}
              </span>
            </div>

            {/* Stats */}

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Eye size={18} />
                {formatViews(views)} Views
              </div>

              <div className="flex items-center gap-2">
                <Heart size={18} />
                {likesCount}
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                {commentsCount}
              </div>
            </div>
          </div>

          {/* Actions */}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/watch/${_id}`}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700">
              View
            </Link>

            <Link
              to={`/edit/${_id}`}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              <Pencil size={16} />
              Edit
            </Link>

            <button
              onClick={() => onDelete?.(_id)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
