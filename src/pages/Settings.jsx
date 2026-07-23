import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Lock, Image, Shield, Save } from "lucide-react";
import toast from "react-hot-toast";

import {
  updateAccount,
  changePassword,
  updateAvatar,
  updateCoverImage,
  logoutUser,
} from "../features/auth/authSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status } = useSelector((state) => state.auth);

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

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

  useEffect(() => {
    if (!user) return;

    setAccount({
      fullName: user.fullName || "",
      username: user.username || "",
      email: user.email || "",
    });
  }, [user]);

  const hasChanges =
    account.fullName !== (user?.fullName || "") ||
    account.username !== (user?.username || "");

  const handleAccountChange = (e) => {
    setAccount((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveAccount = async () => {
    try {
      await dispatch(updateAccount(account)).unwrap();
      toast.success("Account updated successfully");
    } catch (err) {
      toast.error(err);
    }
  };

  const updatePassword = async () => {
    if (password.newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await dispatch(
        changePassword({
          oldPassword: password.currentPassword,
          newPassword: password.newPassword,
        }),
      ).unwrap();

      toast.success("Password updated");

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleAvatarUpdate = async () => {
    if (!avatarFile) {
      return toast.error("Please select an avatar");
    }

    try {
      await dispatch(updateAvatar(avatarFile)).unwrap();

      toast.success("Avatar updated successfully");

      setAvatarFile(null);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCoverUpdate = async () => {
    if (!coverFile) {
      return toast.error("Please select a cover image");
    }

    try {
      await dispatch(updateCoverImage(coverFile)).unwrap();

      toast.success("Cover image updated successfully");

      setCoverFile(null);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleLogout = async () => {
    const ok = window.confirm("Are you sure you want to logout?");

    if (!ok) return;

    try {
      await dispatch(logoutUser()).unwrap();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Settings
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Manage your account, password, security and creator preferences.
        </p>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-neutral-800
          bg-neutral-900/60
          p-6
          shadow-xl
          backdrop-blur-md
        ">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-rose-500/10 p-3">
            <User size={22} className="text-rose-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Account Information</h2>

            <p className="mt-1 text-sm text-neutral-400">
              Update your personal information.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="label">Full Name</label>

            <input
              type="text"
              name="fullName"
              value={account.fullName}
              onChange={handleAccountChange}
              placeholder="Enter full name"
              className="input transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div>
            <label className="label">Username</label>

            <input
              type="text"
              name="username"
              value={account.username}
              onChange={handleAccountChange}
              placeholder="Enter username"
              className="input transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Email Address</label>

            <input
              type="email"
              value={account.email}
              disabled
              className="input cursor-not-allowed bg-[#1b1b26] opacity-60"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Email address cannot be changed.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={saveAccount}
            disabled={!hasChanges || status === "loading"}
            className="
              btn-primary
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              px-6
              font-medium
              transition-all
              hover:scale-[1.02]
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            ">
            <Save size={18} />

            {status === "loading"
              ? "Saving..."
              : hasChanges
                ? "Save Changes"
                : "Saved"}
          </button>
        </div>
      </div>

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-neutral-800
          bg-neutral-900/60
          p-6
          shadow-xl
          backdrop-blur-md
        ">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-rose-500/10 p-3">
            <Lock size={22} className="text-rose-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Change Password</h2>

            <p className="mt-1 text-sm text-neutral-400">
              Use a strong password to keep your account secure.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="label">Current Password</label>

            <input
              type="password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              className="input transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div>
            <label className="label">New Password</label>

            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="input transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Password should contain at least 8 characters.
            </p>
          </div>

          <div>
            <label className="label">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="input transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={updatePassword}
            disabled={status === "loading"}
            className="
              btn-primary
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              px-6
              font-medium
              transition-all
              hover:scale-[1.02]
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            ">
            <Shield size={18} />

            {status === "loading" ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
      {/* ================= PROFILE IMAGES ================= */}

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-neutral-800
          bg-neutral-900/60
          p-6
          shadow-xl
          backdrop-blur-md
        ">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-rose-500/10 p-3">
            <Image size={22} className="text-rose-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Profile Images</h2>

            <p className="mt-1 text-sm text-neutral-400">
              Update your avatar and cover image.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* ================= AVATAR ================= */}

          <div>
            <label className="label">Avatar</label>

            <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/40 p-6 transition-all hover:border-rose-500">
              <div className="mb-6 flex justify-center">
                <img
                  src={
                    avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar
                  }
                  alt="Avatar"
                  className="
                    h-32
                    w-32
                    rounded-full
                    border-4
                    border-neutral-800
                    object-cover
                    shadow-lg
                  "
                />
              </div>

              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    return toast.error("Please select an image");
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    return toast.error("Image must be under 5MB");
                  }

                  setAvatarFile(file);
                }}
              />

              <button
                onClick={handleAvatarUpdate}
                disabled={!avatarFile || status === "loading"}
                className="
                  btn-outline
                  mt-5
                  h-11
                  w-full
                  rounded-xl
                  transition-all
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                ">
                {status === "loading" ? "Uploading..." : "Update Avatar"}
              </button>
            </div>
          </div>

          <div>
            <label className="label">Cover Image</label>

            <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/40 p-6 transition-all hover:border-rose-500">
              <div className="mb-6 overflow-hidden rounded-2xl border border-neutral-800">
                <img
                  src={
                    coverFile
                      ? URL.createObjectURL(coverFile)
                      : user?.coverImage
                  }
                  alt="Cover"
                  className="
                    h-44
                    w-full
                    object-cover
                  "
                />
              </div>

              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    return toast.error("Please select an image");
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    return toast.error("Image must be under 5MB");
                  }

                  setCoverFile(file);
                }}
              />

              <button
                onClick={handleCoverUpdate}
                disabled={!coverFile || status === "loading"}
                className="
                  btn-outline
                  mt-5
                  h-11
                  w-full
                  rounded-xl
                  transition-all
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                ">
                {status === "loading" ? "Uploading..." : "Update Cover"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-neutral-800
          bg-neutral-900/60
          p-6
          shadow-xl
          backdrop-blur-md
        ">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Creator Preferences</h2>

          <p className="mt-2 text-sm text-neutral-400">
            Customize your default creator experience.
          </p>
        </div>

        <div className="space-y-5">
          {/* Upload Visibility */}

          <div
            className="
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-neutral-800
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">
            <div>
              <h3 className="font-medium">Default Upload Visibility</h3>

              <p className="mt-1 text-sm text-neutral-400">
                Choose visibility for newly uploaded videos.
              </p>
            </div>

            <select className="input w-full sm:w-44">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>

          {/* Email Notification */}

          <div
            className="
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-neutral-800
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">
            <div>
              <h3 className="font-medium">Email Notifications</h3>

              <p className="mt-1 text-sm text-neutral-400">
                Receive important account updates.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-rose-500"
            />
          </div>

          {/* Autoplay */}

          <div
            className="
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-neutral-800
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">
            <div>
              <h3 className="font-medium">Autoplay Videos</h3>

              <p className="mt-1 text-sm text-neutral-400">
                Automatically play next recommended video.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-rose-500"
            />
          </div>
        </div>

        <p className="mt-5 text-xs text-neutral-500">
          More creator settings will be available in future updates.
        </p>
      </div>

      <div
        className="
          mt-10
          rounded-3xl
          border
          border-red-500/30
          bg-red-500/5
          p-6
          shadow-xl
        ">
        <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>

        <p className="mt-2 text-sm text-neutral-400">
          These actions are sensitive. Proceed carefully.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handleLogout}
            className="
              rounded-xl
              border
              border-yellow-500
              px-6
              py-3
              font-medium
              text-yellow-400
              transition-all
              hover:bg-yellow-500/10
            ">
            Logout
          </button>

          <button
            disabled
            className="
              cursor-not-allowed
              rounded-xl
              border
              border-red-500
              bg-red-500/10
              px-6
              py-3
              font-medium
              text-red-400
              opacity-50
            ">
            Delete Account (Coming Soon)
          </button>
        </div>
      </div>

      <div className="mt-12 pb-10 text-center">
        <p className="text-sm font-medium text-neutral-300">
          Streamix Settings
        </p>

        <p className="mt-2 text-xs text-neutral-500">
          Manage your account securely and keep your profile up to date.
        </p>
      </div>
    </div>
  );
}
