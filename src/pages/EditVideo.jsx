import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../components/ui/Loader";

import { getVideoById, updateVideo } from "../store/slices/videoSlice";

const EditVideo = () => {
  const { videoId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentVideo, loading } = useSelector((state) => state.video);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(getVideoById(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (!currentVideo) return;

    setTitle(currentVideo.title);

    setDescription(currentVideo.description);

    setPreview(currentVideo.thumbnail);
  }, [currentVideo]);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required");

      return;
    }

    const formData = new FormData();

    formData.append("title", title);

    formData.append("description", description);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const result = await dispatch(
      updateVideo({
        videoId,
        data: formData,
      }),
    );

    if (updateVideo.fulfilled.match(result)) {
      toast.success("Video updated");

      navigate(`/watch/${videoId}`);
    } else {
      toast.error(result.payload || "Update failed");
    }
  };

  if (loading && !currentVideo) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Edit Video</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Thumbnail
            </label>

            <img
              src={preview}
              alt="Thumbnail Preview"
              className="mb-4 h-72 w-full rounded-xl border border-zinc-800 object-cover"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video title"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>

            <textarea
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Video description..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60">
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditVideo;
