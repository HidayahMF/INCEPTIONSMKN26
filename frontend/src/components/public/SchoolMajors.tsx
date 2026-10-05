import { useEffect, useRef, useState } from "react";
import { figmaAssets } from "../../assets/figmaAssets";
import { majors, type Major } from "../../data/majors";

const defaultSlots = [
  { x: 8, y: 64, width: 323, height: 461 },
  { x: 160, y: 39, width: 339, height: 485 },
  { x: 349, y: 7, width: 361, height: 517 },
  { x: 561, y: 7, width: 363, height: 518 },
  { x: 758, y: 24, width: 349, height: 501 },
  { x: 933, y: 40, width: 335, height: 485 },
];

const transition = "300ms cubic-bezier(0.25, 1, 0.5, 1)";

function MajorCard({ major, card, mobile = false }: { major: Major; card?: { width: number; height: number }; mobile?: boolean }) {
  const content = major.cardContent;
  const sideClass = major.hoverSide === "left" ? "major-popover-left" : "major-popover-right";
  const pointerSideClass = major.id === "SIJA"
    ? "left-[301px] top-[134px] -rotate-90"
    : major.hoverSide === "left"
      ? "left-[300px] top-[134px] -rotate-90"
      : "left-[-15px] top-[160px] rotate-90";
  return <div className={`major-popover ${sideClass} ${major.id === "SIJA" ? "major-popover-sija" : ""} box-border border border-school-bg bg-white ${mobile ? "relative left-auto top-auto mt-2 min-h-0 w-full rounded-3xl p-0 shadow-none" : "absolute left-0 top-0 min-h-0 rounded-3xl p-[21px] shadow-none"}`} style={card ? { width: card.width, height: card.height } : undefined}>
    <img className={`major-popover-pointer absolute h-[22px] w-[27px] ${mobile ? "hidden" : pointerSideClass}`} src={major.hoverSide === "left" ? figmaAssets.majors.pointerRight : figmaAssets.majors.pointerLeft} alt="" />
    <div className="major-popover-content relative h-[182px]" style={{ width: content.contentWidth }}>
      <div className={`major-popover-icon grid place-items-center rounded-full ${mobile ? "size-12" : "size-[54px]"}`} style={{ background: `linear-gradient(135deg, ${major.gradientFrom}, ${major.gradientTo})` }}><img className="h-[29.454546px] w-[29.454546px] object-fill" src={content.icon} alt="" /></div>
      <h3 className={`mt-3 flex flex-col bg-clip-text font-bold leading-[normal] text-transparent ${mobile ? "text-xl" : "text-2xl"}`} aria-label={content.title.join(" ")} style={{ width: content.titleWidth, backgroundImage: `linear-gradient(105deg, ${major.gradientFrom}, ${major.gradientTo})` }}>{content.title.map((line, index) => <span className="block h-[29px]" key={line}>{index > 0 && " "}{line}</span>)}</h3>
      <p className="m-0 font-normal text-xs leading-[18px] text-ink" style={{ width: content.descriptionWidth }}>{major.description}</p>
    </div>
    <a className={`major-popover-cta pointer-events-auto absolute left-[21px] top-[231px] box-border inline-flex h-[41px] w-[170px] items-center justify-center gap-2 rounded-full border border-white/35 bg-[linear-gradient(105deg,#006cdc_0%,#0092ff_74%,#4cbaf5_100%)] p-0 text-sm font-semibold text-white no-underline shadow-[0_4px_16px_rgba(15,23,42,.08)] ${mobile ? "mt-4" : ""}`} href={major.href}>Jelajahi Jurusan <img className="size-5" src={figmaAssets.majors.arrowRight} alt="" /></a>
  </div>;
}

