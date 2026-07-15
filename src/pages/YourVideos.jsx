import { useEffect } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../components/ui/Loader";

import { getVideos, deleteVideo } from "../store/slices/videoSlice";

const YourVideos = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { videos, loading } = useSelector((state) => state.video);

  useEffect(() => {
    if (!user?._id) return;

    dispatch(
      getVideos({
        page: 1,
        limit: 50,
        userId: user._id,
      }),
    );
  }, [dispatch, user]);

  const handleDelete = async (videoId) => {
    const result = await dispatch(deleteVideo(videoId));

    if (deleteVideo.fulfilled.match(result)) {
      toast.success("Video deleted");

      dispatch(
        getVideos({
          page: 1,
          limit: 50,
          userId: user._id,
        }),
      );
    } else {
      toast.error(result.payload || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Your Videos</h1>

          <p className="mt-2 text-zinc-500">Manage your uploaded videos.</p>
        </div>

        <Link
          to="/upload"
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
          <Plus size={18} />
          Upload Video
        </Link>
      </div>

      <div className="space-y-5">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">
            <Plus size={60} className="mb-6 text-zinc-700" />

            <h2 className="text-2xl font-semibold text-white">
              No Videos Uploaded
            </h2>

            <p className="mt-3 text-center text-zinc-500">
              Upload your first video and start growing your audience.
            </p>

            <Link
              to="/upload"
              className="mt-8 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200">
              Upload Now
            </Link>
          </div>
        ) : (
          videos.map((video) => (
            <div
              key={video._id}
              className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 lg:flex-row">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-52 w-full rounded-xl object-cover lg:h-36 lg:w-64"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {video.title}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-zinc-500">
                    {video.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Eye size={16} />
                      {video.views} Views
                    </span>

                    <span>
                      {Math.floor(video.duration / 60)}:
                      {Math.floor(video.duration % 60)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/watch/${video._id}`}
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
                    <Eye size={18} />
                    Open
                  </Link>

                  <Link
                    to={`/edit-video/${video._id}`}
                    className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800">
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(video._id)}
                    className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-500 transition hover:bg-red-500 hover:text-white">
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default YourVideos;
