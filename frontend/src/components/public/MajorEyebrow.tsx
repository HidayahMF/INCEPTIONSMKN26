import { Children, type ReactNode } from "react";

type MajorCode = "KGS" | "TEK" | "TITL" | "TFLM" | "TKR" | "SIJA";

const majorColors: Record<MajorCode, { foreground: string; background: string }> = {
  KGS: { foreground: "#D40009", background: "#FFF0F0" },
  TEK: { foreground: "#004E9E", background: "#EEF6FF" },
  TITL: { foreground: "#F5A900", background: "#FFF8E1" },
  TFLM: { foreground: "#AB0001", background: "#FFF0F0" },
  TKR: { foreground: "#575757", background: "#F1F3F5" },
  SIJA: { foreground: "#FF7700", background: "#FFF3E8" },
};

export function MajorEyebrow({ code, children }: { code: MajorCode; children: ReactNode }) {
  const colors = majorColors[code];
  return (
    <span data-aos="fade-up" className="inline-flex items-center gap-2 rounded-full px-3 py-[5px] text-[14px] font-semibold not-italic leading-[21px] tracking-[0%] align-middle shadow-[0_4px_16px_rgba(15,23,42,.08)]" style={{ color: colors.foreground, backgroundColor: colors.background }}>
      <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
      {Children.toArray(children).filter((child) => typeof child === "string")}
    </span>
  );
}