export function SchoolMajors({ page = false }: { page?: boolean }) {
  const [activeMajor, setActiveMajor] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [reduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string | null>(null);
  const selected = pinned || activeMajor;
  const motionTransition = reduceMotion ? "none" : transition;

  function transitionTo(nextMajor: string | null) {
    if (activeRef.current === nextMajor) return;
    activeRef.current = nextMajor;
    setActiveMajor(nextMajor);
  }

  useEffect(() => {
    const queryId = new URLSearchParams(window.location.search).get("major")?.toUpperCase();
    if (queryId && majors.some((major) => major.id === queryId)) setPinned(queryId);
    const close = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".major-stage")) {
        transitionTo(null);
        setPinned(null);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        transitionTo(null);
        setPinned(null);
      }
    };
    document.addEventListener("click", close);
    window.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", close);
      window.removeEventListener("keydown", escape);
    };
  }, []);

  function toggle(major: Major) {
    const next = pinned === major.id ? null : major.id;
    setPinned(next);
    transitionTo(next);
  }

  function handleStagePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    if (pinned) return;
    const current = activeRef.current;
    if (current) {
      const card = stageRef.current?.querySelector<HTMLElement>(`#major-card-${current.toLowerCase()}`);
      if (card) {
        const bounds = card.getBoundingClientRect();
        if (event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom) return;
      }
    }
    const candidate = [...event.currentTarget.querySelectorAll<HTMLButtonElement>(".major-person-hitbox")]
      .map((hitbox) => {
        const bounds = hitbox.getBoundingClientRect();
        const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
        return { id: hitbox.dataset.major ?? null, inside, distance: Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2)) };
      })
      .filter((item): item is { id: string; inside: boolean; distance: number } => item.inside && item.id !== null)
      .sort((a, b) => a.distance - b.distance)[0];
    if (candidate) transitionTo(candidate.id);
  }

  return <section id="school-majors" className={`school-majors relative box-border h-[793px] overflow-hidden bg-white px-4 pt-11 max-md:h-auto max-md:min-h-[900px] max-md:overflow-visible max-md:pt-12 max-md:pb-14 ${page ? "school-majors-page mt-[120px] max-md:mt-24" : "mt-[100px]"}`} role="region" aria-labelledby="school-majors-title" aria-label="Jurusan / Program Keahlian">
    <div className="school-majors-header relative z-[2] mx-auto w-[min(872px,100%)] text-center"><span className="school-majors-badge inline-flex items-center gap-[7px] rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]"><img className="size-[17px]" src={figmaAssets.majors.badgeIcon} alt="" />Jurusan / Program Keahlian</span><h2 id="school-majors-title" className="mt-6 text-[36px] font-bold leading-[54px] text-ink max-md:text-[32px] max-md:leading-[1.2]">Temukan Bidang yang <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">Sesuai dengan Minatmu</span></h2><p className="mx-auto mt-[14px] max-w-[760px] text-base leading-[1.6] text-muted max-md:text-sm">Kenali enam program keahlian di SMKN 26 Jakarta dan temukan bidang yang dapat menjadi langkah awal untuk mengembangkan keterampilan, pengalaman, dan masa depanmu.</p></div>
    <div className="relative"><div className="major-stage-wrap absolute left-1/2 top-[49px] m-0 h-[524px] w-[1272px] -translate-x-1/2 max-md:hidden"><img className="major-stage-background pointer-events-none absolute inset-0 z-0 h-[524px] w-[1272px] object-fill" src={figmaAssets.majors.backgroundShape} alt="" /><div className="major-stage absolute left-1/2 top-0 z-[1] h-[524px] w-[1272px] overflow-visible -translate-x-1/2 min-[768px]:max-[1271.98px]:origin-top min-[768px]:max-[1271.98px]:scale-[calc((100vw_-_32px)/1272)]" ref={stageRef} data-active-major={selected ?? "default"} onMouseMove={handleStagePointerMove} onMouseLeave={() => { if (!pinned) transitionTo(null); }}>
      {majors.map((major, index) => {
        const slot = defaultSlots[index];
        const isActive = selected === major.id;
        const active = major.activeGeometry;
        const outer = isActive && active ? active.outer : slot;
        const person = isActive && active ? active.person : { x: 0, y: 0, width: slot.width, height: slot.height };
        const image = isActive && major.activeImageCrop ? major.activeImageCrop : major.figmaCrop;
        return <div className={`major-unit ${isActive ? "is-active" : selected ? "is-dimmed" : ""} ${major.hoverSide} absolute z-[1] pointer-events-none`} key={major.id} style={{ left: outer.x, top: outer.y, width: outer.width, height: outer.height, zIndex: isActive ? 20 : 1, transition: motionTransition }}>
          <span className="major-person-visual pointer-events-none absolute overflow-hidden" style={{ left: person.x, top: person.y, width: person.width, height: person.height, opacity: isActive || !selected ? 1 : 0.25, transition: motionTransition }}><span className="major-person-media pointer-events-none absolute inset-0 overflow-hidden"><img className="major-person-image pointer-events-none absolute block max-w-none object-fill" style={{ width: image.width, height: image.height, left: image.left, top: image.top, transition: motionTransition }} src={major.image} alt="" /></span></span>
        </div>;
      })}
      {majors.map((major) => {
        const active = major.activeGeometry;
        const card = active?.card;
        const isVisible = selected === major.id;
        if (!card || !active) return null;
        return <div id={`major-card-${major.id.toLowerCase()}`} aria-hidden={!isVisible} className={`major-card-layer pointer-events-none absolute z-30 ${isVisible ? "is-visible visible" : "invisible"}`} key={`${major.id}-card`} style={{ left: active.outer.x + card.x, top: active.outer.y + card.y, width: card.width, height: card.height, opacity: isVisible ? 1 : 0, zIndex: isVisible ? 40 : 0, transition: motionTransition }}><MajorCard major={major} card={card} /></div>;
      })}
      {majors.map((major, index) => { const slot = defaultSlots[index]; const active = major.activeGeometry; const isSelected = selected === major.id; const bounds = isSelected && active ? { left: active.outer.x + active.person.x + active.person.width * 0.35, top: active.outer.y + active.person.y, width: active.person.width * 0.3, height: active.person.height } : { left: slot.x + slot.width * 0.35, top: slot.y, width: slot.width * 0.3, height: slot.height }; return <button type="button" className="major-person-hitbox major-person pointer-events-auto absolute inset-auto z-10 block cursor-pointer border-0 bg-transparent p-0 focus-visible:rounded-[28px] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0092ff]" data-major={major.id} key={`${major.id}-hitbox`} style={bounds} aria-label={`Lihat ${major.name}`} aria-expanded={isSelected} aria-controls={`major-card-${major.id.toLowerCase()}`} onFocus={() => transitionTo(major.id)} onBlur={() => { if (!pinned) transitionTo(null); }} onClick={(event) => { event.stopPropagation(); toggle(major); }} />; })}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-[15] hidden h-[139px] w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,.38)_48%,#fff_100%)] md:block" />
    </div></div></div>
     <div className="major-mobile-list mx-auto mt-8 grid max-w-[430px] gap-4 md:hidden">{majors.map((major) => { const isActive = selected === major.id; return <button type="button" className={`major-mobile-item relative grid min-h-[150px] cursor-pointer grid-cols-[130px_1fr] items-end overflow-hidden rounded-3xl border border-school-bg bg-[linear-gradient(180deg,#eaf5fa,#fff)] px-4 pb-4 text-left ${isActive ? "is-active grid-cols-1 pt-2" : ""}`} key={major.id} data-major={major.id} onClick={(event) => { event.stopPropagation(); toggle(major); }}><img className={`self-end object-contain object-bottom ${isActive ? "h-[230px] w-full" : "h-[150px] w-[130px]"}`} src={major.image} alt="" /><span className={`self-center min-w-0 text-left ${isActive ? "hidden" : ""}`}><strong className="block text-sm font-bold text-primary">{major.code}</strong><span className="mt-1 block text-base font-bold leading-5 text-ink">{major.name}</span></span>{isActive && <div id={`major-card-${major.id.toLowerCase()}`}><MajorCard major={major} mobile /></div>}</button>; })}</div>
  </section>;
}
