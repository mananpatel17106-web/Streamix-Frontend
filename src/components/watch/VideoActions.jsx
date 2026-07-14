import { useState } from "react";
import {
  ThumbsUp,
  Share2,
  Bookmark,
  Flag,
  ListPlus,
} from "lucide-react";

const VideoActions = ({ video }) => {
  const [liked, setLiked] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: video?.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Link Copied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-6 flex flex-wrap items-center gap-3">

      {/* Like */}

      <button
        onClick={() => setLiked(!liked)}
        className={`flex items-center gap-2 rounded-xl border px-5 py-3 transition
        ${
          liked
            ? "border-white bg-white text-black"
            : "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
        }`}
      >
        <ThumbsUp size={18} />

        {video?.likesCount || 0}
      </button>

      {/* Playlist */}

      <button
        className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white transition hover:bg-zinc-800"
      >
        <ListPlus size={18} />

        Playlist
      </button>

      {/* Save */}

      <button
        onClick={() => setSaved(!saved)}
        className={`flex items-center gap-2 rounded-xl border px-5 py-3 transition
        ${
          saved
            ? "border-white bg-white text-black"
            : "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
        }`}
      >
        <Bookmark size={18} />

        Save
      </button>

      {/* Share */}

      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white transition hover:bg-zinc-800"
      >
        <Share2 size={18} />

        Share
      </button>

      {/* Report */}

      <button
        className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white transition hover:bg-zinc-800"
      >
        <Flag size={18} />

        Report
      </button>

    </section>
  );
};

export default VideoActions;