import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

import { publishVideo } from "../features/video/videoSlice";
const [category, setCategory] = useState("Programming");

export default function Upload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [videoDuration, setVideoDuration] = useState("");

  const [loading, setLoading] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");

  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [videoPreview, thumbnailPreview]);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    setVideoError("");

    if (!file) return;

    if (file.size > 500 * 1024 * 1024) {
      setVideoError("Video size must be below 500 MB");
      return;
    }

    setVideoFile(file);

    const url = URL.createObjectURL(file);

    setVideoPreview(url);

    const video = document.createElement("video");

    video.preload = "metadata";

    video.src = url;

    video.onloadedmetadata = () => {
      const mins = Math.floor(video.duration / 60);
      const secs = Math.floor(video.duration % 60);

      setVideoDuration(`${mins}:${secs.toString().padStart(2, "0")}`);
    };
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    setThumbnailError("");

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setThumbnailError("Thumbnail must be below 5 MB");
      return;
    }

    setThumbnail(file);

    setThumbnailPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();

    setTitleError("");
    setDescriptionError("");
    setVideoError("");
    setThumbnailError("");

    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    if (title.trim().length < 3) {
      setTitleError("Title must be at least 3 characters");
      return;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      return;
    }

    if (description.trim().length < 10) {
      setDescriptionError("Description must be at least 10 characters");
      return;
    }

    if (!videoFile) {
      setVideoError("Please select a video");
      return;
    }

    if (!thumbnail) {
      setThumbnailError("Please select a thumbnail");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("isPublished", isPublished);

    try {
      setLoading(true);

      const result = await dispatch(publishVideo(formData));

      if (publishVideo.fulfilled.match(result)) {
        toast.success("Video uploaded successfully");

        navigate(`/watch/${result.payload._id}`);
      } else {
        toast.error(result.payload || "Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-bold">Upload Video</h1>

      <p className="mt-2 text-sm text-muted">
        Share your creativity with the Streamix community.
      </p>

      <form onSubmit={submit} className="mt-8 card space-y-6 p-6">
        <div>
          <label className="label">Title</label>

          <input
            type="text"
            className="input"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
          />

          {titleError && (
            <p className="mt-2 text-sm text-red-500">{titleError}</p>
          )}
        </div>

        <div>
          <label className="label">Description</label>

          <textarea
            rows={5}
            className="input h-auto py-3"
            placeholder="Tell viewers about your video..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError("");
            }}
          />

          {descriptionError && (
            <p className="mt-2 text-sm text-red-500">{descriptionError}</p>
          )}
        </div>

        <div>
          <label className="label">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input">
            <option value="Programming">Programming</option>
            <option value="AI">AI</option>
            <option value="Gaming">Gaming</option>
            <option value="Music">Music</option>
            <option value="Education">Education</option>
            <option value="News">News</option>
            <option value="Sports">Sports</option>
            <option value="Movies">Movies</option>
            <option value="Live">Live</option>
          </select>
        </div>

        <div>
          <label className="label mb-3 block">Visibility</label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              onClick={() => setIsPublished(true)}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                isPublished
                  ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30"
                  : "border-[#2b2b39] bg-[#161622] hover:border-rose-500/50"
              }`}>
              <input
                type="radio"
                checked={isPublished}
                readOnly
                className="hidden"
              />

              <h3 className="font-semibold text-white">🌍 Public</h3>

              <p className="mt-1 text-sm text-muted">
                Anyone can watch this video.
              </p>
            </label>

            <label
              onClick={() => setIsPublished(false)}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                !isPublished
                  ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30"
                  : "border-[#2b2b39] bg-[#161622] hover:border-rose-500/50"
              }`}>
              <input
                type="radio"
                checked={!isPublished}
                readOnly
                className="hidden"
              />

              <h3 className="font-semibold text-white">🔒 Private</h3>

              <p className="mt-1 text-sm text-muted">
                Only you can access this video until you publish it.
              </p>
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="label">Video File</label>

            <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/40 transition hover:border-primary">
              <UploadCloud className="mb-3 h-8 w-8" />

              <span className="text-sm">
                {videoFile ? videoFile.name : "Click to select video"}
              </span>

              <span className="mt-2 text-xs text-muted">
                MP4, MOV, AVI (Max 500 MB)
              </span>

              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
              />
            </label>

            {videoError && (
              <p className="mt-2 text-sm text-red-500">{videoError}</p>
            )}
          </div>

          <div>
            <label className="label">Thumbnail</label>

            <label className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-surface/40 transition hover:border-primary">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <UploadCloud className="mx-auto mb-3 h-8 w-8" />

                  <p className="text-sm">Click to select thumbnail</p>

                  <p className="mt-2 text-xs text-muted">
                    JPG / PNG (Max 5 MB)
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </label>

            {thumbnailError && (
              <p className="mt-2 text-sm text-red-500">{thumbnailError}</p>
            )}
          </div>
        </div>

        {videoPreview && (
          <div className="rounded-xl border border-border p-5">
            <h2 className="mb-4 text-lg font-semibold">Video Preview</h2>

            <video src={videoPreview} controls className="w-full rounded-lg" />

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <span className="font-semibold">File :</span> {videoFile?.name}
              </div>

              <div>
                <span className="font-semibold">Size :</span>{" "}
                {(videoFile?.size / 1024 / 1024).toFixed(2)} MB
              </div>

              <div>
                <span className="font-semibold">Duration :</span>{" "}
                {videoDuration}
              </div>

              <div>
                <span className="font-semibold">Type :</span> {videoFile?.type}
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex h-12 w-full items-center justify-center gap-2">
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}

          {loading ? "Uploading..." : "Publish Video"}
        </button>
      </form>
    </div>
  );
}
