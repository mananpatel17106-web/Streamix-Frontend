import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  loginUser,
  clearAuthError,
} from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    loading,
    error,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const redirectTo =
    location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, {
        replace: true,
      });
    }
  }, [
    isAuthenticated,
    navigate,
    redirectTo,
  ]);

  const onSubmit = async (data) => {
    const value = data.emailOrUsername.trim();

    const payload = {
      password: data.password,
    };

    if (value.includes("@")) {
      payload.email = value;
    } else {
      payload.username = value;
    }

    const result = await dispatch(
      loginUser(payload)
    );

    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome Back 👋");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B] px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Login to continue using Streamix
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <input
              type="text"
              placeholder="Email or Username"
              {...register("emailOrUsername", {
                required:
                  "Email or Username is required",
              })}
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white outline-none focus:border-zinc-700"
            />

            {errors.emailOrUsername && (
              <p className="mt-2 text-xs text-red-400">
                {errors.emailOrUsername.message}
              </p>
            )}

          </div>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 pr-12 text-white outline-none focus:border-zinc-700"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

            {errors.password && (
              <p className="mt-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>
                    <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-white font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />

          <span className="text-xs uppercase tracking-widest text-zinc-500">
            OR
          </span>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-white transition hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;