import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideos = ({
  videos = [],
  loading = false,
}) => {
  return (
    <aside className="space-y-3">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Related Videos
      </h2>

      {loading &&
        Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse gap-3 rounded-xl p-2"
          >
            <div className="aspect-video w-44 rounded-xl bg-zinc-900" />

            <div className="flex-1">
              <div className="h-4 rounded bg-zinc-900" />
              <div className="mt-2 h-4 w-3/4 rounded bg-zinc-900" />
              <div className="mt-4 h-3 w-1/2 rounded bg-zinc-900" />
            </div>
          </div>
        ))}

      {!loading &&
        videos.map((video) => (
          <RelatedVideoCard
            key={video._id}
            video={video}
          />
        ))}
    </aside>
  );
};

export default RelatedVideos;