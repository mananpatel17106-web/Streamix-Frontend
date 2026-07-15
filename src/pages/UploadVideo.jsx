import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { publishVideo } from "../store/slices/videoSlice";

const UploadVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [thumbnailPreview, setThumbnailPreview] =
    useState(null);

  const [videoPreview, setVideoPreview] =
    useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    formData.append(
      "description",
      data.description
    );

    formData.append(
      "thumbnail",
      data.thumbnail[0]
    );

    formData.append(
      "videoFile",
      data.videoFile[0]
    );

    const result = await dispatch(
      publishVideo(formData)
    );

    if (publishVideo.fulfilled.match(result)) {
      toast.success("Video Uploaded");

      navigate("/dashboard");
    }
  };

  return (
    <section className="mx-auto max-w-5xl">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Upload Video
        </h1>

        <p className="mt-3 text-zinc-500">
          Share your content with the world.
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* Title */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter video title"
            {...register("title", {
              required: "Title is required",
            })}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none"
          />

          {errors.title && (
            <p className="mt-2 text-red-400 text-sm">
              {errors.title.message}
            </p>
          )}

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Description
          </label>

          <textarea
            rows={6}
            placeholder="Write description..."
            {...register("description", {
              required:
                "Description is required",
            })}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-white outline-none"
          />
                    {errors.description && (
            <p className="mt-2 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}

        </div>

        {/* Thumbnail */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", {
              required: "Thumbnail is required",
              onChange: (e) => {
                const file = e.target.files[0];

                if (file) {
                  setThumbnailPreview(
                    URL.createObjectURL(file)
                  );
                }
              },
            })}
            className="block w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-400
            file:mr-4
            file:rounded-lg
            file:border-0
            file:bg-white
            file:px-4
            file:py-2
            file:text-black"
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-4 h-56 w-full rounded-xl object-cover"
            />
          )}

        </div>

        {/* Video */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Video
          </label>

          <input
            type="file"
            accept="video/*"
            {...register("videoFile", {
              required: "Video file is required",
              onChange: (e) => {
                const file = e.target.files[0];

                if (file) {
                  setVideoPreview(
                    URL.createObjectURL(file)
                  );
                }
              },
            })}
            className="block w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-400
            file:mr-4
            file:rounded-lg
            file:border-0
            file:bg-white
            file:px-4
            file:py-2
            file:text-black"
          />

          {videoPreview && (
            <video
              controls
              className="mt-4 w-full rounded-xl"
              src={videoPreview}
            />
          )}

        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-white font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud size={20} />
              Publish Video
            </>
          )}
        </button>

      </form>

    </section>
  );
};

export default UploadVideo;