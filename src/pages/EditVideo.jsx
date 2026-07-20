import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideoById,
  updateVideo,
  deleteVideo,
  togglePublish,
} from "../features/video/videoSlice";

import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function EditVideo() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((s) => s.videos);
  const [form, setForm] = useState({ title: "", description: "" });
  const [thumbnail, setThumbnail] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchVideoById(videoId));
  }, [dispatch, videoId]);
  useEffect(() => {
    if (current)
      setForm({
        title: current.title || "",
        description: current.description || "",
      });
  }, [current]);

  if (!current) return <Loader />;

  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (thumbnail) fd.append("thumbnail", thumbnail);

    setSaving(true);
    const r = await dispatch(updateVideo({ videoId, formData: fd }));
    setSaving(false);

    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Video updated successfully");
      navigate("/dashboard", { replace: true });
    }
  };

  const remove = async () => {
    if (!confirm("Delete this video?")) return;
    await dispatch(deleteVideo(videoId));
    toast.success("Deleted");
    navigate("/dashboard");
  };

  const toggle = async () => {
    await dispatch(togglePublish(videoId));
    toast.success("Toggled");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Edit Video</h1>

        <p className="mt-2 text-zinc-400">Update your video's information.</p>
      </div>
      <form
        onSubmit={save}
        className="space-y-6 rounded-2xl border border-white/10 bg-zinc-900 p-8">
        <label className="block">
          <span className="label">Title</span>
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="label">Description</span>
          <textarea
            rows={4}
            className="input h-auto py-3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="label mb-3 block">Thumbnail</span>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
            <img
              src={
                thumbnail ? URL.createObjectURL(thumbnail) : current.thumbnail
              }
              alt="Thumbnail Preview"
              className="aspect-video w-full object-cover"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="mt-4 block w-full rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-white"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          />
        </label>
        <div className="flex flex-wrap justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-lg border border-white/10 px-5 py-2 text-white hover:bg-zinc-800">
            Cancel
          </button>

          <button
            type="button"
            onClick={toggle}
            className="rounded-lg bg-yellow-600 px-5 py-2 text-white hover:bg-yellow-500">
            {current.isPublished ? "Make Private" : "Publish"}
          </button>

          <button
            type="button"
            onClick={remove}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-500">
            Delete
          </button>

          <button className="rounded-lg bg-primary px-6 py-2 text-white hover:opacity-90">
            Save Changes
          </button>

          <button
            disabled={saving}
            className="rounded-lg bg-primary px-6 py-2 text-white">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
