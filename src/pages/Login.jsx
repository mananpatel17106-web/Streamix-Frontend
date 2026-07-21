import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useSelector((s) => s.auth);
  const loading = status === "loading";
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const submit = async (e) => {
    const username = identifier.trim();
    const pass = password.trim();

    if (!username) {
      setIdentifierError("Username or email is required");
      return;
    }

    if (!pass) {
      setPasswordError("Password is required");
      return;
    }
    e.preventDefault();

    setIdentifierError("");
    setPasswordError("");
    setServerError("");

    const res = await dispatch(
      loginUser({
        identifier: username,
        password: pass,
      }),
    );

    if (loginUser.fulfilled.match(res)) {
      toast.success("Welcome back!");
      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
      return;
    }

    const message = res.payload || "Login failed";

    if (
      message.toLowerCase().includes("username") ||
      message.toLowerCase().includes("email") ||
      message.toLowerCase().includes("does not exist")
    ) {
      setIdentifierError(message);
    } else if (message.toLowerCase().includes("password")) {
      setPasswordError(message);
    } else {
      setServerError(message);
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
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setIdentifierError("");
                    setServerError("");
                  }}
                  className={`input ${
                    identifierError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="you@example.com"
                />
                {identifierError && (
                  <p className="mt-1 text-sm text-red-500">{identifierError}</p>
                )}
              </label>
              <label className="block">
                <span className="label">Password</span>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                    setServerError("");
                  }}
                  className="input"
                  placeholder="••••••••"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
              </label>
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
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
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
