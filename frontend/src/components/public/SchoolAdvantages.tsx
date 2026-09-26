import { useEffect, useRef, useState, type PointerEvent } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

const advantages = [
  [
    "Pendidikan Berkualitas",
    "Pembelajaran dirancang sesuai kompetensi keahlian dan kebutuhan dunia kerja.",
    figmaAssets.advantages.education,
  ],
  [
    "Terhubung dengan Dunia Industri",
    "Membangun pengalaman belajar melalui kolaborasi dengan mitra industri.",
    figmaAssets.advantages.industry,
  ],
  [
    "Teaching Factory",
    "Mengasah keterampilan melalui praktik dan pengalaman produksi nyata di lingkungan sekolah.",
    figmaAssets.advantages.blud,
  ],
  [
    "Pengalaman Karakter & Minat",
    "Berkembang melalui organisasi, ekstrakurikuler, dan berbagai kegiatan siswa.",
    figmaAssets.advantages.interest,
  ],
  [
    "Lingkungan Belajar Inklusif",
    "Ruang untuk belajar, berkarya, berkolaborasi, dan mengembangkan potensi setiap siswa.",
    figmaAssets.advantages.inclusive,
  ],
  [
    "Sertifikasi Kompetensi",
    "Mengembangkan kompetensi siswa melalui skema sertifikasi yang relevan dengan bidang keahlian.",
    figmaAssets.advantages.lsp,
  ],
] as const;

const CARD_STEP = 324;

export function SchoolAdvantages() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const translateStart = useRef(0);
  const [translate, setTranslate] = useState(0);
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
      setTranslate((current) => Math.max(maxTranslate, Math.min(0, current)));
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
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
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
  };

  return (
    <section className="relative mt-[88px] h-[645px] overflow-hidden bg-gradient-to-b from-soft-blue via-primary to-primary-dark py-0 text-white">
      <div className="absolute left-1/2 top-10 -translate-x-1/2">
        <span className="whitespace-nowrap rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-sm">
          Keunggulan SMK Negeri 26 Jakarta
        </span>
      </div>
      <h2 className="absolute left-1/2 top-[103px] -translate-x-1/2 whitespace-nowrap text-center text-4xl font-bold drop-shadow-sm">
        Apa yang Membuat SMKN 26 Berbeda?
      </h2>
      <div className="absolute left-1/2 top-[181px] mx-auto grid h-[400px] w-[calc(100%-32px)] max-w-[1400px] -translate-x-1/2 grid-cols-1 items-center md:grid-cols-[48px_minmax(0,1272px)_48px] md:gap-x-4 md:px-4">
        <button
          className="z-20 hidden size-12 select-none place-items-center rounded-full bg-white shadow-lg transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:grid"
          onClick={() => move(-1)}
          disabled={translate >= bounds.max}
          aria-label="Keunggulan sebelumnya"
        >
          <img
            className="size-6"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            src={figmaAssets.advantages.carouselLeft}
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
            {advantages.map(([title, body, image]) => (
              <article
                className="group relative flex h-[400px] w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl bg-white p-[18px] text-ink shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                key={title}
              >
                <img
                  className="pointer-events-none absolute inset-x-0 top-0 h-[200px] w-full select-none object-cover transition duration-300 group-hover:scale-105"
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                  src={image}
                  alt=""
                />
                <span className="absolute left-3 top-[156px] grid size-[54px] place-items-center rounded-full bg-gradient-to-r from-primary-dark to-primary">
                  <img
                    className="pointer-events-none size-[34px] select-none"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    src={figmaAssets.advantages.secondaryEducationIcon}
                    alt=""
                  />
                </span>
                <h3 className="relative text-2xl font-semibold leading-tight text-primary-dark">
                  {title}
                </h3>
                <p className="relative mt-1 text-xs leading-[18px]">{body}</p>
                <a
                  className="relative mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:text-primary-dark"
                  href="/information"
                >
                  Baca selengkapnya{" "}
                  <img
                    className="pointer-events-none size-5 select-none"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    src={figmaAssets.icons.arrowRight}
                    alt=""
                  />
                </a>
              </article>
            ))}
          </div>
        </div>
        <button
          className="z-20 hidden size-12 select-none place-items-center rounded-full bg-white shadow-lg transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:grid"
          onClick={() => move(1)}
          disabled={translate <= bounds.min}
          aria-label="Keunggulan berikutnya"
        >
          <img
            className="size-6 rotate-180"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            src={figmaAssets.advantages.carouselRight}
            alt=""
          />
        </button>
      </div>
    </section>
  );
}
