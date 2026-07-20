import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../components/Loader";
import PlaylistModal from "../components/playlist/PlaylistModal";

import VideoPlayer from "../components/watch/VideoPlayer";
import VideoInfo from "../components/watch/VideoInfo";
import CommentSection from "../components/watch/CommentSection";
import RecommendedVideos from "../components/watch/RecommendedVideos";

import { fetchVideoById, fetchVideos } from "../features/video/videoSlice";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../features/comment/commentSlice";
import {
  toggleVideoLike,
  fetchLikedVideos,
} from "../features/likes/likeSlice";
import {
  toggleSubscription,
  fetchSubscribedChannels,
} from "../features/subscription/subscriptionSlice";
import {
  addToHistory,
} from "../features/auth/authSlice";

export default function Watch() {
  const { videoId } = useParams();

  const dispatch = useDispatch();

  const { current, list: allVideos } = useSelector((state) => state.videos);

  const { list: comments } = useSelector((state) => state.comments);

  const user = useSelector((state) => state.auth.user);

  const likedVideoIds = useSelector((state) => state.likes.likedVideoIds);

  const liked = likedVideoIds.includes(videoId);

  const [comment, setComment] = useState("");

  const [commentCount, setCommentCount] = useState(0);

  const [subbed, setSubbed] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [playlistOpen, setPlaylistOpen] = useState(false);

  const [subscriberCount, setSubscriberCount] = useState(0);

  const subscribedChannelIds = useSelector(
    (state) => state.subscriptions.subscribedChannelIds,
  );

  const subscribed = current?.owner?._id
    ? subscribedChannelIds.includes(current.owner._id)
    : false;

  const isOwnChannel = user?._id === current?.owner?._id;

  useEffect(() => {
    dispatch(fetchVideoById(videoId));
    dispatch(fetchComments(videoId));
    dispatch(fetchVideos({}));

    if (user) {
      dispatch(fetchLikedVideos());
      dispatch(fetchSubscribedChannels(user._id));
    }
  }, [dispatch, videoId, user]);

  useEffect(() => {
    if (!user || !current?._id) return;

    dispatch(addToHistory(current._id));
  }, [dispatch, user, current?._id]);

  useEffect(() => {
    if (!current?.owner) return;

    setSubbed(current.owner.isSubscribed || current.owner.subscribed || false);
  }, [current]);

  useEffect(() => {
    if (current?.owner?.subscribersCount !== undefined) {
      setSubscriberCount(current.owner.subscribersCount);
    }
  }, [current]);

  useEffect(() => {
    if (current?.commentsCount !== undefined) {
      setCommentCount(current.commentsCount);
    }
  }, [current]);

  const recommendedVideos = useMemo(() => {
    return (allVideos || [])
      .filter((video) => video._id !== videoId)
      .slice(0, 8);
  }, [allVideos, videoId]);

  const like = async () => {
    if (!user) {
      toast.error("Sign in first");
      return;
    }

    const result = await dispatch(toggleVideoLike(videoId));

    if (toggleVideoLike.fulfilled.match(result)) {
      dispatch(fetchLikedVideos());
      dispatch(fetchVideoById(videoId));
    }
  };

  const sub = async () => {
    if (!user) {
      toast.error("Sign in first");
      return;
    }

    if (!current?.owner?._id) return;

    const result = await dispatch(toggleSubscription(current.owner._id));

    if (toggleSubscription.fulfilled.match(result)) {
      if (subscribed) {
        setSubscriberCount((prev) => Math.max(0, prev - 1));
      } else {
        setSubscriberCount((prev) => prev + 1);
      }
    } else {
      toast.error("Unable to subscribe");
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Write something");
      return;
    }

    if (!user) {
      toast.error("Login first");
      return;
    }

    const res = await dispatch(
      addComment({
        videoId,
        content: comment.trim(),
      }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      setComment("");
      toast.success("Comment added");
      setCommentCount((prev) => prev + 1);

      dispatch(fetchComments(videoId));
    }
  };

  const removeComment = async (id) => {
    const res = await dispatch(deleteComment(id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Comment deleted");
    }
    setCommentCount((prev) => Math.max(0, prev - 1));
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied");
    } catch {
      toast.error("Unable to copy");
    }
  };

  if (!current) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
      {/* LEFT */}

      <section>
        <VideoPlayer
          videoFile={current.videoFile}
          thumbnail={current.thumbnail}
          title={current.title}
        />

        <h1 className="mt-4 text-xl font-bold leading-snug text-white sm:text-2xl">
          {current.title}
        </h1>

        <VideoInfo
          current={current}
          liked={liked}
          subscribed={subscribed}
          subscriberCount={subscriberCount}
          isOwnChannel={isOwnChannel}
          like={like}
          sub={sub}
          share={share}
          setPlaylistOpen={setPlaylistOpen}
          showFullDescription={showFullDescription}
          setShowFullDescription={setShowFullDescription}
          user={user}
        />
        {/* COMMENTS */}

        <CommentSection
          user={user}
          comment={comment}
          setComment={setComment}
          submitComment={submitComment}
          comments={comments}
          commentCount={commentCount}
          removeComment={removeComment}
        />
      </section>

      {/* RIGHT SIDEBAR */}

      <RecommendedVideos recommendedVideos={recommendedVideos} />

      <PlaylistModal
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        videoId={current._id}
      />
    </div>
  );
}
