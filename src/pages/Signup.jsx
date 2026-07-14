import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    /*
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      if(data.coverImage?.length){
          formData.append("coverImage", data.coverImage[0]);
      }

      dispatch(registerUser(formData))
    */
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B] px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Join Streamix today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", {
              required: "Full name is required",
            })}
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white outline-none focus:border-zinc-700"
          />

          {errors.fullName && (
            <p className="text-xs text-red-400">
              {errors.fullName.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white outline-none focus:border-zinc-700"
          />

          {errors.username && (
            <p className="text-xs text-red-400">
              {errors.username.message}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white outline-none focus:border-zinc-700"
          />

          {errors.email && (
            <p className="text-xs text-red-400">
              {errors.email.message}
            </p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 pr-12 text-white outline-none focus:border-zinc-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-400">
              Password must be at least 8 characters.
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Avatar
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "Avatar is required",
              })}
              className="block w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-black"
            />

            {errors.avatar && (
              <p className="mt-2 text-xs text-red-400">
                {errors.avatar.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Cover Image (Optional)
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="block w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-black"
            />
          </div>

          <button
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-white font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;