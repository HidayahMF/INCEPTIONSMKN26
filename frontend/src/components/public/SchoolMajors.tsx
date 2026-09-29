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

function MajorCard({ major }: { major: Major }) {
  return <div className={`major-popover ${major.hoverSide === "left" ? "major-popover-left" : "major-popover-right"}`}>
    <img className="major-popover-pointer" src={major.hoverSide === "left" ? figmaAssets.majors.pointerRight : figmaAssets.majors.pointerLeft} alt="" />
    <div className="major-popover-icon" style={{ background: `linear-gradient(135deg, ${major.gradientFrom}, ${major.gradientTo})` }}><img src={figmaAssets.majors.educationIcon} alt="" /></div>
    <h3 style={{ backgroundImage: `linear-gradient(105deg, ${major.gradientFrom}, ${major.gradientTo})` }}>{major.name}</h3>
    <p>{major.description}</p>
    <a href={major.href}>Jelajahi Jurusan <img src={figmaAssets.majors.arrowRight} alt="" /></a>
  </div>;
}

export function SchoolMajors({ page = false }: { page?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const selected = pinned || active;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("major");
    if (query && majors.some((major) => major.id === query)) setPinned(query);
    const close = (event: MouseEvent) => { if (!(event.target as Element).closest(".major-stage")) { setActive(null); setPinned(null); } };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setActive(null); setPinned(null); } };
    document.addEventListener("click", close); window.addEventListener("keydown", escape);
    return () => { document.removeEventListener("click", close); window.removeEventListener("keydown", escape); };
  }, []);

  function toggle(major: Major) { setPinned((current) => current === major.id ? null : major.id); setActive(major.id); }
  return <section className={`school-majors ${page ? "school-majors-page" : ""}`} role="region" aria-labelledby="school-majors-title" aria-label="Jurusan / Program Keahlian">
    <div className="school-majors-header"><span className="school-majors-badge"><img src={figmaAssets.majors.badgeIcon} alt="" />Jurusan / Program Keahlian</span><h2 id="school-majors-title">Temukan Bidang yang <span>Sesuai dengan Minatmu</span></h2><p>Kenali enam program keahlian di SMKN 26 Jakarta dan temukan bidang yang dapat menjadi langkah awal untuk mengembangkan keterampilan, pengalaman, dan masa depanmu.</p></div>
    <div className="relative"><div className="major-stage-wrap"><img className="major-stage-background" src={figmaAssets.majors.backgroundShape} alt="" /><div className="major-stage" ref={stageRef}>
        {majors.map((major, index) => { const slot = defaultSlots[index]; const isSelected = selected === major.id; const geometry = isSelected && major.hover ? major.hover : slot; const image = isSelected && major.hover?.image ? major.hover.image : major.figmaCrop; const person = isSelected && major.hover ? major.hover.person : { x: 0, y: 0, width: geometry.width, height: geometry.height }; return <div className={`major-unit ${isSelected ? "is-active" : ""} ${selected && !isSelected ? "is-dimmed" : ""} ${major.hoverSide}`} key={major.id} style={{ left: geometry.x, top: geometry.y, width: geometry.width, height: geometry.height }} onMouseEnter={() => setActive(major.id)} onMouseLeave={() => { if (!pinned) setActive(null); }}>
          <span className="major-person-visual" style={{ left: person.x, top: person.y, width: person.width, height: person.height }}><span className="major-person-media"><img className="major-person-image" style={{ width: image.width, height: image.height, left: image.left, top: image.top }} src={major.image} alt="" /></span></span>
          <button type="button" className="major-person-hitbox" aria-label={`Lihat ${major.name}`} aria-expanded={isSelected} aria-controls={`major-card-${major.id}`} onFocus={() => setActive(major.id)} onBlur={() => { if (!pinned) setActive(null); }} onClick={(event) => { event.stopPropagation(); toggle(major); }} />
         {isSelected && major.hover && <div id={`major-card-${major.id}`} className="major-card-layer"><MajorCard major={major} /></div>}
      </div>; })}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-[15] hidden h-[139px] w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,.38)_48%,#fff_100%)] md:block" />
    </div></div></div>
    <div className="major-mobile-list">{majors.map((major) => <button type="button" className={`major-mobile-item ${selected === major.id ? "is-active" : ""}`} key={major.id} onClick={(event) => { event.stopPropagation(); toggle(major); }}><img src={major.image} alt="" /><span>{major.code}</span>{selected === major.id && <div id={`major-card-${major.id}`}><MajorCard major={major} /></div>}</button>)}</div>
  </section>;
}
