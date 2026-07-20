import VideoCard from "../VideoCard";

export default function RecommendedVideos({
  recommendedVideos,
}) {
  return (
    <aside className="h-fit xl:sticky xl:top-20">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">
          Up Next
        </h3>

        <span className="text-sm text-neutral-500">
          {recommendedVideos.length} videos
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {recommendedVideos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    </aside>
  );
}