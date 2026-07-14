import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryChips from "../components/video/CategoryChips";
import VideoGrid from "../components/video/VideoGrid";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import {
  getVideos,
  clearVideos,
} from "../store/slices/videoSlice";

const Home = () => {
  const dispatch = useDispatch();

  const {
    videos,
    loading,
    page,
    hasMore,
    query,
    sortBy,
    sortType,
  } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(clearVideos());

    dispatch(
      getVideos({
        page: 1,
        query,
        sortBy,
        sortType,
      })
    );
  }, [dispatch, query, sortBy, sortType]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    dispatch(
      getVideos({
        page: page + 1,
        query,
        sortBy,
        sortType,
      })
    );
  }, [
    dispatch,
    loading,
    hasMore,
    page,
    query,
    sortBy,
    sortType,
  ]);

  const lastVideoRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  return (
    <section className="space-y-8">
      <CategoryChips />

      <VideoGrid
        videos={videos}
        loading={loading}
        lastVideoRef={lastVideoRef}
      />
    </section>
  );
};

export default Home;