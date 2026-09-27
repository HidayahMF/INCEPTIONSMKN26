import { figmaAssets } from "../../assets/figmaAssets";

type ShortcutMenuProps = { onAskAi: () => void };
const imageShortcuts = [
  ["SPMB", "/information", figmaAssets.shortcuts.spmb],
  ["Perpustakaan", "/information", figmaAssets.shortcuts.library],
  ["KJP & PIP", "/information", figmaAssets.shortcuts.kjpPip],
] as const;
const cardClass =
  "relative flex h-[148px] min-w-0 flex-col items-start justify-between overflow-hidden rounded-3xl border-2 border-[#eaf5fa] bg-white p-4 text-left shadow-[0_4px_16px_rgba(15,23,42,.08)]";

export function ShortcutMenu({ onAskAi }: ShortcutMenuProps) {
  return (
    <section className="relative z-30 mx-auto -mt-[79px] grid w-[calc(100%-32px)] max-w-[1192px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {imageShortcuts.map(([label, href, image], index) => (
        <a
          data-aos="fade-up"
          data-aos-delay={index * 80}
          className="group relative block h-[148px] min-w-0 overflow-hidden rounded-3xl border-2 border-[#eaf5fa] bg-white shadow-[0_4px_16px_rgba(15,23,42,.08)] transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:outline-none"
          href={href}
          aria-label={label}
          key={label}
        >
          <img
            className="absolute inset-0 size-full object-cover transition duration-200 group-hover:scale-[1.03]"
            src={image}
            alt={`${label} shortcut`}
          />
        </a>
      ))}
      <button
        data-aos="fade-up"
        data-aos-delay="240"
        className={`${cardClass} transition-colors hover:border-primary focus-visible:border-primary`}
        onClick={onAskAi}
        aria-label="Tanya AI"
      >
        <span className="relative z-10">
          <strong className="block text-2xl font-semibold text-primary">
            Tanya AI
          </strong>
          <small className="mt-1 block text-xs text-ink">
            Temukan informasi tentang SMKN 26
          </small>
        </span>
        <span className="relative z-10 grid size-10 place-items-center rounded-full bg-gradient-to-r from-primary-dark to-primary">
          <img className="size-6" src={figmaAssets.icons.arrowRight} alt="" />
        </span>
      </button>
    </section>
  );
}
