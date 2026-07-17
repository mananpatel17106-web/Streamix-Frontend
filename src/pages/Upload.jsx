import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishVideo } from "../features/video/videoSlice";
import { Loader2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!videoFile || !thumbnail)
      return toast.error("Video & thumbnail required");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("videoFile", videoFile);
    fd.append("thumbnail", thumbnail);
    setLoading(true);
    const r = await dispatch(publishVideo(fd));
    setLoading(false);
    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Uploaded!");
      navigate(`/watch/${r.payload._id}`);
    } else toast.error(r.payload || "Upload failed");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold">Upload a video</h1>
      <p className="text-muted mt-1 text-sm">
        Share your work with the Streamix community.
      </p>
      <form onSubmit={submit} className="mt-8 card p-6 space-y-5">
        <label className="block">
          <span className="label">Title</span>
          <input
            required
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="label">Description</span>
          <textarea
            required
            rows={4}
            className="input h-auto py-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="label">Video file</span>
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-surface/40 text-xs text-muted">
              <div className="text-center px-4">
                <UploadCloud className="w-6 h-6 mx-auto mb-1" />
                {videoFile?.name || "Click to upload video"}
              </div>
            </div>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </label>
          <label className="block">
            <span className="label">Thumbnail</span>
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-surface/40 text-xs text-muted overflow-hidden">
              {thumbnail ? (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  className="h-full w-full object-cover"
                  alt=""
                />
              ) : (
                "Click to upload image"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <button disabled={loading} className="btn-primary w-full h-11">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />} Publish
        </button>
      </form>
    </div>
  );
}
