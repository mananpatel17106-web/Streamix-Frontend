import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  updateAccount,
  updateAvatar,
  updateCoverImage,
  changePassword,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [pw, setPw] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPw, setShowPw] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  if (!user) return null;

  const saveAccount = async (e) => {
    e.preventDefault();
    const r = await dispatch(updateAccount(form));
    if (r.meta.requestStatus === "fulfilled") toast.success("Profile updated");
  };
  const savePw = async (e) => {
    e.preventDefault();

    if (pw.newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (pw.newPassword !== pw.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const r = await dispatch(changePassword(pw));

    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Password changed successfully");

      setPw({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error(r.payload || "Failed to change password");
    }
  };
  const doAvatar = async (f) => {
    const r = await dispatch(updateAvatar(f));
    if (r.meta.requestStatus === "fulfilled"){ 
      await dispatch(fetchCurrentUser());
      toast.success("Avatar updated");
    }
    await dispatch(fetchCurrentUser());
  };
  const doCover = async (f) => {
    const r = await dispatch(updateCover(f));
    if (r.meta.requestStatus === "fulfilled"){
      await dispatch(fetchCurrentUser());
      toast.success("CoverImage updated");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-display text-3xl font-bold">Profile settings</h1>
      <section className="card overflow-hidden p-0">
        {/* Cover */}

        <div className="relative h-52 w-full bg-zinc-800">
          <img
            src={
              user.coverImage ||
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
            }
            alt="Cover"
            className="h-full w-full object-cover"
          />

          <label className="absolute right-4 top-4 cursor-pointer rounded-lg bg-black/70 px-4 py-2 text-sm text-white backdrop-blur hover:bg-black">
            Change Cover
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && doCover(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* Avatar */}

        <div className="relative -mt-12 flex items-end gap-5 px-6 pb-6">
          <img
            src={user.avatar}
            alt=""
            className="h-28 w-28 rounded-full border-4 border-zinc-900 object-cover"
          />

          <div>
            <label className="btn-ghost cursor-pointer">
              Change Avatar
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && doAvatar(e.target.files[0])
                }
              />
            </label>
          </div>
        </div>
      </section>
      <form onSubmit={saveAccount} className="card p-6 space-y-4">
        <h2 className="font-display font-bold">Account details</h2>
        <label className="block">
          <span className="label">Full name</span>
          <input
            className="input"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <button className="btn-primary">Save changes</button>
      </form>
      <form onSubmit={savePw} className="card p-6 space-y-5">
        <h2 className="font-display text-xl font-bold">Change Password</h2>

        <label className="block">
          <span className="label">Current Password</span>

          <div className="relative">
            <input
              type={showPw.current ? "text" : "password"}
              required
              className="input pr-12"
              value={pw.oldPassword}
              onChange={(e) =>
                setPw({
                  ...pw,
                  oldPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              onClick={() =>
                setShowPw({
                  ...showPw,
                  current: !showPw.current,
                })
              }>
              {showPw.current ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="label">New Password</span>

          <div className="relative">
            <input
              type={showPw.next ? "text" : "password"}
              required
              minLength={8}
              className="input pr-12"
              value={pw.newPassword}
              onChange={(e) =>
                setPw({
                  ...pw,
                  newPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              onClick={() =>
                setShowPw({
                  ...showPw,
                  next: !showPw.next,
                })
              }>
              {showPw.next ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="label">Confirm Password</span>

          <div className="relative">
            <input
              type={showPw.confirm ? "text" : "password"}
              required
              minLength={8}
              className="input pr-12"
              value={pw.confirmPassword}
              onChange={(e) =>
                setPw({
                  ...pw,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
              onClick={() =>
                setShowPw({
                  ...showPw,
                  confirm: !showPw.confirm,
                })
              }>
              {showPw.confirm ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button className="btn-primary w-fit">Update Password</button>
      </form>
    </div>
  );
}
