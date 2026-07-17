import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListPlus, Plus } from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../common/Modal";
import PlaylistItem from "./PlaylistItem";
import CreatePlaylistModal from "./CreatePlaylistModal";

import {
  fetchUserPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../../features/playlist/playlistSlice";

export default function PlaylistModal({
  open,
  onClose,
  videoId,
}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const playlists = useSelector(
    (state) => state.playlists.list
  );

  const [query, setQuery] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (open && user?._id) {
      dispatch(fetchUserPlaylists(user._id));
    }
  }, [dispatch, open, user]);

  const filteredPlaylists = useMemo(() => {
    return playlists.filter((playlist) =>
      playlist.name
        ?.toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [playlists, query]);

  const togglePlaylist = async (playlist) => {
    setLoadingId(playlist._id);

    const exists = playlist.videos?.some(
      (video) =>
        (video?._id || video) === videoId
    );

    const action = exists
      ? removeVideoFromPlaylist({
          playlistId: playlist._id,
          videoId,
        })
      : addVideoToPlaylist({
          playlistId: playlist._id,
          videoId,
        });

    const result = await dispatch(action);

    setLoadingId(null);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        exists
          ? "Removed from playlist"
          : "Added to playlist"
      );

      // dispatch(fetchUserPlaylists(user._id));
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Save to Playlist"
        size="md"
      >
        <div className="space-y-5">

          <input
            type="text"
            placeholder="Search playlist..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="input w-full"
          />

          <button
            onClick={() => setCreateOpen(true)}
            className="btn-primary flex w-full items-center justify-center gap-2"
          >
            <Plus size={18} />
            Create Playlist
          </button>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {filteredPlaylists.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-10 text-center">
                <ListPlus
                  size={42}
                  className="mb-3 text-neutral-600"
                />

                <p className="text-sm text-neutral-400">
                  No playlists found
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Create your first playlist.
                </p>
              </div>
            ) : (
              filteredPlaylists.map((playlist) => (
                <PlaylistItem
                  key={playlist._id}
                  playlist={playlist}
                  loading={loadingId === playlist._id}
                  checked={playlist.videos?.some(
                    (video) =>
                      (video?._id || video) === videoId
                  )}
                  onToggle={togglePlaylist}
                />
              ))
            )}
          </div>
        </div>
      </Modal>

      <CreatePlaylistModal
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);

          if (user?._id) {
            dispatch(fetchUserPlaylists(user._id));
          }
        }}
      />
    </>
  );
}