import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPlaylists,
  createPlaylist,
  deletePlaylist,
} from "../../../../cielo/lovable/src/features/playlists/playlistSlice";
import { Link } from "react-router-dom";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function Playlists() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const { list } = useSelector((s) => s.playlists);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (user) dispatch(fetchUserPlaylists(user._id));
  }, [dispatch, user]);

  const create = async (e) => {
    e.preventDefault();
    const r = await dispatch(createPlaylist(form));
    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Created");
      setForm({ name: "", description: "" });
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Playlists</h1>
      <form
        onSubmit={create}
        className="card p-5 flex flex-col md:flex-row gap-3 mb-8">
        <input
          required
          className="input flex-1"
          placeholder="Playlist name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input flex-1"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Create
        </button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <div
            key={p._id}
            className="card p-5 flex items-start justify-between gap-3">
            <Link to={`/playlist/${p._id}`} className="min-w-0 flex-1">
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-muted truncate">{p.description}</div>
              <div className="text-xs text-muted mt-1">
                {p.videos?.length || 0} videos
              </div>
            </Link>
            <button
              onClick={() => dispatch(deletePlaylist(p._id))}
              className="text-muted hover:text-primary-soft">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
