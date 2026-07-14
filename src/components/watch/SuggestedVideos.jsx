import VideoCard from "../video/VideoCard";

const SuggestedVideos = ({
  videos = [],
}) => {
  if (!videos.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-white">
        Suggested Videos
      </h2>

      <div className="space-y-5">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedVideos;