export default function ExploreSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
        >
          <div className="aspect-video bg-zinc-800" />

          <div className="flex gap-3 p-4">
            <div className="h-11 w-11 rounded-full bg-zinc-800" />

            <div className="flex-1">
              <div className="mb-3 h-4 w-full rounded bg-zinc-800" />
              <div className="mb-4 h-4 w-3/4 rounded bg-zinc-800" />
              <div className="h-3 w-1/2 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}