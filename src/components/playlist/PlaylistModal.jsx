import { useEffect } from "react";
import { X, Check, ListVideo, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  addVideoToPlaylist,
  getUserPlaylists,
} from "../../store/slices/playlistSlice";

const PlaylistModal = ({ open, onClose, videoId, onCreate }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { playlists, loading } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (open && user?._id) {
      dispatch(getUserPlaylists(user._id));
    }
  }, [open, user, dispatch]);

  if (!open) return null;

  const handleAdd = async (playlistId) => {
    const result = await dispatch(
      addVideoToPlaylist({
        videoId,
        playlistId,
      }),
    );

    if (addVideoToPlaylist.fulfilled.match(result)) {
      toast.success("Video added successfully");

      onClose();
    } else {
      toast.error(result.payload || "Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-bold text-white">Save To Playlist</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800">
            <X size={22} />
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-6 space-y-4">
          {playlists.length === 0 ? (
            <div className="py-12 text-center">
              <ListVideo size={60} className="mx-auto mb-4 text-zinc-700" />

              <h3 className="text-xl font-semibold text-white">
                No Playlists Found
              </h3>

              <p className="mt-2 text-zinc-500">Create your first playlist.</p>
            </div>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist._id}
                disabled={loading}
                onClick={() => handleAdd(playlist._id)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-700 hover:bg-zinc-800 disabled:opacity-60">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
                    <ListVideo size={22} />
                  </div>

                  <div className="text-left">
                    <h4 className="font-semibold text-white">
                      {playlist.name}
                    </h4>

                    <p className="mt-1 text-sm text-zinc-500">
                      {playlist?.videos?.length || 0} Videos
                    </p>
                  </div>
                </div>

                <Check size={22} className="text-emerald-500" />
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 p-6">
          <button
            onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
            <Plus size={18} />
            Create Playlist
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
