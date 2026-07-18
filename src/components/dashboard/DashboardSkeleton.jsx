export default function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-white/10 bg-zinc-900 p-5"
        >
          <div className="flex gap-5">
            <div className="aspect-video w-72 rounded-xl bg-zinc-800" />

            <div className="flex-1 space-y-4">
              <div className="h-6 w-2/3 rounded bg-zinc-800" />
              <div className="h-4 w-1/3 rounded bg-zinc-800" />

              <div className="flex gap-5">
                <div className="h-4 w-20 rounded bg-zinc-800" />
                <div className="h-4 w-20 rounded bg-zinc-800" />
                <div className="h-4 w-20 rounded bg-zinc-800" />
              </div>

              <div className="flex gap-3 pt-3">
                <div className="h-10 w-24 rounded bg-zinc-800" />
                <div className="h-10 w-24 rounded bg-zinc-800" />
                <div className="h-10 w-24 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}