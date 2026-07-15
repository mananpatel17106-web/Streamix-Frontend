import { Save, Shield, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const Settings = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      username: user?.username || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // update profile api
  };

  return (
    <section className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage your account settings.
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* Profile */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <div className="mb-8 flex items-center gap-3">

            <User className="text-white" />

            <h2 className="text-2xl font-semibold text-white">
              Profile
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Full Name
              </label>

              <input
                {...register("fullName", {
                  required: true,
                })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Username
              </label>

              <input
                {...register("username", {
                  required: true,
                })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-zinc-400">
                Email
              </label>

              <input
                {...register("email")}
                disabled
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-400"
              />

            </div>

          </div>

        </div>
                {/* Security */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <div className="mb-8 flex items-center gap-3">

            <Shield className="text-white" />

            <h2 className="text-2xl font-semibold text-white">
              Change Password
            </h2>

          </div>

          <div className="grid gap-6">

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Current Password
              </label>

              <input
                type="password"
                {...register("oldPassword")}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                New Password
              </label>

              <input
                type="password"
                {...register("newPassword")}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <button
            type="button"
            className="rounded-xl border border-red-500 px-6 py-3 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            <Save size={18} />

            Save Changes
          </button>

        </div>

      </form>

    </section>
  );
};

export default Settings;