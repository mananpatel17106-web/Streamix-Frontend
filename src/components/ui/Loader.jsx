import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Loader = ({
  text = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`
        flex
        items-center
        justify-center
        gap-3
        ${
          fullScreen
            ? "min-h-screen"
            : "py-8"
        }
      `}
    >
      <Spinner />

      <span className="text-sm text-neutral-400">
        {text}
      </span>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loader;