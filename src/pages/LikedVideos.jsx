import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/ui/Loader";
import VideoCard from "../components/video/VideoCard";

import {
  getLikedVideos,
} from "../store/slices/likeSlice";

const LikedVideos = () => {
  const dispatch = useDispatch();

  const {
    likedVideos,
    loading,
  } = useSelector(
    (state) => state.like
  );

  useEffect(() => {
    dispatch(getLikedVideos());
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

          Liked Videos

        </h1>

        <p className="mt-2 text-zinc-500">

          Videos you've liked.

        </p>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {likedVideos?.length === 0 ? (

          <div className="col-span-full">

            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">

              <Heart
                size={60}
                className="mb-6 text-zinc-700"
              />

              <h2 className="text-2xl font-semibold text-white">

                No Liked Videos

              </h2>

              <p className="mt-3 max-w-md text-center text-zinc-500">

                Like your favorite videos to see them here.

              </p>

            </div>

          </div>

        ) : (

          likedVideos.map((item) => (

            <VideoCard
              key={item.video._id}
              video={item.video}
            />

          ))

        )}

      </div>

    </section>
  );
};

export default LikedVideos;