import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import VideoPlayer from "../components/watch/VideoPlayer";
import VideoInfo from "../components/watch/VideoInfo";
import VideoActions from "../components/watch/VideoActions";
import ChannelCard from "../components/watch/ChannelCard";
import CommentSection from "../components/watch/CommentSection";
import RelatedVideos from "../components/watch/RelatedVideos";

import videoService from "../services/video.service";
// import commentService from "../services/comment.service";
// import subscriptionService from "../services/subscription.service";

const WatchVideo = () => {
  const { videoId } = useParams();

  const dispatch = useDispatch();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    loadVideo();
  }, [videoId]);

  const loadVideo = async () => {
    try {
      setLoading(true);

      const response = await videoService.getVideoById(videoId);

      const data = response.data;

      setVideo(data);

      /*
      loadComments();
      loadRelatedVideos();
      */

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked((prev) => !prev);

    if (disliked) {
      setDisliked(false);
    }

    // API
  };

  const handleDislike = () => {
    setDisliked((prev) => !prev);

    if (liked) {
      setLiked(false);
    }

    // API
  };

  const handleSubscribe = () => {
    setSubscribed((prev) => !prev);

    // API
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      // toast.success("Copied")
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {};

  const handleDownload = () => {};

  const handleAddComment = (text) => {
    console.log(text);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-white">
        Video not found
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_380px]">

      <section>

        <VideoPlayer
          src={video.videoFile}
          poster={video.thumbnail}
        />

        <VideoInfo
          video={video}
        />

        <ChannelCard
          channel={video.owner}
          isSubscribed={subscribed}
          onSubscribe={handleSubscribe}
        />

        <VideoActions
          video={video}
          isLiked={liked}
          isDisliked={disliked}
          onLike={handleLike}
          onDislike={handleDislike}
          onShare={handleShare}
          onSave={handleSave}
          onDownload={handleDownload}
        />
                <CommentSection
          comments={comments}
          currentUser={{
            _id: "current-user-id",
            username: "manan",
            avatar: "",
          }}
          totalComments={comments.length}
          loading={false}
          onAddComment={handleAddComment}
          onLikeComment={(comment) => {
            console.log("Like Comment:", comment);
          }}
          onReplyComment={(comment) => {
            console.log("Reply Comment:", comment);
          }}
          onEditComment={(comment) => {
            console.log("Edit Comment:", comment);
          }}
          onDeleteComment={(comment) => {
            console.log("Delete Comment:", comment);
          }}
        />
      </section>

      {/* Related Videos */}

      <aside className="space-y-4">
        <RelatedVideos
          videos={relatedVideos}
          loading={loading}
        />
      </aside>
    </div>
  );
};

export default WatchVideo;