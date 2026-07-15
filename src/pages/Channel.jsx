import { useEffect } from "react";
import { Users, PlaySquare, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from "../components/ui/Loader";
import VideoCard from "../components/video/VideoCard";

import { getChannelProfile } from "../store/slices/subscriptionSlice";
import { getVideos } from "../store/slices/videoSlice";

const Channel = () => {
  const { username } = useParams();

  const dispatch = useDispatch();

  const { channel, loading } = useSelector((state) => state.subscription);

  const { videos } = useSelector((state) => state.video);

  useEffect(() => {
    if (!username) return;

    dispatch(getChannelProfile(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (!channel?._id) return;

    dispatch(
      getVideos({
        userId: channel._id,
        page: 1,
        limit: 50,
      }),
    );
  }, [dispatch, channel]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-zinc-800">
        <img
          src={channel?.coverImage}
          alt=""
          className="h-72 w-full object-cover"
        />

        <div className="bg-zinc-900 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <img
              src={channel?.avatar}
              alt={channel?.username}
              className="h-32 w-32 rounded-full border-4 border-zinc-800 object-cover"
            />

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white">
                {channel?.fullName}
              </h1>

              <p className="mt-2 text-zinc-400">@{channel?.username}</p>

              <div className="mt-5 flex flex-wrap gap-6 text-zinc-400">
                <span className="flex items-center gap-2">
                  <Users size={18} />
                  {channel?.subscribersCount || 0}
                  Subscribers
                </span>

                <span className="flex items-center gap-2">
                  <PlaySquare size={18} />
                  {videos.length}
                  Videos
                </span>

                <span className="flex items-center gap-2">
                  <Eye size={18} />
                  {channel?.views || 0}
                  Views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {videos.length === 0 ? (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">
              <PlaySquare size={60} className="mb-6 text-zinc-700" />

              <h2 className="text-2xl font-semibold text-white">
                No Videos Yet
              </h2>

              <p className="mt-3 max-w-md text-center text-zinc-500">
                This channel hasn't uploaded any videos yet.
              </p>
            </div>
          </div>
        ) : (
          videos.map((video) => <VideoCard key={video._id} video={video} />)
        )}
      </div>
    </section>
  );
};

export default Channel;
