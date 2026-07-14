import { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

const VideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (!document.fullscreenElement) {
      await video.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;

        case "KeyM":
          toggleMute();
          break;

        case "KeyF":
          toggleFullscreen();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          className="h-full w-full"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5 flex gap-3">
          <button
            onClick={togglePlay}
            className="pointer-events-auto rounded-full bg-black/70 p-3 text-white backdrop-blur transition hover:bg-black"
          >
            {playing ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="pointer-events-auto rounded-full bg-black/70 p-3 text-white backdrop-blur transition hover:bg-black"
          >
            {muted ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto rounded-full bg-black/70 p-3 text-white backdrop-blur transition hover:bg-black"
          >
            {fullscreen ? (
              <Minimize size={18} />
            ) : (
              <Maximize size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;