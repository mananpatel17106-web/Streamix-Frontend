import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getAllVideos } from "../features/video/videoSlice";

import CategoryBar from "../components/explore/CategoryBar";
import ExploreGrid from "../components/explore/ExploreGrid";
import ExploreSkeleton from "../components/explore/ExploreSkeleton";

const categories = [
  "All",
  "Programming",
  "Music",
  "Gaming",
  "AI",
  "News",
  "Sports",
  "Movies",
  "Education",
  "Live",
];

export default function Explore() {
  const dispatch = useDispatch();

  const { videos = [], isLoading } = useSelector(
    (state) => state.video
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getAllVideos({
        page: 1,
        limit: 50,
      })
    );
  }, [dispatch]);

  const filteredVideos = useMemo(() => {
    let list = [...videos];

    if (activeCategory !== "All") {
      list = list.filter((video) =>
        (
          video.category ||
          video.title ||
          ""
        )
          .toLowerCase()
          .includes(activeCategory.toLowerCase())
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter((video) => {
        const title = video.title?.toLowerCase() || "";
        const owner =
          video.owner?.fullName?.toLowerCase() || "";

        return (
          title.includes(q) ||
          owner.includes(q)
        );
      });
    }

    return list;
  }, [videos, activeCategory, search]);

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">
        <Compass className="text-primary" size={28} />
        <div>
          <h1 className="text-3xl font-bold text-white">
            Explore
          </h1>
          <p className="text-sm text-zinc-400">
            Discover videos from different categories.
          </p>
        </div>
      </div>

      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
      />

      {isLoading ? (
        <ExploreSkeleton />
      ) : (
        <ExploreGrid videos={filteredVideos} />
      )}

    </div>
  );
}