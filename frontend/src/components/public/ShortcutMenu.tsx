import { useState } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type ShortcutMenuProps = { onAskAi: () => void };
const imageShortcuts = [
  ["SPMB", "https://spmb.jakarta.go.id/", figmaAssets.shortcuts.spmb],
  ["Perpustakaan", "https://perpus.smkn26jkt.sch.id/", figmaAssets.shortcuts.library],
  ["KJP & PIP", "/information", figmaAssets.shortcuts.kjpPip],
] as const;
export function ShortcutMenu({ onAskAi }: ShortcutMenuProps) {
  const [activeShortcut, setActiveShortcut] = useState<number | null>(null);

  return (
    <section
      className="relative z-30 mx-auto -mt-[79px] grid w-[calc(100%-32px)] max-w-[1192px] gap-6 sm:grid-cols-2 lg:grid-cols-4 md:left-2 md:top-[6px] md:min-h-[149px]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActiveShortcut(null);
        }
      }}
      onMouseLeave={() => setActiveShortcut(null)}
    >
      {imageShortcuts.map(([label, href, image], index) => (
        <a
          data-aos="fade-up"
          data-aos-delay={index * 80}
          className={`group relative block h-[148px] min-w-0 box-border overflow-hidden rounded-3xl border-2 border-school-bg bg-white [transition:transform_30000ms_ease-in,opacity_300ms_ease-out,box-shadow_300ms_ease-out,border_300ms_ease-out] focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none ${activeShortcut === null || activeShortcut === index ? "z-[1] opacity-100" : "z-0 opacity-50"} ${activeShortcut === index ? "z-10 -translate-y-1 border-4 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#4cbaf5,#0092ff,#006cdc)_border-box]" : index === 0 ? "translate-y-px" : ""} ${activeShortcut === index && index === 0 ? "-translate-y-[6px]" : ""}`}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={label}
          key={label}
          onFocus={() => setActiveShortcut(index)}
          onMouseEnter={() => setActiveShortcut(index)}
        >
          <img
            className="absolute inset-0 size-full object-cover"
            src={image}
            alt={`${label} shortcut`}
          />
        </a>
      ))}
      <button
         data-aos="zoom-in"
         data-aos-delay="240"
         className={`group relative block h-[148px] min-w-0 box-border overflow-hidden rounded-3xl border-2 border-school-bg bg-white [transition:transform_30000ms_ease-in,opacity_300ms_ease-out,box-shadow_300ms_ease-out,border_300ms_ease-out] focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none ${activeShortcut === null || activeShortcut === 3 ? "z-[1] opacity-100" : "z-0 opacity-50"} ${activeShortcut === 3 ? "z-10 -translate-y-1 border-4 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#4cbaf5,#0092ff,#006cdc)_border-box]" : ""}`}
        onClick={onAskAi}
        aria-label="Tanya AI"
        onFocus={() => setActiveShortcut(3)}
        onMouseEnter={() => setActiveShortcut(3)}
      >
        <img
          className="absolute inset-0 size-full object-cover"
          src={figmaAssets.shortcuts.aiChat}
          alt="Tanya AI"
        />
      </button>
    </section>
  );
}
