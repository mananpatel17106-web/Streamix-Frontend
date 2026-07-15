import { Clock3 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/ui/Loader";
import VideoCard from "../components/video/VideoCard";

const History = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.video
  );

  const history = [];

  useEffect(() => {
    // TODO:
    // dispatch(getWatchHistory());
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

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-zinc-900 p-4">

          <Clock3
            size={28}
            className="text-white"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            Watch History
          </h1>

          <p className="mt-2 text-zinc-500">
            Videos you've watched recently.
          </p>

        </div>

      </div>

      {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">

          <Clock3
            size={60}
            className="mb-6 text-zinc-700"
          />

          <h2 className="text-2xl font-semibold text-white">
            No Watch History
          </h2>

          <p className="mt-3 max-w-md text-center text-zinc-500">
            Videos you watch will appear here.
          </p>

        </div>

      ) : (

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >

          {history.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}

        </div>

      )}

    </section>
  );
};

export default History;