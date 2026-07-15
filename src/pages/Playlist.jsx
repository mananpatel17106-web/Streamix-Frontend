import { useEffect, useState } from "react";
import { Plus, ListVideo, Trash2, FolderOpen, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Loader from "../components/ui/Loader";

import {
  createPlaylist,
  deletePlaylist,
  getUserPlaylists,
} from "../store/slices/playlistSlice";

const Playlist = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { playlists, loading } = useSelector((state) => state.playlist);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user?._id) return;

    dispatch(getUserPlaylists(user._id));
  }, [dispatch, user]);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Playlist name required");

      return;
    }

    const result = await dispatch(
      createPlaylist({
        name,
        description,
      }),
    );

    if (createPlaylist.fulfilled.match(result)) {
      toast.success("Playlist created");

      setName("");

      setDescription("");

      setShowModal(false);

      dispatch(getUserPlaylists(user._id));
    } else {
      toast.error(result.payload || "Failed to create playlist");
    }
  };

  const handleDelete = async (playlistId) => {
    const result = await dispatch(deletePlaylist(playlistId));

    if (deletePlaylist.fulfilled.match(result)) {
      toast.success("Playlist deleted");

      dispatch(getUserPlaylists(user._id));
    } else {
      toast.error(result.payload);
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
          <h1 className="text-4xl font-bold text-white">My Playlists</h1>

          <p className="mt-2 text-zinc-500">Organize your favorite videos.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
          <Plus size={18} />
          Create Playlist
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {playlists.length === 0 ? (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">
              <ListVideo size={60} className="mb-6 text-zinc-700" />

              <h2 className="text-2xl font-semibold text-white">
                No Playlists Yet
              </h2>

              <p className="mt-3 max-w-md text-center text-zinc-500">
                Create your first playlist to organize your favorite videos.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-8 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200">
                Create Playlist
              </button>
            </div>
          </div>
        ) : (
          playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700">
              <div className="aspect-video rounded-t-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <ListVideo size={70} className="text-zinc-600" />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                    {playlist?.videos?.length || 0} Videos
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {playlist.name}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm text-zinc-500">
                  {playlist.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition hover:bg-zinc-200">
                    <FolderOpen size={18} />
                    Open
                  </button>

                  <button
                    onClick={() => handleDelete(playlist._id)}
                    className="flex items-center justify-center rounded-xl border border-red-500 px-4 text-red-500 transition hover:bg-red-500 hover:text-white">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Create Playlist
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Playlist Name"
              className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-zinc-500"
            />

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setName("");
                  setDescription("");
                }}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800">
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleCreate}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60">
                {loading && <Loader2 size={18} className="animate-spin" />}
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Playlist;
