const VideoCardSkeleton = () => {
  return (
    <article className="animate-pulse">
      {/* Thumbnail */}

      <div className="aspect-video w-full rounded-2xl bg-zinc-900" />

      {/* Content */}

      <div className="mt-4 flex gap-3">
        {/* Avatar */}

        <div className="h-10 w-10 rounded-full bg-zinc-900" />

        {/* Text */}

        <div className="flex-1">
          <div className="h-4 w-full rounded bg-zinc-900" />

          <div className="mt-2 h-4 w-3/4 rounded bg-zinc-900" />

          <div className="mt-4 h-3 w-1/2 rounded bg-zinc-900" />
        </div>
      </div>
    </article>
  );
};

export default VideoCardSkeleton;