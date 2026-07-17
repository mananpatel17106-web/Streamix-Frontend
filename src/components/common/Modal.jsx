import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
}) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widthClass =
    {
      sm: "max-w-md",
      md: "max-w-xl",
      lg: "max-w-3xl",
      xl: "max-w-5xl",
      full: "max-w-7xl",
    }[size] || "max-w-xl";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => {
        if (closeOnOverlay) {
          onClose?.();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${widthClass} overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl`}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            {title ? (
              <h2 className="text-lg font-semibold text-white">
                {title}
              </h2>
            ) : (
              <div />
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}