import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
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
        <span className={`truncate ${name ? "text-white" : "text-zinc-400"}`}>
          {name || "Choose file"}
        </span>
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
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setFullNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setAvatarError("");
    setServerError("");

    if (!form.fullName.trim()) {
      setFullNameError("Full name is required");
      return;
    }

    if (!form.username.trim()) {
      setUsernameError("Username is required");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      setUsernameError(
        "Username can contain only letters, numbers and underscore",
      );
      return;
    }

    if (!form.email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (!form.password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    if (form.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (!avatar) {
      setAvatarError("Avatar is required");
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
      const message = res.payload || "Registration failed";

      if (message.toLowerCase().includes("username")) {
        setUsernameError(message);
      } else if (message.toLowerCase().includes("email")) {
        setEmailError(message);
      } else {
        setServerError(message);
      }
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
                    onChange={(e) => {
                      setForm({
                        ...form,
                        fullName: e.target.value,
                      });

                      setFullNameError("");
                      setServerError("");
                    }}
                  />
                  {fullNameError && (
                    <p className="mt-1 text-sm text-red-500">{fullNameError}</p>
                  )}
                </label>

                <label className="block">
                  <span className="label">Username</span>
                  <input
                    required
                    className="input"
                    value={form.username}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        username: e.target.value
                          .toLowerCase()
                          .replace(/\s/g, ""),
                      });

                      setUsernameError("");
                      setServerError("");
                    }}
                  />
                  {usernameError && (
                    <p className="mt-1 text-sm text-red-500">{usernameError}</p>
                  )}
                </label>
              </div>
              <label className="block">
                <span className="label">Email</span>
                <input
                  required
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      email: e.target.value.trim(),
                    });

                    setEmailError("");
                    setServerError("");
                  }}
                />
                {eamilError && (
                  <p className="mt-1 text-sm text-red-500">{eamilError}</p>
                )}
              </label>

              <label className="block">
                <span className="label">Password</span>
                <input
                  required
                  type="password"
                  className="input"
                  value={form.password}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      password: e.target.value,
                    });

                    setPasswordError("");
                    setServerError("");
                  }}
                />
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      <div
                        className={`h-1 flex-1 rounded ${
                          form.password.length >= 8
                            ? "bg-green-500"
                            : "bg-zinc-700"
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded ${
                          form.password.length >= 10
                            ? "bg-green-500"
                            : "bg-zinc-700"
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded ${
                          /[A-Z]/.test(form.password) &&
                          /[0-9]/.test(form.password)
                            ? "bg-green-500"
                            : "bg-zinc-700"
                        }`}
                      />
                    </div>

                    <p className="mt-1 text-xs text-zinc-400">
                      Minimum 8 characters, 1 uppercase letter and 1 number.
                    </p>
                  </div>
                )}
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
              </label>

              <div className="grid grid-cols-2 gap-3">
                <FileField label="Avatar" required onChange={setAvatar} />
                {avatarError && (
                  <p className="text-sm text-red-500">{avatarError}</p>
                )}
                <FileField label="Cover image" onChange={setCoverImage} />
              </div>

              {serverError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full h-11 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Channel"
                )}
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
