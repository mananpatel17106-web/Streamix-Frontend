import VideoCard from "./VideoCard";

const VideoGrid = ({
  videos = [],
}) => {
  if (!videos.length) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center">

      <div className="mb-6 rounded-full bg-zinc-900 p-6 text-4xl">
        🎬
      </div>

      <h2 className="text-3xl font-bold text-white">
        No Videos Yet
      </h2>

      <p className="mt-3 text-zinc-500">
        Upload your first video or change search filters.
      </p>

    </div>
  );
}

  return (
    <div
      className="
      grid
      gap-6

      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-5
    "
    >
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
        />
      ))}
    </div>
  );
};

export default VideoGrid;