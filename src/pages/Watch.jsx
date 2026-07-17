import { fetchVideoById, fetchVideos } from "../features/video/videoSlice";

import {
  fetchComments,
  addComment,
  deleteComment,
} from "../features/comment/commentSlice";

import { toggleVideoLike } from "../features/likes/likeSlice";

import { toggleSubscription } from "../features/subscription/subscriptionSlice";

import { formatViews, timeAgo } from "../utils/format";

import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";
import { ThumbsUp, Share2, Bell, Trash2, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Watch() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { current } = useSelector((s) => s.videos);
  const { list: comments } = useSelector((s) => s.comments);
  const { list: allVideos } = useSelector((s) => s.videos);
  const user = useSelector((s) => s.auth.user);
  const [comment, setComment] = useState("");
  const [subbed, setSubbed] = useState(false);

  useEffect(() => {
    dispatch(fetchVideoById(videoId));
    dispatch(fetchComments(videoId));
    dispatch(fetchVideos({}));
  }, [dispatch, videoId]);

  const like = async () => {
    if (!user) return toast.error("Sign in to like");
    await dispatch(toggleVideoLike(videoId));
    toast.success("Updated");
  };

  const sub = async () => {
    if (!user) return toast.error("Sign in to subscribe");
    if (!current?.owner?._id) return;
    await dispatch(toggleSubscription(current.owner._id));
    setSubbed((v) => !v);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!user) return toast.error("Sign in to comment");
    const r = await dispatch(addComment({ videoId, content: comment.trim() }));
    if (r.meta.requestStatus === "fulfilled") setComment("");
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  if (!current) return <Loader />;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8">
      <div>
        <div className="rounded-2xl overflow-hidden border border-border bg-black aspect-video">
          <video
            src={current.videoFile}
            poster={current.thumbnail}
            controls
            className="w-full h-full"
          />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">
          {current.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={`/c/${current.owner?.username}`}
            className="flex items-center gap-3">
            <img
              src={current.owner?.avatar}
              alt=""
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-sm">
                {current.owner?.fullName || current.owner?.username}
              </div>
              <div className="text-xs text-muted">
                @{current.owner?.username}
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={sub}
              className={subbed ? "btn-ghost" : "btn-primary"}>
              <Bell className="w-4 h-4" /> {subbed ? "Subscribed" : "Subscribe"}
            </button>
            <button onClick={like} className="btn-ghost">
              <ThumbsUp className="w-4 h-4" /> Like
            </button>
            <button onClick={share} className="btn-ghost">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
        <div className="mt-4 card p-4 text-sm">
          <div className="text-muted text-xs mb-2">
            {formatViews(current.views)} views · {timeAgo(current.createdAt)}
          </div>
          <p className="whitespace-pre-wrap">{current.description}</p>
        </div>

        <section className="mt-8">
          <h2 className="font-display font-bold text-lg mb-4">
            {comments.length} Comments
          </h2>
          {user && (
            <form onSubmit={submitComment} className="flex gap-3 mb-6">
              <img
                src={user.avatar}
                className="w-9 h-9 rounded-full object-cover"
                alt=""
              />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment…"
                className="input flex-1"
              />
              <button className="btn-primary">
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c._id} className="flex gap-3">
                <img
                  src={c.owner?.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-xs text-muted">
                    @{c.owner?.username} · {timeAgo(c.createdAt)}
                  </div>
                  <div className="text-sm mt-0.5">{c.content}</div>
                </div>
                {user?._id === c.owner?._id && (
                  <button
                    onClick={() => dispatch(deleteComment(c._id))}
                    className="text-muted hover:text-primary-soft">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <aside className="space-y-4">
        <h3 className="font-display font-bold">Up next</h3>
        <div className="grid gap-4">
          {(allVideos || [])
            .filter((v) => v._id !== videoId)
            .slice(0, 8)
            .map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
        </div>
      </aside>
    </div>
  );
}
