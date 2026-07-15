import { useEffect, useState } from "react";
import { Plus, ListVideo } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/ui/Loader";

import {
  getUserPlaylists,
} from "../store/slices/playlistSlice";

const Playlist = () => {
  const dispatch = useDispatch();

  const {
    playlists,
    loading,
  } = useSelector(
    (state) => state.playlist
  );

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    dispatch(getUserPlaylists());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            My Playlists
          </h1>

          <p className="mt-2 text-zinc-500">
            Organize your favorite videos.
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          <Plus size={18} />

          Create Playlist
        </button>

      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {playlists.length === 0 ? (

          <div className="col-span-full">

            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">

              <ListVideo
                size={60}
                className="mb-6 text-zinc-700"
              />

              <h2 className="text-2xl font-semibold text-white">
                No Playlists Yet
              </h2>

              <p className="mt-3 max-w-md text-center text-zinc-500">
                Create your first playlist to organize your favorite videos.
              </p>

            </div>

          </div>

        ) : (

          playlists.map((playlist) => (

            <div
              key={playlist._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700"
            >

              <div className="mb-4 flex items-center justify-between">

                <ListVideo
                  size={26}
                  className="text-white"
                />

                <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  {playlist?.videos?.length || 0} Videos
                </span>

              </div>

              <h3 className="text-xl font-semibold text-white">
                {playlist.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                {playlist.description}
              </p>

              <div className="mt-6 flex gap-3">

                <button className="flex-1 rounded-xl bg-white py-3 font-medium text-black transition hover:bg-zinc-200">
                  Open
                </button>

                <button className="rounded-xl border border-red-500 px-4 text-red-500 transition hover:bg-red-500 hover:text-white">
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Create Playlist Modal */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Create Playlist
            </h2>

            <input
              type="text"
              placeholder="Playlist Name"
              className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            />

            <textarea
              rows={4}
              placeholder="Description"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none"
            />

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
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