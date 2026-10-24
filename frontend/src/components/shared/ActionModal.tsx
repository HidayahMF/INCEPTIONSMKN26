import { useEffect, useId, useRef, type ReactNode } from "react";

export type ActionModalVariant = "save" | "delete" | "warning" | "success";

const variants: Record<
  ActionModalVariant,
  { icon: string; accent: string; ring: string }
> = {
  save: {
    icon: "/assets/shared/dashboardmodalicon/simpan.png",
    accent: "#0092FF",
    ring: "rgba(0,146,255,.18)",
  },
  delete: {
    icon: "/assets/shared/dashboardmodalicon/hapus.png",
    accent: "#EF4444",
    ring: "rgba(239,68,68,.18)",
  },
  warning: {
    icon: "/assets/shared/dashboardmodalicon/warning.png",
    accent: "#F59E0B",
    ring: "rgba(245,158,11,.18)",
  },
  success: {
    icon: "/assets/shared/dashboardmodalicon/selesai.png",
    accent: "#16C763",
    ring: "rgba(22,199,99,.18)",
  },
};

type ActionModalProps = {
  open: boolean;
  variant: ActionModalVariant;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  busy?: boolean;
  children?: ReactNode;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export function ActionModal({
  open,
  variant,
  title,
  description,
  confirmLabel,
  cancelLabel = "Kembali",
  busy = false,
  children,
  onConfirm,
  onClose,
}: ActionModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const config = variants[variant];

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ) || [],
      );
    const frame = requestAnimationFrame(() => focusable()[0]?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frame);
      triggerRef.current?.focus();
    };
  }, [busy, open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#07152b]/55 p-4"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-[390px] overflow-y-auto rounded-[20px] bg-white p-7 shadow-[0_24px_70px_rgba(7,35,72,.24)] sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <img
          src={config.icon}
          alt=""
          className="mx-auto size-[78px] object-contain"
        />
        <h2
          id={titleId}
          className="mt-5 text-center text-[19px] font-bold leading-6 text-[#0B1324]"
        >
          {title}
        </h2>
        <p
          id={descriptionId}
          className="mt-3 text-center text-[14px] leading-6 text-[#5B6B8C]"
        >
          {description}
        </p>
        {children}
        <div className="mt-7 flex gap-3">
          {cancelLabel && (
            <button
              type="button"
              disabled={busy}
              onClick={onClose}
              className="min-h-11 flex-1 rounded-xl border border-[#cbd5e1] bg-white px-3 text-[13px] font-semibold text-[#52658a] transition hover:border-[#94a3b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd5e1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelLabel}
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => void onConfirm()}
            className="min-h-11 flex-1 rounded-xl px-3 text-[13px] font-semibold text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-wait disabled:opacity-60"
            style={{
              backgroundColor: config.accent,
              outlineColor: config.ring,
            }}
          >
            {busy ? "Memproses..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
