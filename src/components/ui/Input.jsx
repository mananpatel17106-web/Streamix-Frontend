import PropTypes from "prop-types";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  error = "",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          rounded-lg
          border
          border-neutral-700
          bg-neutral-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          duration-200
          placeholder:text-neutral-500
          focus:border-white
          focus:ring-1
          focus:ring-white
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;