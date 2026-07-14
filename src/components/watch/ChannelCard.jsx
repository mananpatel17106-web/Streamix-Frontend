import { motion } from "framer-motion";

const ChannelCard = ({
  channel,
  isSubscribed = false,
  onSubscribe,
}) => {
  if (!channel) return null;

  const formatSubscribers = (count = 0) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }

    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }

    return count;
  };

  return (
    <section className="mt-8 flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={channel.avatar}
          alt={channel.username}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-zinc-700"
        />

        <div>
          <h3 className="text-lg font-semibold text-white">
            {channel.fullName}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            @{channel.username}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {formatSubscribers(channel.subscribersCount)} subscribers
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
        onClick={onSubscribe}
        className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
          isSubscribed
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "bg-white text-black hover:bg-zinc-200"
        }`}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </motion.button>
    </section>
  );
};

export default ChannelCard;