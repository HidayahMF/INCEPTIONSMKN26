import type { ReactNode } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

const ctaClass =
  "primary-button group inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 ease-out hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none";

function SwapArrow() {
  return (
    <span aria-hidden="true" className="relative inline-flex size-5 shrink-0">
      <img
        alt=""
        className="absolute inset-0 size-5 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
        src={figmaAssets.icons.arrowRight}
      />
      <img
        alt=""
        className="absolute inset-0 size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        src={figmaAssets.secondaryButton.arrowRight}
      />
    </span>
  );
}

export function CtaLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={`${ctaClass} ${className}`.trim()} href={href}>
      {children} <SwapArrow />
    </a>
  );
}
