import { Edit, Users, Video } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <section className="space-y-8">

      {/* Cover Image */}

      <div className="relative h-72 overflow-hidden rounded-3xl bg-zinc-900">

        <img
          src={
            user?.coverImage ||
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          }
          alt="Cover"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

      </div>

      {/* User Info */}

      <div className="-mt-24 flex flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between">

        <div className="flex items-end gap-6">

          <img
            src={user?.avatar}
            alt={user?.fullName}
            className="h-40 w-40 rounded-full border-4 border-[#09090B] object-cover"
          />

          <div>

            <h1 className="text-4xl font-bold text-white">
              {user?.fullName}
            </h1>

            <p className="mt-2 text-zinc-400">
              @{user?.username}
            </p>

            <div className="mt-5 flex flex-wrap gap-6">

              <div className="flex items-center gap-2 text-zinc-300">

                <Users size={18} />

                <span>0 Subscribers</span>

              </div>

              <div className="flex items-center gap-2 text-zinc-300">

                <Video size={18} />

                <span>0 Videos</span>

              </div>

            </div>

          </div>

        </div>

        <button
          className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          <Edit size={18} />

          Edit Profile
        </button>

      </div>

      {/* Tabs */}

      <div className="border-b border-zinc-800">

        <div className="flex gap-10">

          <button className="border-b-2 border-white pb-4 font-medium text-white">
            Videos
          </button>

          <button className="pb-4 text-zinc-500 hover:text-white">
            Playlists
          </button>

          <button className="pb-4 text-zinc-500 hover:text-white">
            About
          </button>

        </div>

      </div>
            {/* Content */}

      <div className="min-h-[400px]">

        {/* Empty Videos */}

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">

          <Video
            size={60}
            className="mb-6 text-zinc-700"
          />

          <h2 className="text-2xl font-semibold text-white">
            No Videos Yet
          </h2>

          <p className="mt-3 max-w-md text-center text-zinc-500">
            Upload your first video and start
            growing your audience.
          </p>

        </div>

        {/* Playlist Section */}

        <div className="hidden">
          {/* Playlist Grid */}
        </div>

        {/* About */}

        <div className="hidden space-y-6">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-4 text-xl font-semibold text-white">
              About Channel
            </h2>

            <p className="leading-8 text-zinc-400">
              {user?.bio ||
                "No channel description added yet."}
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="text-lg font-semibold text-white">
                Email
              </h3>

              <p className="mt-3 text-zinc-400">
                {user?.email}
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="text-lg font-semibold text-white">
                Joined
              </h3>

              <p className="mt-3 text-zinc-400">
                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "--"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Profile;