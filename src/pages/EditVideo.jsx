import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideoById,
  updateVideo,
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
    const r = await dispatch(updateVideo({ videoId, formData: fd }));
    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Saved");
      navigate("/dashboard");
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
      <h1 className="font-display text-2xl font-bold">Edit video</h1>
      <form onSubmit={save} className="mt-6 card p-6 space-y-4">
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
          <span className="label">New thumbnail (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary">Save</button>
          <button type="button" onClick={toggle} className="btn-ghost">
            Toggle publish
          </button>
          <button
            type="button"
            onClick={remove}
            className="btn-outline text-primary-soft border-primary/40">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
