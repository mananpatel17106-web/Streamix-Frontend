export default function VideoPlayer({
  videoFile,
  thumbnail,
  title,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <video
        src={videoFile}
        poster={thumbnail}
        controls
        controlsList="nodownload"
        preload="metadata"
        className="aspect-video w-full"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}