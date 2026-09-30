import { useState } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type ShortcutMenuProps = { onAskAi: () => void };
const imageShortcuts = [
  ["SPMB", "/information", figmaAssets.shortcuts.spmb],
  ["Perpustakaan", "/information", figmaAssets.shortcuts.library],
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
          className={`quick-access-card ${index === 0 ? "is-first" : ""} group relative block h-[148px] min-w-0 overflow-hidden rounded-3xl bg-white transition-[transform,opacity,box-shadow,border] duration-300 ease-out focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none ${activeShortcut === null || activeShortcut === index ? "is-normal" : "is-dimmed"} ${activeShortcut === index ? "is-active" : ""}`}
          href={href}
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
        className={`quick-access-card group relative block h-[148px] min-w-0 overflow-hidden rounded-3xl bg-white transition-[transform,opacity,box-shadow,border] duration-300 ease-out focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none ${activeShortcut === null || activeShortcut === 3 ? "is-normal" : "is-dimmed"} ${activeShortcut === 3 ? "is-active" : ""}`}
        onClick={onAskAi}
        aria-label="Tanya AI"
        onFocus={() => setActiveShortcut(3)}
        onMouseEnter={() => setActiveShortcut(3)}
      >
        <img className="absolute inset-0 size-full object-cover" src={figmaAssets.shortcuts.aiChat} alt="Tanya AI" />
      </button>
    </section>
  );
}
