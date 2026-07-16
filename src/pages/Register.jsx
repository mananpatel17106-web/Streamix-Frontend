import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../cielo/lovable/src/features/auth/authSlice";
import { Sparkles, Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";

function FileField({ label, onChange, required }) {
  const [name, setName] = useState(null);
  return (
    <label className="block cursor-pointer">
      <span className="label">
        {label} {required && <span className="text-primary-soft">*</span>}
      </span>
      <div className="flex h-11 items-center gap-2 rounded-xl border border-dashed border-border bg-surface/40 px-3 text-xs text-muted hover:bg-surface/70">
        <Upload className="w-4 h-4" />
        <span className="truncate">{name || "Choose file"}</span>
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] || null;
          setName(f?.name || null);
          onChange(f);
        }}
      />
    </label>
  );
}

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!avatar) {
      setError("Avatar is required.");
      return;
    }
    setLoading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("avatar", avatar);
    if (coverImage) fd.append("coverImage", coverImage);
    const res = await dispatch(registerUser(fd));
    setLoading(false);
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Account created — sign in to continue.");
      navigate("/login");
    } else {
      setError(res.payload || "Registration failed.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">Streamix</span>
          </Link>
          <h1 className="mt-10 font-display text-5xl font-bold leading-[1.05] text-gradient">
            Bring your work to the big stream.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Upload in minutes, keep 100% of your uploads, and reach a growing
            community.
          </p>
        </div>
        <div className="w-full">
          <div className="mx-auto w-full max-w-md card p-8 shadow-elevated">
            <h2 className="font-display text-2xl font-bold">
              Create your channel
            </h2>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="label">Full name</span>
                  <input
                    required
                    className="input"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                  />
                </label>
                <label className="block">
                  <span className="label">Username</span>
                  <input
                    required
                    className="input"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </label>
              </div>
              <label className="block">
                <span className="label">Email</span>
                <input
                  required
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="label">Password</span>
                <input
                  required
                  type="password"
                  className="input"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <FileField label="Avatar" required onChange={setAvatar} />
                <FileField label="Cover image" onChange={setCoverImage} />
              </div>
              {error && (
                <div className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs text-primary-soft">
                  {error}
                </div>
              )}
              <button disabled={loading} className="btn-primary w-full h-11">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Create
                channel
              </button>
            </form>
            <div className="mt-5 text-center text-sm text-muted">
              Already on Streamix?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary-soft hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
