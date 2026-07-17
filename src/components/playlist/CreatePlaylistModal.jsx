import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Modal from "../common/Modal";
import { createPlaylist } from "../../features/playlist/playlistSlice";

export default function CreatePlaylistModal({
  open,
  onClose,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Playlist name is required");
    }

    setLoading(true);

    const result = await dispatch(
      createPlaylist({
        name: form.name.trim(),
        description: form.description.trim(),
      })
    );

    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Playlist created");

      setForm({
        name: "",
        description: "",
      });

      onClose?.();
    } else {
      toast.error("Failed to create playlist");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Playlist"
      size="md"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Playlist Name
          </label>

          <input
            type="text"
            name="name"
            autoFocus
            value={form.name}
            onChange={handleChange}
            placeholder="My Playlist"
            className="input w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write something..."
            className="input w-full resize-none"
          />
        </div>

        <button
          disabled={loading}
          className="btn-primary flex w-full items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Creating...
            </>
          ) : (
            <>
              <Plus size={18} />
              Create Playlist
            </>
          )}
        </button>
      </form>
    </Modal>
  );
}