import { figmaAssets } from "../../assets/figmaAssets";

type ShortcutMenuProps = { onAskAi: () => void };
const imageShortcuts = [
  ["SPMB", "/information", figmaAssets.shortcuts.spmb],
  ["Perpustakaan", "/information", figmaAssets.shortcuts.library],
  ["KJP & PIP", "/information", figmaAssets.shortcuts.kjpPip],
] as const;
export function ShortcutMenu({ onAskAi }: ShortcutMenuProps) {
  return (
    <section className="relative z-30 mx-auto -mt-[79px] grid w-[calc(100%-32px)] max-w-[1192px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {imageShortcuts.map(([label, href, image]) => (
        <a
          className="group relative block h-[148px] min-w-0 overflow-hidden rounded-3xl border-2 border-[#eaf5fa] bg-white shadow-[0_4px_16px_rgba(15,23,42,.08)] transition-colors duration-300 hover:border-primary hover:shadow-xl focus-visible:border-primary focus-visible:outline-none"
          href={href}
          aria-label={label}
          key={label}
        >
          <img
            className="absolute inset-0 size-full object-cover"
            src={image}
            alt={`${label} shortcut`}
          />
        </a>
      ))}
      <button
        className="group relative block h-[148px] min-w-0 overflow-hidden rounded-3xl border-2 border-[#eaf5fa] bg-white shadow-[0_4px_16px_rgba(15,23,42,.08)] transition-colors duration-300 hover:border-primary hover:shadow-xl focus-visible:border-primary focus-visible:outline-none"
        onClick={onAskAi}
        aria-label="Tanya AI"
      >
        <img className="absolute inset-0 size-full object-cover" src={figmaAssets.shortcuts.aiChat} alt="Tanya AI" />
      </button>
    </section>
  );
}
