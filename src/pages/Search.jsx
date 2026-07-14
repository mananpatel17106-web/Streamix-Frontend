import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getVideos } from "../store/slices/videoSlice";

import Loader from "../components/ui/Loader";
import VideoGrid from "../components/video/VideoGrid";

const Search = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const {
    videos,
    loading,
    error,
  } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(
      getVideos({
        page: 1,
        limit: 12,
        query,
        sortBy: "createdAt",
        sortType: "desc",
      })
    );
  }, [dispatch, query]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Search Results
        </h1>

        <p className="mt-2 text-zinc-500">
          Showing results for "{query}"
        </p>
      </div>

      <VideoGrid videos={videos} />
    </section>
  );
};

export default Search;