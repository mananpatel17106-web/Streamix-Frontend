import VideoCardSkeleton from "./VideoCardSkeleton";

const VideoGridSkeleton = ({ count = 12 }) => {
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
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </section>
  );
};

export default VideoGridSkeleton;