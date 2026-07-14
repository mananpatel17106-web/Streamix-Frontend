import VideoCard from "./VideoCard";
import VideoGridSkeleton from "./VideoGridSkeleton";

const VideoGrid = ({
  videos = [],
  loading = false,
  emptyMessage = "No videos found.",
}) => {
  if (loading) {
    return <VideoGridSkeleton />;
  }

  if (!videos.length) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-white">
            {emptyMessage}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Try searching with different keywords or explore other categories.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
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
    </section>
  );
};

export default VideoGrid;