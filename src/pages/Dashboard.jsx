import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Upload, Eye, Users, Heart, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchChannelStats,
  fetchChannelVideos,
} from "../features/dashboard/dashboardSlice";

import DashboardVideoCard from "../components/dashboard/DashboardVideoCard";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { stats, videos, loading } = useSelector((state) => state.dashboard);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    dispatch(getChannelStats());
    dispatch(getChannelVideos());
  }, [dispatch]);

  const filteredVideos = useMemo(() => {
    let list = [...videos];

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter((video) => video.title.toLowerCase().includes(q));
    }

    if (status !== "all") {
      list = list.filter((video) =>
        status === "public" ? video.isPublished : !video.isPublished,
      );
    }

    switch (sort) {
      case "views":
        list.sort((a, b) => b.views - a.views);
        break;

      case "oldest":
        list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [videos, search, sort, status]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Studio</h1>

          <p className="mt-2 text-zinc-400">Manage your content and channel.</p>
        </div>

        <Link to="/upload" className="btn-primary flex items-center gap-2">
          <Upload size={18} />
          Upload Video
        </Link>
      </div>

      {/* Stats */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Views"
          value={stats?.totalViews || 0}
          icon={<Eye size={22} />}
        />

        <StatCard
          title="Subscribers"
          value={stats?.totalSubscribers || 0}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Videos"
          value={stats?.totalVideos || 0}
          icon={<Video size={22} />}
        />

        <StatCard
          title="Likes"
          value={stats?.totalLikes || 0}
          icon={<Heart size={22} />}
        />
      </div>

      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-5 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            placeholder="Search your videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-3 pl-11 pr-4 text-white outline-none focus:border-primary"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white">
          <option value="latest">Latest</option>
          <option value="views">Most Viewed</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white">
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Videos */}

      <div>
        <h2 className="mb-5 text-2xl font-semibold text-white">Your Videos</h2>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="space-y-5">
            {filteredVideos.map((video) => (
              <DashboardVideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="text-sm uppercase tracking-wider text-zinc-500">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-white">{value}</h2>
    </div>
  );
}
