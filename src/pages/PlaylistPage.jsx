import {
  fetchPlaylistById,
  removeVideoFromPlaylist,
} from "../features/playlist/playlistSlice";

import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const { current } = useSelector((s) => s.playlists);
  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId));
  }, [dispatch, playlistId]);

  if (!current) return <Loader />;
  const videos = current.videos || [];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{current.name}</h1>
      <p className="text-muted mt-1">{current.description}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {videos.map((v) => (
          <div key={v._id} className="relative">
            <VideoCard video={v} />
            <button
              onClick={() =>
                dispatch(
                  removeVideoFromPlaylist({ videoId: v._id, playlistId }),
                )
              }
              className="absolute top-2 left-2 bg-black/60 rounded-md px-2 py-1 text-xs">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
