import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/ui/Loader";

import VideoPlayer from "../components/watch/VideoPlayer";
import VideoInfo from "../components/watch/VideoInfo";
import VideoActions from "../components/watch/VideoActions";
import SuggestedVideos from "../components/watch/SuggestedVideos";
 import CommentSection from "../components/comment/CommentSection";

import {
  getVideoById,
  getVideos,
} from "../store/slices/videoSlice";

const WatchVideo = () => {
  const { videoId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    currentVideo,
    videos,
    loading,
    error,
  } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    if (!videoId) return;

    dispatch(getVideoById(videoId));

    dispatch(
      getVideos({
        page: 1,
        limit: 10,
      })
    );
  }, [dispatch, videoId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [videoId]);

  if (loading && !currentVideo) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">

        <h2 className="text-2xl font-bold text-red-500">
          Failed to load video
        </h2>

        <p className="mt-3 text-zinc-500">
          {error}
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-black"
        >
          Back Home
        </button>

      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="flex h-[80vh] items-center justify-center">

        <h2 className="text-2xl font-semibold text-zinc-500">
          Video Not Found
        </h2>

      </div>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1800px] gap-8 xl:grid-cols-[1fr_380px]">

      {/* Left */}

      <div>

        <VideoPlayer
          video={currentVideo}
        />

        <VideoInfo
          video={currentVideo}
        />

        <VideoActions
          video={currentVideo}
        />

        <CommentSection
          videoId={videoId}
        />

      </div>

      {/* Right */}

      <aside className="space-y-5">
                <SuggestedVideos
          currentVideoId={videoId}
          videos={videos.filter(
            (video) => video._id !== videoId
          )}
        />
      </aside>
    </section>
  );
};

export default WatchVideo;