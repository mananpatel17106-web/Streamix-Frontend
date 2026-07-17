import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedVideos } from "../features/likes/likeSlice";
import VideoCard from "../components/VideoCard";

export default function LikedVideos() {
  const dispatch = useDispatch();
  const { liked } = useSelector((s) => s.likes);
  useEffect(() => {
    dispatch(fetchLikedVideos());
  }, [dispatch]);
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Liked videos</h1>
      {liked.length === 0 ? (
        <div className="text-muted py-16 text-center">No liked videos yet.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {liked.map((l) => (
            <VideoCard key={l._id} video={l.video || l} />
          ))}
        </div>
      )}
    </div>
  );
}
