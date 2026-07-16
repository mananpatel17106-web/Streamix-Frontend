export default function Loader({ label = "Loading…" }) {
  return (
    <div className="flex items-center justify-center py-16 text-muted text-sm gap-3">
      <span className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      {label}
    </div>
  );
}
