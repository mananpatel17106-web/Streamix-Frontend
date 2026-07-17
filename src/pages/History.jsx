import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchHistory } from "../features/auth/authSlice";
import VideoCard from "../components/VideoCard";

export default function History() {
  const dispatch = useDispatch();
  const history = useSelector((s) => s.auth.history);
  useEffect(() => {
    dispatch(fetchWatchHistory());
  }, [dispatch]);
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Watch history</h1>
      {history.length === 0 ? (
        <div className="text-muted py-16 text-center">
          Your history is empty.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {history.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
