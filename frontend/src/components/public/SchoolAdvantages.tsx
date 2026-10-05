import { useEffect, useRef, useState, type PointerEvent } from "react";
import { figmaAssets } from "../../assets/figmaAssets";
import { advantages } from "../../data/advantages";

const CARD_STEP = 324;

export function SchoolAdvantages() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const translateStart = useRef(0);
  const dragged = useRef(false);
  const [translate, setTranslate] = useState(-170);
  const [bounds, setBounds] = useState({ min: 0, max: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => {
      const maxTranslate = Math.min(
        0,
        viewport.clientWidth - track.scrollWidth,
      );
      setBounds({ min: maxTranslate, max: 0 });
       setTranslate((current) => Math.max(maxTranslate, Math.min(0, current === 0 ? -170 : current)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const clamp = (value: number) =>
    Math.max(bounds.min, Math.min(bounds.max, value));
  const move = (direction: number) =>
    setTranslate((current) => clamp(current - direction * CARD_STEP));
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    translateStart.current = translate;
    dragged.current = false;
    setDragging(true);
  };
  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    if (Math.abs(event.clientX - pointerStart.current) > 8) {
      if (!dragged.current) event.currentTarget.setPointerCapture(event.pointerId);
      dragged.current = true;
    }
    setTranslate(
      clamp(translateStart.current + event.clientX - pointerStart.current),
    );
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (
      pointerStart.current !== null &&
      Math.abs(event.clientX - pointerStart.current) > 40
    ) {
      setTranslate((current) =>
        clamp(Math.round(current / CARD_STEP) * CARD_STEP),
      );
    }
    pointerStart.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const cancelDrag = () => {
    pointerStart.current = null;
    setDragging(false);
    dragged.current = false;
  };

  return (
    <section id="school-advantages" className="scroll-mt-28 relative mt-[88px] h-[637px] overflow-hidden bg-gradient-to-b from-soft-blue via-primary to-primary-dark py-0 text-white">
      <div className="absolute left-1/2 top-10 -translate-x-1/2">
        <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-sm">
           <img src={figmaAssets.majors.badgeIcon} alt="" />Keunggulan SMK Negeri 26 Jakarta
        </span>
      </div>
       <h2 className="absolute left-1/2 top-[103px] -translate-x-1/2 whitespace-nowrap text-center text-4xl font-bold drop-shadow-sm">
         Apa yang Membuat SMK Negeri 26 Jakarta Berbeda?
      </h2>
         <div className="absolute inset-0"><div className="advantages-carousel absolute left-1/2 top-[181px] mx-auto grid h-[400px] w-[calc(100%-32px)] max-w-[1400px] -translate-x-1/2 grid-cols-1 items-center md:grid-cols-[48px_minmax(0,1272px)_48px] md:gap-x-4 md:px-4">
        <button
             className="group advantages-control z-20 hidden size-12 select-none place-items-center rounded-full bg-white shadow-lg transition-none hover:bg-primary focus-visible:bg-primary hover:shadow-[0_4px_16px_rgba(15,23,42,.08)] disabled:cursor-not-allowed disabled:opacity-40 md:grid"
          onClick={() => move(-1)}
          disabled={translate >= bounds.max}
          aria-label="Keunggulan sebelumnya"
        >
          <img
             className="size-6 transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
             src={figmaAssets.advantages.arrowLeft}
            alt=""
          />
        </button>
        <div
          ref={viewportRef}
          className={`carousel h-[400px] min-w-0 overflow-hidden touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={cancelDrag}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-6 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${translate}px, 0, 0)`,
              transitionDuration: dragging ? "0ms" : undefined,
            }}
          >
            {advantages.map((advantage) => (
              <a
                className="group relative flex h-[400px] w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl bg-white p-[18px] text-ink no-underline transition-none hover:shadow-[0_4px_16px_rgba(15,23,42,.08)] focus-visible:outline-2 focus-visible:outline-white"
                href={`/advantages/${advantage.slug}`}
                key={advantage.slug}
                onClick={(event) => {
                  if (dragged.current) {
                    event.preventDefault();
                    dragged.current = false;
                  }
                }}
              >
                 <div className="absolute left-0 top-0 h-[200px] w-[320px] overflow-hidden rounded-t-3xl">
                  <img
                     className="pointer-events-none block h-[200px] w-[320px] max-w-none select-none object-cover"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                     src={advantage.image}
                    alt=""
                  />
                  </div>
                <span className="absolute left-3 top-[156px] grid size-[54px] place-items-center rounded-full bg-gradient-to-r from-primary-dark to-primary">
                  <img
                    className="pointer-events-none size-[34px] select-none"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    src={figmaAssets.advantages.secondaryEducationIcon}
                    alt=""
                  />
                </span>
                <h3 className="relative text-2xl font-bold leading-tight text-primary-dark">
                  {advantage.title}
                </h3>
                <p className="relative mt-1 text-xs leading-[18px]">{advantage.summary}</p>
                <span className="secondary-button relative mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-transparent bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-[background,color,border-color] duration-300 ease-out group-hover:border-[#CBD5E1] group-hover:bg-primary group-hover:text-white">
                  Baca selengkapnya{" "}
                  <img
                    className="pointer-events-none size-5 select-none transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    src={figmaAssets.secondaryButton.arrowRight}
                    alt=""
                  />
                </span>
              </a>
            ))}
        </div>
        </div>
        <button
             className="group advantages-control z-20 hidden size-12 select-none place-items-center rounded-full bg-white shadow-lg transition-none hover:bg-primary focus-visible:bg-primary hover:shadow-[0_4px_16px_rgba(15,23,42,.08)] disabled:cursor-not-allowed disabled:opacity-40 md:grid"
          onClick={() => move(1)}
          disabled={translate <= bounds.min}
          aria-label="Keunggulan berikutnya"
        >
          <img
             className="size-6 transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
             src={figmaAssets.advantages.arrowRight}
            alt=""
          />
        </button>
       </div></div>
    </section>
  );
}
