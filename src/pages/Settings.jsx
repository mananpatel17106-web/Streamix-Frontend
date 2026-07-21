import { useState } from "react";
import {
  User,
  Lock,
  Image,
  Shield,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const [account, setAccount] = useState({
    fullName: "",
    username: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleAccountChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveAccount = () => {
    toast.success("Account updated successfully");
  };

  const updatePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    toast.success("Password updated successfully");
  };

  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-sm text-muted">
          Manage your account, password and profile.
        </p>
      </div>

      {/* Account */}

      <div className="card rounded-2xl p-6">

        <div className="mb-6 flex items-center gap-3">
          <User className="text-rose-500" />

          <h2 className="text-xl font-semibold">
            Account Information
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="label">
              Full Name
            </label>

            <input
              className="input"
              name="fullName"
              value={account.fullName}
              onChange={handleAccountChange}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="label">
              Username
            </label>

            <input
              className="input"
              name="username"
              value={account.username}
              onChange={handleAccountChange}
              placeholder="Enter username"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">
              Email
            </label>

            <input
              className="input opacity-70 cursor-not-allowed"
              value={account.email}
              disabled
            />
          </div>

        </div>

        <button
          onClick={saveAccount}
          className="btn-primary mt-6 flex items-center gap-2"
        >
          <Save size={18} />
          Save Changes
        </button>

      </div>
            {/* Change Password */}

      <div className="card mt-8 rounded-2xl p-6">

        <div className="mb-6 flex items-center gap-3">
          <Lock className="text-rose-500" />

          <h2 className="text-xl font-semibold">
            Change Password
          </h2>
        </div>

        <div className="grid gap-5">

          <div>
            <label className="label">
              Current Password
            </label>

            <input
              type="password"
              className="input"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current password"
            />
          </div>

          <div>
            <label className="label">
              New Password
            </label>

            <input
              type="password"
              className="input"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              placeholder="New password"
            />
          </div>

          <div>
            <label className="label">
              Confirm Password
            </label>

            <input
              type="password"
              className="input"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </div>

        </div>

        <button
          onClick={updatePassword}
          className="btn-primary mt-6 flex items-center gap-2"
        >
          <Shield size={18} />
          Update Password
        </button>

      </div>

      {/* Profile Images */}

      <div className="card mt-8 rounded-2xl p-6">

        <div className="mb-6 flex items-center gap-3">
          <Image className="text-rose-500" />

          <h2 className="text-xl font-semibold">
            Profile Images
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Avatar */}

          <div>

            <label className="label">
              Avatar
            </label>

            <div className="rounded-xl border border-dashed border-border bg-surface/40 p-6">

              <input
                type="file"
                accept="image/*"
                className="input"
              />

              <button
                className="btn-outline mt-4 w-full"
              >
                Update Avatar
              </button>

            </div>

          </div>

          {/* Cover */}

          <div>

            <label className="label">
              Cover Image
            </label>

            <div className="rounded-xl border border-dashed border-border bg-surface/40 p-6">

              <input
                type="file"
                accept="image/*"
                className="input"
              />

              <button
                className="btn-outline mt-4 w-full"
              >
                Update Cover
              </button>

            </div>

          </div>

        </div>

      </div>
            {/* Creator Preferences */}

      <div className="card mt-8 rounded-2xl p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Creator Preferences
        </h2>

        <div className="space-y-5">

          <div className="flex items-center justify-between rounded-xl border border-border p-4">

            <div>
              <h3 className="font-medium">
                Default Upload Visibility
              </h3>

              <p className="mt-1 text-sm text-muted">
                Choose the default visibility for newly uploaded videos.
              </p>
            </div>

            <select className="input w-40">
              <option>Public</option>
              <option>Private</option>
            </select>

          </div>

          <div className="flex items-center justify-between rounded-xl border border-border p-4">

            <div>
              <h3 className="font-medium">
                Email Notifications
              </h3>

              <p className="mt-1 text-sm text-muted">
                Receive important updates about your account.
              </p>
            </div>

            <input
              type="checkbox"
              className="h-5 w-5 accent-rose-500"
              defaultChecked
            />

          </div>

          <div className="flex items-center justify-between rounded-xl border border-border p-4">

            <div>
              <h3 className="font-medium">
                Autoplay Videos
              </h3>

              <p className="mt-1 text-sm text-muted">
                Automatically play the next recommended video.
              </p>
            </div>

            <input
              type="checkbox"
              className="h-5 w-5 accent-rose-500"
              defaultChecked
            />

          </div>

        </div>

      </div>

      {/* Danger Zone */}

      <div className="card mt-8 rounded-2xl border border-red-500/30 p-6">

        <h2 className="text-xl font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-muted">
          These actions are sensitive. Please proceed carefully.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">

          <button
            className="btn-outline border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
          >
            Logout
          </button>

          <button
            className="rounded-xl border border-red-500 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            Delete Account
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 text-center">

        <p className="text-sm text-muted">
          Streamix Settings
        </p>

        <p className="mt-2 text-xs text-muted">
          Manage your account securely and keep your profile up to date.
        </p>

      </div>

    </div>
  );
}