import { useState } from "react";
import PlaylistModal from "../playlist/PlaylistModal";
import CreatePlaylistModal from "../playlist/CreatePlaylistModal";
import {
  ThumbsUp,
  Share2,
  Bookmark,
  Flag,
  ListPlus,
  Download,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { toggleVideoLike } from "../../store/slices/likeSlice";

const VideoActions = ({ video }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.like);

  const [liked, setLiked] = useState(false);

  const [saved, setSaved] = useState(false);

  const [sharing, setSharing] = useState(false);

  const [playlistModal, setPlaylistModal] = useState(false);

  const [createModal, setCreateModal] = useState(false);

  const handleLike = async () => {
    const result = await dispatch(toggleVideoLike(video._id));

    if (toggleVideoLike.fulfilled.match(result)) {
      setLiked((prev) => !prev);

      toast.success(liked ? "Like Removed" : "Video Liked");
    } else {
      toast.error(result.payload || "Something went wrong");
    }
  };

  const handleShare = async () => {
    try {
      setSharing(true);

      if (navigator.share) {
        await navigator.share({
          title: video?.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        toast.success("Link copied");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSharing(false);
    }
  };

  const handleDownload = () => {
    if (!video?.videoFile) {
      toast.error("Video unavailable");

      return;
    }

    window.open(video.videoFile, "_blank");
  };

  return (
    <section className="mt-6 flex flex-wrap items-center gap-3">
      {/* Like */}

      <button
        disabled={loading}
        onClick={handleLike}
        className={`flex h-12 items-center gap-2 rounded-xl border px-5 transition

        ${
          liked
            ? "border-white bg-white text-black"
            : "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
        }

        disabled:opacity-60`}>
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <ThumbsUp size={18} />
        )}

        {video?.likesCount || 0}
      </button>

      {/* Playlist */}

      <button
        onClick={() => setPlaylistModal(true)}
        className="flex h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-white transition hover:bg-zinc-800">
        <ListPlus size={18} />
        Playlist
      </button>

      {/* Save */}

      <button
        onClick={() => {
          setSaved(!saved);

          toast.success(saved ? "Removed" : "Saved");
        }}
        className={`flex h-12 items-center gap-2 rounded-xl border px-5 transition

        ${
          saved
            ? "border-white bg-white text-black"
            : "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
        }`}>
        <Bookmark size={18} />
        Save
      </button>
      {/* Share */}

      <button
        disabled={sharing}
        onClick={handleShare}
        className="flex h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-white transition hover:bg-zinc-800 disabled:opacity-60">
        {sharing ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Share2 size={18} />
        )}
        Share
      </button>

      {/* Download */}

      <button
        onClick={handleDownload}
        className="flex h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-white transition hover:bg-zinc-800">
        <Download size={18} />
        Download
      </button>

      {/* Report */}

      <button
        onClick={() => toast("Report feature coming soon")}
        className="flex h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-white transition hover:border-red-500 hover:text-red-500">
        <Flag size={18} />
        Report
      </button>
      <>
        <PlaylistModal
          open={playlistModal}
          videoId={video._id}
          onClose={() => setPlaylistModal(false)}
          onCreate={() => {
            setPlaylistModal(false);

            setCreateModal(true);
          }}
        />

        <CreatePlaylistModal
          open={createModal}
          onClose={() => setCreateModal(false)}
        />
      </>
    </section>
  );
};

export default VideoActions;
