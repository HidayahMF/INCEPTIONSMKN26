import { useEffect, useId, useRef, useState } from "react";

type TextInputDialogProps = {
  open: boolean;
  title: string;
  description: string;
  label: string;
  initialValue?: string;
  busy?: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (value: string) => void | Promise<void>;
};

export function TextInputDialog({
  open,
  title,
  description,
  label,
  initialValue = "",
  busy = false,
  error,
  onClose,
  onSubmit,
}: TextInputDialogProps) {
  const [value, setValue] = useState(initialValue);
  const dialogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    if (!open) return;
    setValue(initialValue);
    requestAnimationFrame(() => textareaRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) {
        event.preventDefault();
        onClose();
      }
      if (
        event.key === "Tab" &&
        dialogRef.current &&
        document.activeElement === textareaRef.current &&
        event.shiftKey
      ) {
        event.preventDefault();
        dialogRef.current.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, initialValue, onClose, open]);
  if (!open) return null;
  return (
    <div
      className="portal-modal-backdrop fixed inset-0 z-[130] grid place-items-center bg-[#07152b]/55 p-4"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="portal-modal-panel max-h-[calc(100dvh-2rem)] w-full max-w-[390px] overflow-y-auto rounded-[20px] bg-white p-7 shadow-[0_24px_70px_rgba(7,35,72,.24)]"
      >
        <h2
          id={titleId}
          className="text-[19px] font-bold leading-6 text-[#0B1324]"
        >
          {title}
        </h2>
        <p
          id={descriptionId}
          className="mt-3 text-[14px] leading-6 text-[#5B6B8C]"
        >
          {description}
        </p>
        <label className="mt-5 grid gap-2 text-[12px] font-semibold text-[#0B1324]">
          <span>{label}</span>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={busy}
            className="min-h-32 resize-y rounded-xl border border-[#cbd9ea] p-3 text-[13px] font-normal outline-none focus:border-primary focus:ring-4 focus:ring-[#d7edff] disabled:bg-[#f5f8fc]"
          />
        </label>
        {error && (
          <p role="alert" className="mt-2 text-[12px] text-[#b42332]">
            {error}
          </p>
        )}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="min-h-11 flex-1 rounded-xl border border-[#cbd5e1] bg-white px-3 text-[13px] font-semibold text-[#52658a] disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={busy || !value.trim()}
            onClick={() => void onSubmit(value.trim())}
            className="min-h-11 flex-1 rounded-xl bg-[#0092FF] px-3 text-[13px] font-semibold text-white disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Memproses..." : "Kirim Respons"}
          </button>
        </div>
      </div>
    </div>
  );
}
