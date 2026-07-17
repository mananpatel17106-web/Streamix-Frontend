import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  updateAccount,
  updateAvatar,
  updateCoverImage,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [pw, setPw] = useState({ oldPassword: "", newPassword: "" });

  if (!user) return null;

  const saveAccount = async (e) => {
    e.preventDefault();
    const r = await dispatch(updateAccount(form));
    if (r.meta.requestStatus === "fulfilled") toast.success("Profile updated");
  };
  const savePw = async (e) => {
    e.preventDefault();
    const r = await dispatch(changePassword(pw));
    if (r.meta.requestStatus === "fulfilled") {
      toast.success("Password updated");
      setPw({ oldPassword: "", newPassword: "" });
    } else toast.error(r.payload || "Failed");
  };
  const doAvatar = async (f) => {
    const r = await dispatch(updateAvatar(f));
    if (r.meta.requestStatus === "fulfilled") toast.success("Avatar updated");
  };
  const doCover = async (f) => {
    const r = await dispatch(updateCover(f));
    if (r.meta.requestStatus === "fulfilled") toast.success("Cover updated");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-display text-3xl font-bold">Profile settings</h1>
      <section className="card p-6 flex items-center gap-6">
        <img
          src={user.avatar}
          className="w-20 h-20 rounded-full object-cover"
          alt=""
        />
        <div className="space-y-2">
          <label className="btn-ghost inline-flex cursor-pointer">
            Change avatar
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && doAvatar(e.target.files[0])
              }
            />
          </label>
          <label className="btn-ghost inline-flex cursor-pointer ml-2">
            Change cover
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && doCover(e.target.files[0])
              }
            />
          </label>
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
      <form onSubmit={savePw} className="card p-6 space-y-4">
        <h2 className="font-display font-bold">Change password</h2>
        <label className="block">
          <span className="label">Current password</span>
          <input
            type="password"
            required
            className="input"
            value={pw.oldPassword}
            onChange={(e) => setPw({ ...pw, oldPassword: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="label">New password</span>
          <input
            type="password"
            required
            className="input"
            value={pw.newPassword}
            onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
          />
        </label>
        <button className="btn-primary">Update password</button>
      </form>
    </div>
  );
}
