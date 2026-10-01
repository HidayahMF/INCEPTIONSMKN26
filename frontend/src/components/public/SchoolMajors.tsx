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

function MajorCard({ major, card }: { major: Major; card?: { width: number; height: number } }) {
  const content = major.cardContent;
  return <div className={`major-popover ${major.hoverSide === "left" ? "major-popover-left" : "major-popover-right"} ${major.id === "SIJA" ? "major-popover-sija" : ""}`} style={card ? { width: card.width, height: card.height } : undefined}>
    <img className="major-popover-pointer" src={major.hoverSide === "left" ? figmaAssets.majors.pointerRight : figmaAssets.majors.pointerLeft} alt="" />
    <div className="major-popover-content" style={{ width: content.contentWidth }}>
      <div className="major-popover-icon" style={{ background: `linear-gradient(135deg, ${major.gradientFrom}, ${major.gradientTo})` }}><img src={content.icon} alt="" /></div>
      <h3 aria-label={content.title.join(" ")} style={{ width: content.titleWidth, backgroundImage: `linear-gradient(105deg, ${major.gradientFrom}, ${major.gradientTo})` }}>{content.title.map((line, index) => <span key={line}>{index > 0 && " "}{line}</span>)}</h3>
      <p style={{ width: content.descriptionWidth }}>{major.description}</p>
    </div>
    <a className="major-popover-cta" href={major.href}>Jelajahi Jurusan <img src={figmaAssets.majors.arrowRight} alt="" /></a>
  </div>;
}

export function SchoolMajors({ page = false }: { page?: boolean }) {
  const [activeMajor, setActiveMajor] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string | null>(null);
  const selected = pinned || activeMajor;

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

  return <section className={`school-majors ${page ? "school-majors-page" : ""}`} role="region" aria-labelledby="school-majors-title" aria-label="Jurusan / Program Keahlian">
    <div className="school-majors-header"><span className="school-majors-badge"><img src={figmaAssets.majors.badgeIcon} alt="" />Jurusan / Program Keahlian</span><h2 id="school-majors-title">Temukan Bidang yang <span>Sesuai dengan Minatmu</span></h2><p>Kenali enam program keahlian di SMKN 26 Jakarta dan temukan bidang yang dapat menjadi langkah awal untuk mengembangkan keterampilan, pengalaman, dan masa depanmu.</p></div>
    <div className="relative"><div className="major-stage-wrap"><img className="major-stage-background" src={figmaAssets.majors.backgroundShape} alt="" /><div className="major-stage" ref={stageRef} data-active-major={selected ?? "default"} onMouseMove={handleStagePointerMove} onMouseLeave={() => { if (!pinned) transitionTo(null); }}>
      {majors.map((major, index) => {
        const slot = defaultSlots[index];
        const isActive = selected === major.id;
        const active = major.activeGeometry;
        const outer = isActive && active ? active.outer : slot;
        const person = isActive && active ? active.person : { x: 0, y: 0, width: slot.width, height: slot.height };
        const image = isActive && major.activeImageCrop ? major.activeImageCrop : major.figmaCrop;
        return <div className={`major-unit ${isActive ? "is-active" : selected ? "is-dimmed" : ""} ${major.hoverSide}`} key={major.id} style={{ left: outer.x, top: outer.y, width: outer.width, height: outer.height, zIndex: isActive ? 20 : 1, transition }}>
          <span className="major-person-visual" style={{ left: person.x, top: person.y, width: person.width, height: person.height, opacity: isActive || !selected ? 1 : 0.25, transition }}><span className="major-person-media"><img className="major-person-image" style={{ width: image.width, height: image.height, left: image.left, top: image.top, transition }} src={major.image} alt="" /></span></span>
        </div>;
      })}
      {majors.map((major) => {
        const active = major.activeGeometry;
        const card = active?.card;
        const isVisible = selected === major.id;
        if (!card || !active) return null;
        return <div id={`major-card-${major.id.toLowerCase()}`} aria-hidden={!isVisible} className={`major-card-layer ${isVisible ? "is-visible" : ""}`} key={`${major.id}-card`} style={{ left: active.outer.x + card.x, top: active.outer.y + card.y, width: card.width, height: card.height, opacity: isVisible ? 1 : 0, zIndex: isVisible ? 40 : 0, transition }}><MajorCard major={major} card={card} /></div>;
      })}
      {majors.map((major, index) => { const slot = defaultSlots[index]; const active = major.activeGeometry; const isSelected = selected === major.id; const bounds = isSelected && active ? { left: active.outer.x + active.person.x + active.person.width * 0.35, top: active.outer.y + active.person.y, width: active.person.width * 0.3, height: active.person.height } : { left: slot.x + slot.width * 0.35, top: slot.y, width: slot.width * 0.3, height: slot.height }; return <button type="button" className="major-person-hitbox major-person" data-major={major.id} key={`${major.id}-hitbox`} style={bounds} aria-label={`Lihat ${major.name}`} aria-expanded={isSelected} aria-controls={`major-card-${major.id.toLowerCase()}`} onFocus={() => transitionTo(major.id)} onBlur={() => { if (!pinned) transitionTo(null); }} onClick={(event) => { event.stopPropagation(); toggle(major); }} />; })}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-[15] hidden h-[139px] w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,.38)_48%,#fff_100%)] md:block" />
    </div></div></div>
    <div className="major-mobile-list">{majors.map((major) => <button type="button" className={`major-mobile-item ${selected === major.id ? "is-active" : ""}`} key={major.id} data-major={major.id} onClick={(event) => { event.stopPropagation(); toggle(major); }}><img src={major.image} alt="" /><span>{major.code}</span>{selected === major.id && <div id={`major-card-${major.id.toLowerCase()}`}><MajorCard major={major} /></div>}</button>)}</div>
  </section>;
}
