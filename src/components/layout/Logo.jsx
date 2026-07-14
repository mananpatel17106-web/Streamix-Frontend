import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
        <Play
          size={20}
          className="fill-black text-black"
        />
      </div>

      <span className="text-2xl font-bold tracking-tight">
        Streamix
      </span>
    </Link>
  );
};

export default Logo;