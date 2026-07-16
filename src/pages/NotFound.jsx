import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center">
      <div>
        <div className="font-display text-7xl font-bold text-gradient">404</div>
        <p className="mt-2 text-muted">This page doesn't exist.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Go home</Link>
      </div>
    </div>
  );
}
