import { Check } from "lucide-react";

export default function PlaylistItem({
  playlist,
  checked = false,
  loading = false,
  onToggle,
}) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => onToggle?.(playlist)}
      className={`group flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
        checked
          ? "border-red-500 bg-red-500/10"
          : "border-white/10 bg-neutral-900 hover:border-white/20 hover:bg-neutral-800"
      } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-white">
          {playlist?.name}
        </h4>

        <p className="mt-1 text-xs text-neutral-400">
          {playlist?.videos?.length || 0} videos
        </p>

        {playlist?.description && (
          <p className="mt-2 line-clamp-2 text-xs text-neutral-500">
            {playlist.description}
          </p>
        )}
      </div>

      <div
        className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
          checked
            ? "border-red-500 bg-red-500 text-white"
            : "border-white/20 text-transparent group-hover:border-red-400"
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </div>
    </button>
  );
}