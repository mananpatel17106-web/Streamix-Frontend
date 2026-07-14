import PropTypes from "prop-types";

const Spinner = ({
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-[3px]",
  };

  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-neutral-700
        border-t-white
        ${sizes[size]}
        ${className}
      `}
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default Spinner;