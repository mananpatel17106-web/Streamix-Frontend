import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getVideos } from "../store/slices/videoSlice";

import VideoGrid from "../components/video/VideoGrid";
import Loader from "../components/ui/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const {
    videos,
    loading,
    error,
    page,
  } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(
        getVideos({
            page: 1,
            limit: 12,
            sortBy: "createdAt",
            sortType: "desc",
        })
    );
}, [dispatch]);

  if (loading && videos.length === 0) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load videos
        </h2>

        <p className="mt-2 text-zinc-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Discover
        </h1>

        <p className="mt-2 text-zinc-500">
          Explore trending videos from creators.
        </p>
      </div>

      <VideoGrid
        videos={videos}
      />
    </section>
  );
};

export default Home;