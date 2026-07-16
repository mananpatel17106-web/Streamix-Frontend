import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../cielo/lovable/src/features/auth/authSlice";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((s) => s.auth);
  const loading = status === "loading";

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ identifier, password }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Welcome back!");
      navigate(location.state?.from?.pathname || "/", { replace: true });
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
            Welcome back to the stream.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Pick up where you left off — new drops from creators you follow.
          </p>
        </div>
        <div className="w-full">
          <div className="mx-auto w-full max-w-md card p-8 shadow-elevated">
            <h2 className="font-display text-2xl font-bold">Sign in</h2>
            <p className="mt-1 text-sm text-muted">
              Use your username or email.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block">
                <span className="label">Username or email</span>
                <input
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="label">Password</span>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="••••••••"
                />
              </label>
              {error && (
                <div className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs text-primary-soft">
                  {error}
                </div>
              )}
              <button disabled={loading} className="btn-primary w-full h-11">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />} Sign
                in
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-muted">
              New to Streamix?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary-soft hover:underline">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
