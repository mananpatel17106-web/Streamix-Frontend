import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  createPlaylist,
  getUserPlaylists,
} from "../../store/slices/playlistSlice";

const CreatePlaylistModal = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const { loading } = useSelector(
    (state) => state.playlist
  );

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  if (!open) return null;

  const handleCreate =
    async () => {
      if (!name.trim()) {
        toast.error(
          "Playlist name is required"
        );

        return;
      }

      const result =
        await dispatch(
          createPlaylist({
            name,
            description,
          })
        );

      if (
        createPlaylist.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Playlist created"
        );

        dispatch(
          getUserPlaylists(
            user._id
          )
        );

        setName("");

        setDescription("");

        onClose();
      } else {
        toast.error(
          result.payload ||
            "Failed to create playlist"
        );
      }
    };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <h2 className="text-2xl font-bold text-white">

            Create Playlist

          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >

            <X size={22} />

          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="mb-2 block text-sm text-zinc-400">

              Playlist Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="My Playlist"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-white"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-zinc-400">

              Description

            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Playlist description..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-white"
            />

          </div>
                    <div className="flex justify-end gap-3 pt-2">

            <button
              onClick={() => {
                setName("");
                setDescription("");
                onClose();
              }}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleCreate}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              Create Playlist
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CreatePlaylistModal;