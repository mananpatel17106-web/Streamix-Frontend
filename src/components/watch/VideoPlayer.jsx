import { useRef, useState } from "react";
import {
  Loader2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react";

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const fullscreen = () => {
    if (!videoRef.current) return;

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">

      <div className="relative">

        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <Loader2
              className="animate-spin text-white"
              size={40}
            />
          </div>
        )}

        <video
          ref={videoRef}
          src={video?.videoFile}
          poster={video?.thumbnail}
          controls
          className="aspect-video w-full bg-black"
          onLoadedData={() => setLoading(false)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-4 py-3">

        <div className="flex items-center gap-2">

          <button
            onClick={togglePlay}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            {playing ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            {muted ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

        </div>

        <button
          onClick={fullscreen}
          className="rounded-lg p-2 transition hover:bg-zinc-800"
        >
          <Maximize size={18} />
        </button>

      </div>

    </div>
  );
};

export default VideoPlayer;