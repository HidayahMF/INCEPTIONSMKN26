import type { ReactNode } from "react";

const badgeIcon = "/assets/figma/majors/icon-section-badge.svg";

export function SectionBadge({ children, color = "#39aef2" }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium shadow-[0_4px_16px_rgba(15,23,42,.08)]" style={{ color }}>
      <span className="h-[17px] w-[13.6px] bg-current" style={{ maskImage: `url(${badgeIcon})`, maskPosition: "center", maskRepeat: "no-repeat", maskSize: "contain", WebkitMaskImage: `url(${badgeIcon})`, WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat", WebkitMaskSize: "contain" }} aria-hidden="true" />
      {children}
    </span>
  );
}
