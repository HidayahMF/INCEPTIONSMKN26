import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number | null;
};

type Toast = ToastInput & { id: number };
type ToastContextValue = {
  addToast: (toast: ToastInput) => number;
  dismissToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
let nextToastId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);
  const addToast = useCallback((input: ToastInput) => {
    const id = nextToastId++;
    const toast: Toast = { ...input, id, variant: input.variant || "info" };
    setToasts((current) => [...current, toast].slice(-4));
    return id;
  }, []);
  const value = useMemo(() => ({ addToast, dismissToast }), [addToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

function ToastViewport({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="portal-main-center pointer-events-none fixed inset-x-4 top-[92px] z-[120] flex max-w-none flex-col gap-3 sm:top-[92px] sm:left-1/2 sm:right-auto sm:w-[min(420px,calc(100vw-32px))] sm:-translate-x-1/2" aria-label="Notifikasi">
      {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />)}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const [leaving, setLeaving] = useState(false);
  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => onDismiss(toast.id), 160);
  }, [leaving, onDismiss, toast.id]);
  useEffect(() => {
    const duration = toast.duration === undefined
      ? toast.variant === "error" ? null : 4500
      : toast.duration;
    if (duration === null || duration === 0) return;
    const timer = window.setTimeout(dismiss, duration);
    return () => window.clearTimeout(timer);
  }, [dismiss, toast.duration, toast.variant]);

  const config: Record<ToastVariant, { icon: string; color: string; background: string }> = {
    success: { icon: "✓", color: "#16864b", background: "#effbf4" },
    error: { icon: "!", color: "#b42332", background: "#fff3f4" },
    warning: { icon: "!", color: "#9a6700", background: "#fffaf0" },
    info: { icon: "i", color: "#006cdc", background: "#f1f8ff" },
  };
  const style = config[toast.variant || "info"];
  return (
    <div className={`toast-${leaving ? "exit" : "enter"} pointer-events-auto flex items-start gap-3 rounded-[14px] border border-[#dce8f5] bg-white p-3.5 shadow-[0_14px_36px_rgba(20,47,90,.16)]`} role={toast.variant === "error" ? "alert" : "status"} aria-live={toast.variant === "error" ? "assertive" : "polite"}>
      <span className="grid size-8 shrink-0 place-items-center rounded-full text-[14px] font-bold" style={{ color: style.color, backgroundColor: style.background }} aria-hidden="true">{style.icon}</span>
      <span className="min-w-0 flex-1 pt-0.5">
        <strong className="block text-[12px] font-semibold leading-5 text-ink">{toast.title}</strong>
        {toast.description && <span className="mt-0.5 block text-[11px] leading-4 text-muted">{toast.description}</span>}
      </span>
      <button type="button" onClick={dismiss} className="grid size-7 shrink-0 place-items-center rounded-lg text-[18px] leading-none text-[#7890ad] transition hover:bg-[#f1f6fb] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Tutup notifikasi">×</button>
    </div>
  );
}
