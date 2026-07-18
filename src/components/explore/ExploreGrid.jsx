import { Compass } from "lucide-react";
import ExploreCard from "./ExploreCard";

export default function ExploreGrid({ videos = [] }) {
  if (!videos.length) {
    return (
      <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 px-6 text-center">
        <div className="mb-5 rounded-full bg-primary/10 p-5">
          <Compass size={42} className="text-primary" />
        </div>

        <h2 className="text-2xl font-semibold text-white">
          No videos found
        </h2>

        <p className="mt-2 max-w-md text-zinc-400">
          We couldn't find any videos matching your search or selected
          category. Try another keyword or category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {videos.map((video) => (
        <ExploreCard
          key={video._id}
          video={video}
        />
      ))}
    </div>
  );
}