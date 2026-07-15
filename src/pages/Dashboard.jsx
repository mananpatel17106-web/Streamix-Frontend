import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  Heart,
  Users,
  Video,
} from "lucide-react";

import Loader from "../components/ui/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const { loading } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    // Dashboard API
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Creator Dashboard
        </h1>

        <p className="mt-2 text-zinc-500">
          Welcome back, {user?.fullName}
        </p>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <Eye
            size={28}
            className="mb-5 text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white">
            0
          </h2>

          <p className="mt-2 text-zinc-500">
            Total Views
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <Heart
            size={28}
            className="mb-5 text-red-400"
          />

          <h2 className="text-3xl font-bold text-white">
            0
          </h2>

          <p className="mt-2 text-zinc-500">
            Total Likes
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <Users
            size={28}
            className="mb-5 text-green-400"
          />

          <h2 className="text-3xl font-bold text-white">
            0
          </h2>

          <p className="mt-2 text-zinc-500">
            Subscribers
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <Video
            size={28}
            className="mb-5 text-yellow-400"
          />

          <h2 className="text-3xl font-bold text-white">
            0
          </h2>

          <p className="mt-2 text-zinc-500">
            Videos
          </p>

        </div>

      </div>
            {/* Recent Videos */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-white">
            Recent Videos
          </h2>

          <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:bg-zinc-800">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-800 text-left text-zinc-400">

                <th className="pb-4">Title</th>

                <th className="pb-4">Views</th>

                <th className="pb-4">Likes</th>

                <th className="pb-4">Status</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan={4}
                  className="py-12 text-center text-zinc-500"
                >
                  No videos uploaded yet.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid gap-6 md:grid-cols-3">

        <button className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-zinc-700">

          <h3 className="text-lg font-semibold text-white">
            Upload Video
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Publish a new video to your channel.
          </p>

        </button>

        <button className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-zinc-700">

          <h3 className="text-lg font-semibold text-white">
            Manage Playlists
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Organize videos into playlists.
          </p>

        </button>

        <button className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-zinc-700">

          <h3 className="text-lg font-semibold text-white">
            Edit Profile
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Update your channel information.
          </p>

        </button>

      </div>

    </section>
  );
};

export default Dashboard;