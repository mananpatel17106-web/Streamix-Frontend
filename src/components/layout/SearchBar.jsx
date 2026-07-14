import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchBar = ({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Search videos...",
}) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    onSubmit(search);
  };

  const clearInput = () => {
    setQuery("");
    onChange?.("");
    inputRef.current?.focus();
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl items-center">
      <div className="group relative flex w-full items-center">
        <Search
          size={18}
          className="absolute left-4 text-zinc-500 transition group-focus-within:text-white"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-11 pr-20 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-zinc-700 focus:bg-zinc-950"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-12 rounded-md p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-white">
            <X size={16} />
          </button>
        )}

        <div className="absolute right-3 hidden rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-[10px] font-medium text-zinc-400 md:block">
          Ctrl K
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
