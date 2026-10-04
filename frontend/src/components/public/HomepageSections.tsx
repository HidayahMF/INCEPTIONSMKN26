import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type Props = { onAskAi: () => void };
const bludCards = [
  ["KGStudio", "Mengasah keterampilan melalui produksi dan layanan kreatif."],
  ["UPTECHNO", "Mengembangkan solusi teknologi sesuai kebutuhan industri."],
  ["E-MAN", "Menerapkan kompetensi kelistrikan dalam praktik nyata."],
  [
    "Manufaktur26",
    "Mengenal proses produksi dan pembuatan komponen manufaktur.",
  ],
  ["Garage26", "Praktik langsung dalam perawatan dan perbaikan kendaraan."],
  ["GADIZ VOKASI", "Mengubah kompetensi vokasi menjadi produk dan layanan."],
] as const;
const achievementCards = [
  [
    "Tim Basket",
    "Juara 1 kategori student Ciara Student Orienteering 4 - Tingkat nasional",
    "/assets/figma/achievements/achievements-raw-08.png",
  ],
  [
    "Tim Futsal",
    "Juara 1 Kofesse Cup - Tingkat Provinsi",
    "/assets/figma/achievements/achievements-raw-03.png",
  ],
  [
    "Paskibra Swabhangun",
    "Harapan 3 | Juara Make Up 2 | Juara Utama 1 | Variasi Formasi Terbaik",
    "/assets/figma/achievements/achievements-raw-01.png",
  ],
  [
    "Tim Pramuka",
    "Juara Umum 3 Putra | Juara 2 Tari Tradisional Putra - Kwartir JakTim",
    "/assets/figma/achievements/achievements-raw-04.png",
  ],
  [
    "Tim Voli",
    "Juara 2 Galaxy Cup 2025 - Tingkat Wilayah",
    "/assets/figma/achievements/achievements-raw-07.png",
  ],
] as const;
const newsCards = [
  {
    category: "Kegiatan",
    title: "Workshop Pengembangan Soft Skill Siswa",
    date: "28 September 2026",
    image: "/assets/figma/news/news-raw-03.png",
  },
  {
    category: "Prestasi",
    title: "Siswa SMKN 26 Raih Prestasi di LKS",
    date: "20 September 2026",
    image: "/assets/figma/news/news-raw-04.png",
  },
  {
    category: "Kegiatan Sekolah",
    title: "Workshop Pengembangan Soft Skill Siswa",
    date: "18 September 2026",
    image: "/assets/figma/news/news-raw-01.png",
  },
  {
    category: "Kemitraan & Kerja Sama",
    title: "Kolaborasi SMKN 26 dengan Dunia Industri",
    date: "12 September 2026",
    image: "/assets/figma/news/news-raw-09.png",
  },
  {
    category: "Karya & Inovasi",
    title: "SMKN 26 Hadirkan Karya Inovatif Berbasis Teknologi",
    date: "09 September 2026",
    image: "/assets/figma/news/news-raw-07.png",
  },
] as const;
const programRightCards = [
  [
    "Lembaga Sertifikasi Profesi",
    "Validasi kompetensi, siapkan diri untuk dunia kerja.",
    "/assets/figma/programs/programs-raw-07.png",
  ],
  [
    "OSIS & MPK",
    "Tempat belajar memimpin, berkolaborasi, dan berkontribusi.",
    "/assets/figma/programs/programs-raw-10.png",
  ],
  [
    "Bursa Kerja Khusus",
    "Menghubungkan kompetensi siswa dengan peluang kerja.",
    "/assets/figma/programs/programs-raw-02.png",
  ],
] as const;
const programPanels = [
  "/assets/figma/programs/programs-raw-04.png",
  "/assets/figma/programs/programs-raw-06.png",
  "/assets/figma/programs/programs-raw-03.png",
] as const;
const programArrow = "/assets/figma/programs/programs-svg-01.svg";
const programCtaArrow = "/assets/figma/icons/icon-arrow-right.svg";
const programBadgeIcon = "/assets/figma/programs/programs-svg-04.svg";

export function HomepageSections({ onAskAi }: Props) {
  return (
    <>
      <VideoProfileSection />
      <ProgramsSection />
      <BludSection />
      <AchievementsSection />
      <NewsSection />
      <AiCtaSection onAskAi={onAskAi} />
    </>
  );
}

function VideoProfileSection() {
  const youtubeUrl =
    "https://www.youtube.com/watch?si=IP1NH2avF07GO1DZ&v=BAWRtymSpNg&feature=youtu.be";
  const ringRef = useRef<HTMLImageElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const [playState, setPlayState] = useState<"idle" | "hover" | "pressed">(
    "idle",
  );

  useEffect(() => {
    const ring = ringRef.current;
    if (
      !ring ||
      playState !== "idle" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animation = ring.animate(
      [
        { width: "98.4px", height: "98.4px", left: "11.8px", top: "11.8px" },
        { width: "120px", height: "120px", left: "1px", top: "1px" },
      ],
      {
        duration: 1000,
        direction: "alternate",
        iterations: Infinity,
        easing: "ease-out",
      },
    );
    return () => animation.cancel();
  }, [playState]);

  useEffect(() => {
    const pulse = pulseRef.current;
    if (!pulse) return;
    // Tailwind v4 centers this element with the `translate` property, so the
    // keyframes must only scale. Re-applying translate(-50%,-50%) here would
    // compose on top of it and offset the halo by twice its size.
    const animation = pulse.animate(
      [{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(1.154)", opacity: 0 }],
      {
        duration: 1350,
        iterations: Infinity,
        easing: "cubic-bezier(.2,.65,.3,1)",
      },
    );
    return () => animation.cancel();
  }, []);

  const ringStyle =
    playState === "idle"
      ? undefined
      : {
        left: "1px",
        top: "1px",
        width: "120px",
        height: "120px",
        filter: "drop-shadow(0 0 2px rgba(255,255,255,.25))",
        };
  const innerStyle = {
    transform: playState === "pressed" ? "scale(.98)" : "none",
  };
  return (
    <section
      id="video-profile"
      className="video-profile relative h-[830px] overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-soft-blue text-white max-md:h-[650px]"
      aria-labelledby="video-profile-title"
    >
      <img
        className="pointer-events-none absolute left-[-73px] top-[92px] z-[2] block size-[245px] max-md:left-[-145px] max-md:top-[120px]"
        src={figmaAssets.videoProfile.decorationLeft}
        alt=""
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute left-[calc(50%+599px)] top-[415px] z-[2] block size-[180px] max-md:left-auto max-md:right-[-90px] max-md:top-[420px]"
        src={figmaAssets.videoProfile.decorationRight}
        alt=""
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute bottom-[-34px] left-1/2 z-[4] block h-[514px] w-[1440px] max-w-none -translate-x-1/2 max-md:bottom-[-355px] max-md:h-auto max-md:w-[920px]"
        src={figmaAssets.videoProfile.lowerShape}
        alt=""
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-11 z-[7] flex w-[872px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center text-center max-md:top-10">
        <span className="inline-flex items-center rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold leading-5 text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img
            className="mr-[7px] size-[17px]"
            src={figmaAssets.videoProfile.badgeIcon}
            alt=""
          />
          VIDEO PROFILE
        </span>
        <h2
          id="video-profile-title"
          className="my-[24px] mb-[10px] text-[36px] font-extrabold leading-[54px] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] max-md:mt-[18px] max-md:text-[30px] max-md:leading-[42px]"
        >
          Kenali SMKN 26 Jakarta lebih Dekat
        </h2>
        <p className="w-[578px] max-w-full text-lg font-semibold leading-[30px] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] max-md:text-base max-md:leading-[26px]">
          Satu sekolah, banyak cerita, dan langkah nyata untuk belajar, bekerja,
          dan membangun masa depan.
        </p>
      </div>
      <div className="absolute left-1/2 top-[259px] z-[5] box-border h-[500px] w-[1000px] -translate-x-1/2 overflow-hidden rounded-[24px] border-[12px] border-white max-[1271px]:w-[calc(100%-48px)] max-md:top-[230px] max-md:h-[280px] max-md:w-[calc(100%-32px)] max-md:rounded-[20px] max-md:border-[8px]">
        <img
          className="block size-full object-cover object-center"
          src={figmaAssets.videoProfile.preview}
          alt="Pratinjau video profil SMKN 26 Jakarta"
        />
        <div
          className="absolute inset-0 z-[1] bg-[rgba(0,108,220,.2)]"
          aria-hidden="true"
        />
        <a
          className="video-play group absolute left-1/2 top-[170px] z-10 grid size-[122px] -translate-x-1/2 place-items-center overflow-visible cursor-pointer border-0 bg-transparent max-md:top-1/2 max-md:-translate-y-1/2"
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tonton Video Profil SMKN 26 Jakarta di YouTube"
          onPointerEnter={() => setPlayState("hover")}
          onPointerLeave={() => setPlayState("idle")}
          onPointerDown={() => setPlayState("pressed")}
          onPointerUp={() => setPlayState("hover")}
          onFocus={() =>
            setPlayState((state) => (state === "pressed" ? state : "hover"))
          }
          onBlur={() => setPlayState("idle")}
        >
          <span
            ref={pulseRef}
            className="pointer-events-none absolute left-1/2 top-1/2 size-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3.5px] border-white/95 [filter:drop-shadow(0_0_4px_rgba(255,255,255,.38))]"
            aria-hidden="true"
          />
          <img
            ref={ringRef}
            className="video-play-ring pointer-events-none absolute left-[11.8px] top-[11.8px] z-[2] size-[98.4px] object-fill"
            style={ringStyle}
            src={figmaAssets.videoProfile.playRing}
            alt=""
          />
          <span
            className="video-play-button pointer-events-none absolute left-[11.8px] top-[11.8px] z-[3] grid size-[98.4px] place-items-center rounded-full border-[2.187px] border-slate-200 bg-white shadow-[0_4.8px_9.6px_rgba(15,23,42,.08)] [transition:transform_110ms_cubic-bezier(0.25,1,0.5,1),box-shadow_300ms_cubic-bezier(0.25,1,0.5,1)] group-focus-visible:[box-shadow:0_5px_16px_rgba(15,23,42,.16)]"
            style={innerStyle}
          >
            <img
              className="size-[52.48px] object-fill"
              src={figmaAssets.videoProfile.playIcon}
              alt=""
            />
          </span>
        </a>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    let timer: number;
    const schedule = (current: number) => {
      timer = window.setTimeout(
        () => {
          const next = (current + 1) % programPanels.length;
          setPanel(next);
          schedule(next);
        },
        (current === 0 ? 800 : 900) +
          (current === 2 ? 1249.8885399 : 1458.4209919),
      );
    };
    schedule(panel);
    return () => window.clearTimeout(timer);
  }, [panel]);

  return (
    <section
      className="programs-section relative mx-auto mt-[103px] w-[min(1184px,calc(100%-32px))] pt-[13px] max-md:mt-[88px]"
      aria-labelledby="programs-title"
    >
      <div className="section-intro mx-auto mb-[15px] w-[min(872px,100%)] text-center">
        <span className="section-badge inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img src={programBadgeIcon} alt="" />
          Program SMK Negeri 26 Jakarta
        </span>
        <h2 id="programs-title" className="mt-5 mb-2.5 text-4xl font-bold leading-[54px] text-ink">
          Berkembang di Dalam dan{" "}
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">di Luar Kelas</span>
        </h2>
        <p className="mx-auto max-w-[774px] text-base leading-6 text-muted">
          Ruang bagi siswa untuk mengembangkan kompetensi, pengalaman,
          kepemimpinan, dan potensi melalui berbagai program sekolah.
        </p>
      </div>
      <div className="program-grid grid h-[468px] grid-cols-[580px_580px] gap-6">
        <article className="program-slider program-feature-card relative box-border h-[468px] w-[580px] overflow-hidden rounded-3xl border-4 border-white bg-white px-[22px] pt-[23px]">
          <div
            className="program-panel-track flex h-[299px] w-max gap-6"
            style={{
              transform: `translateX(${-556 * panel}px)`,
              transition: `transform ${panel === 0 ? 0 : 1458.4209919}ms cubic-bezier(.2,.7,.2,1)`,
            }}
          >
            {programPanels.map((src, index) => (
              <img
                className="block h-[299px] w-[532px] shrink-0 rounded-[18px] object-cover"
                key={src}
                src={src}
                alt={`Panel ekstrakurikuler ${index + 1}`}
                draggable={false}
              />
            ))}
          </div>
          <div className="program-feature-copy pt-0">
            <h3 className="m-0 bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-2xl font-bold text-transparent">
              Ekstrakurikuler
            </h3>
            <p className="my-1 mb-3 text-xs leading-[18px] text-ink">
              Temukan ruang untuk berkembang sesuai minat dan bakatmu.
            </p>
            <a
              className="group primary-button inline-flex h-[41px] items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 text-sm font-semibold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] hover:border hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none"
              href="/programs"
            >
              Jelajahi Ekstrakurikuler{" "}
              <span
                className="size-5 shrink-0 bg-white group-hover:bg-primary"
                style={{
                  maskImage: `url(${programCtaArrow})`,
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskImage: `url(${programCtaArrow})`,
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                }}
                aria-hidden="true"
              />
            </a>
          </div>
        </article>
        <div className="program-cards grid grid-rows-[repeat(3,140px)] gap-5">
          {programRightCards.map(([title, description, image]) => (
            <article
              className="program-card relative flex h-[140px] w-[580px] items-center gap-6 overflow-hidden rounded-3xl border-2 border-school-bg bg-white"
              key={title}
            >
              <img
                className="h-[136px] w-[290px] shrink-0 object-cover"
                src={image}
                alt=""
                draggable={false}
              />
              <div className="program-card-content grid w-[237px] min-w-[237px] max-w-[237px] flex-none grid-cols-[minmax(0,1fr)_45px] grid-rows-[auto_1fr] items-center gap-x-2 p-0">
                <h3 className="col-start-1 row-start-1 m-0 bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-base font-bold leading-tight text-transparent">
                  {title}
                </h3>
                <p className="col-start-1 row-start-2 m-0 w-full text-[10px] leading-[18px] text-ink">
                  {description}
                </p>
                <a
                  className="group col-start-2 row-span-2 row-start-1 inline-flex size-[45px] items-center justify-center rounded-full border border-slate-200 bg-white transition-none hover:border-primary focus-visible:border-primary hover:bg-primary focus-visible:bg-primary"
                  href="/programs"
                  aria-label={`Lihat ${title}`}
                >
                  <img
                    className="h-[14px] w-[9px] rotate-180 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
                    src={programArrow}
                    alt=""
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Baseline .blud-card-N p widths from 40cf91f, kept as literal strings so the
// Tailwind scanner can see them.
const bludCardTextWidth = [
  "max-w-[241px]",
  "max-w-[226px]",
  "max-w-[226px]",
  "max-w-[265px]",
  "max-w-[255px]",
  "max-w-[226px]",
] as const;

function BludSection() {
  return (
    <section
      className="blud-section relative mx-auto mt-[88px] h-[629px] w-[min(1272px,100%-32px)] overflow-visible p-0 min-[1600px]:h-[720px] min-[1600px]:w-[1600px] min-[1600px]:max-w-[calc(100%-40px)]"
      aria-labelledby="blud-title"
    >
      <div className="section-intro blud-intro relative mb-[42px] w-full text-left">
        <div className="flex justify-center">
        <span className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img className="h-[17px] w-[13.6px]" src={figmaAssets.blud.badgeIcon} alt="" />
          BELAJAR • BERKARYA • MENGHASILKAN
        </span>
        </div>
        <h2 id="blud-title" className="mt-5 mb-2.5 text-4xl font-bold leading-[54px] text-ink">
          Belajar Melalui{" "}
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">Pengalaman Nyata</span>
        </h2>
        <p className="mt-1 max-w-[698px] text-lg leading-[30px] text-muted">
          Menghubungkan pembelajaran dengan pengalaman kerja melalui unit
          produksi dan layanan yang dikelola oleh SMK Negeri 26 Jakarta.
        </p>
        <a
          className="group blud-cta primary-button absolute right-0 bottom-2 inline-flex h-[41px] w-[236px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none min-[1600px]:top-[135px] min-[1600px]:bottom-auto"
          href="/programs"
        >
          Jelajahi Ekstrakurikuler{" "}
            <span
              className="size-5 shrink-0 bg-white group-hover:bg-primary"
              style={{
                maskImage: `url(${programCtaArrow})`,
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskImage: `url(${programCtaArrow})`,
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
              }}
              aria-hidden="true"
            />
        </a>
      </div>
      <div className="blud-grid grid grid-cols-[repeat(3,400px)] grid-rows-[repeat(2,200px)] gap-6 overflow-visible min-[1600px]:absolute min-[1600px]:left-[13px] min-[1600px]:top-[263px] min-[1600px]:grid-cols-[repeat(3,500px)] min-[1600px]:grid-rows-[repeat(2,250px)] min-[1600px]:gap-[30px]">
        {bludCards.map(([name, description], index) => (
          <a
            className={`group blud-card blud-card-${index} ${[0, 2, 3, 4].includes(index) ? "has-hover-shadow" : ""} relative flex h-[200px] w-[400px] min-w-[400px] box-border flex-col justify-between overflow-visible rounded-3xl border-2 border-school-bg bg-white p-[18px] no-underline transition-[border-width,border-color,box-shadow] duration-300 hover:border-4 hover:border-transparent hover:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#006cdc,#0092ff,#4cbaf5)_border-box] focus-visible:border-4 focus-visible:border-transparent focus-visible:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#006cdc,#0092ff,#4cbaf5)_border-box] ${[0, 2, 3, 4].includes(index) ? "hover:shadow-[0_4px_16px_rgba(15,23,42,.08)] focus-visible:shadow-[0_4px_16px_rgba(15,23,42,.08)]" : ""} min-[1600px]:h-[250px] min-[1600px]:w-[500px] min-[1600px]:min-w-[500px] min-[1600px]:p-[22px]`}
            href="/blud"
            key={name}
          >
            <span className="blud-icon relative z-[1] grid size-[54px] place-items-center rounded-3xl bg-gradient-to-br from-primary-dark to-soft-blue">
              <img
                className="size-[29.455px]"
                src={figmaAssets.blud.icons[index]}
                alt=""
              />
            </span>
            <h3 className="relative z-[1] m-0 bg-gradient-to-r from-primary-dark to-soft-blue bg-clip-text text-2xl leading-[29px] font-bold text-transparent min-[1600px]:mt-5 min-[1600px]:text-[30px] min-[1600px]:leading-9">
              {name}
            </h3>
            <p className={`relative z-[1] m-0 text-xs leading-[18px] text-ink ${bludCardTextWidth[index]} min-[1600px]:text-base min-[1600px]:leading-6`}>
              {description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

const achievementBadgeIcon = "/assets/figma/programs/programs-svg-04.svg";

function AchievementsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerX: 0, scrollLeft: 0, active: false });
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timer: number;
    const mark = () => {
      setIsScrolling(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsScrolling(false), 160);
    };
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("wheel", mark, { passive: true });
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("wheel", mark);
      window.clearTimeout(timer);
    };
  }, []);

  function scrollByStep(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".achievement-card");
    const step = card ? card.offsetWidth + 22 : 259;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = {
      pointerX: event.clientX,
      scrollLeft: track.scrollLeft,
      active: true,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;
    track.scrollLeft =
      dragRef.current.scrollLeft - (event.clientX - dragRef.current.pointerX);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    dragRef.current.active = false;
    setIsDragging(false);
    if (track && track.hasPointerCapture(event.pointerId))
      track.releasePointerCapture(event.pointerId);
  }

  return (
    <section
      className="achievements-section relative mx-auto mt-[88px] h-[655px] w-[min(1272px,100%-32px)] pt-0 max-md:h-auto max-md:pb-16"
      aria-labelledby="achievements-title"
    >
      <div className="mx-auto mb-12 w-[min(872px,100%)] text-center">
        <span className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img className="h-[17px] w-[13.6px]" src={achievementBadgeIcon} alt="" />
          Prestasi SMK Negeri 26 Jakarta
        </span>
        <h2
          id="achievements-title"
          className="mt-5 mb-2.5 text-4xl font-bold leading-[54px] text-ink"
        >
          Karya dan{" "}
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">
            Prestasi Siswa
          </span>
        </h2>
        <p className="mx-auto w-[774px] max-w-full text-base leading-6 text-muted">
          Berbagai pencapaian siswa menjadi bagian dari perjalanan SMK Negeri 26
          Jakarta dalam mengembangkan talenta dan potensi generasi muda.
        </p>
      </div>
      <div className="achievement-carousel flex w-full max-w-full items-center gap-3 px-11 min-[640px]:px-14 min-[768px]:relative min-[768px]:block min-[768px]:h-[296px] min-[1272px]:w-[1272px] min-[1272px]:max-w-none min-[1272px]:px-0">
        <button
          type="button"
          className="group grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-school-bg bg-white text-[22px] text-primary-dark hover:bg-primary-dark focus-visible:bg-primary-dark md:absolute md:top-[114px] md:z-[2] md:size-12 md:border-slate-200 min-[768px]:max-[1271.98px]:left-1 min-[1272px]:left-[-57px]"
          aria-label="Prestasi sebelumnya"
          onClick={() => scrollByStep(-1)}
        >
          <img className="size-6 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src={figmaAssets.advantages.carouselLeft} alt="" />
        </button>
        <div
          className={`achievement-track flex w-full max-w-full flex-1 cursor-grab select-none gap-[22px] overflow-x-auto overflow-y-hidden [scrollbar-width:none] [touch-action:pan-y] max-[1271.98px]:[-webkit-overflow-scrolling:touch] max-[1271.98px]:[scroll-snap-type:x_proximity] min-[768px]:h-[296px] min-[1272px]:w-[1272px] min-[1272px]:max-w-none min-[1272px]:overflow-x-hidden max-md:pb-3 ${isDragging ? " is-dragging cursor-grabbing" : ""}${isScrolling ? " is-scrolling pointer-events-none" : ""}`}
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {achievementCards.map(([title, description, src]) => (
            <article
              className={`group achievement-card relative h-[296px] w-[237px] shrink-0 overflow-hidden rounded-[10.9px] border-2 border-white bg-ink transition-none max-[1271.98px]:[scroll-snap-align:start] ${isDragging ? " pointer-events-none" : ""}`}
              tabIndex={0}
              key={src}
            >
              <img className="block h-full w-full object-cover [-webkit-user-drag:none]" src={src} alt="" draggable={false} />
              <div className="pointer-events-none absolute left-0 right-0 top-[79px] h-[217px] bg-gradient-to-b from-transparent to-[#000059] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true" />
              <div className="achievement-card-content pointer-events-none absolute bottom-[14px] left-4 right-0 z-[1] flex w-[216px] [transform:translateY(12px)] flex-col items-start justify-end opacity-0 shadow-[0_4px_7px_rgba(0,0,0,.1)] transition-[opacity,transform] duration-300 ease-out group-hover:pointer-events-auto group-hover:[transform:translateY(0)] group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:[transform:translateY(0)] group-focus-within:opacity-100">
                <h3 className="text-[20px] leading-[24.2px] text-white">{title}</h3>
                <p className="mt-1 mb-2.5 w-[216px] text-xs leading-[14.5px] text-white">{description}</p>
                <a
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold leading-[18px] text-primary no-underline shadow-[0_4px_15px_rgba(15,23,42,.08)] transition-[background-color,background-image,color,box-shadow] duration-300 ease-out [-webkit-user-drag:none] hover:bg-[linear-gradient(105deg,#006cdc,#0092ff,#4cbaf5)] hover:text-white focus-visible:bg-[linear-gradient(105deg,#006cdc,#0092ff,#4cbaf5)] focus-visible:text-white"
                  href="/achievements"
                >
                  Lihat Detail{" "}
                  <img className="size-[18px] object-contain" src={figmaAssets.secondaryButton.arrowRight} alt="" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="group grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-school-bg bg-white text-[22px] text-primary-dark hover:bg-primary-dark focus-visible:bg-primary-dark md:absolute md:top-[114px] md:z-[2] md:size-12 md:border-slate-200 min-[768px]:max-[1271.98px]:right-1 min-[1272px]:right-[-57px]"
          aria-label="Prestasi berikutnya"
          onClick={() => scrollByStep(1)}
        >
          <img className="size-6 rotate-180 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src={figmaAssets.advantages.carouselRight} alt="" />
        </button>
      </div>
      <div className="achievement-stats mx-auto mt-9 grid h-[122px] w-[calc(100%-78px)] grid-cols-5 items-center gap-5 rounded-3xl bg-white px-7 py-5 text-ink [box-shadow:0_4px_16px_rgba(15,23,42,.06)] transition-[box-shadow] duration-300 ease-out hover:[box-shadow:0_4px_16px_rgba(15,23,42,.08)] focus-within:[box-shadow:0_4px_16px_rgba(15,23,42,.08)] max-md:h-auto max-md:w-full max-md:grid-cols-2">
        {[
          [
            "100+",
            "Prestasi",
            "/assets/figma/achievements/achievements-svg-12.svg",
          ],
          [
            "10",
            "Tingkat Internasional",
            "/assets/figma/achievements/achievements-svg-03.svg",
          ],
          [
            "56",
            "Tingkat Nasional",
            "/assets/figma/achievements/achievements-svg-03.svg",
          ],
          [
            "24",
            "Tingkat Provinsi",
            "/assets/figma/achievements/achievements-svg-03.svg",
          ],
          [
            "30",
            "Tingkat Kota",
            "/assets/figma/achievements/achievements-svg-03.svg",
          ],
        ].map(([value, label, icon], index) => (
          <div className="relative grid grid-cols-[70px_1fr] items-center gap-x-3" key={label}>
            <span className="stat-icon row-span-2 grid size-[70px] place-items-center rounded-full bg-[linear-gradient(135deg,#4cbaf5_0%,#0092ff_50%,#006cdc_100%)] text-white">
              <img className="h-[33px] w-[33px] object-contain" src={icon} alt="" />
            </span>
            <strong className="text-[36px]">{value}</strong>
            <p className="m-0 text-xs leading-[18px] font-medium text-muted">{label}</p>
            {index < 4 && <span className="pointer-events-none absolute right-[-10px] h-[86px] border-r border-dashed border-primary max-md:hidden" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}

const newsCategoryIcon = "/assets/figma/news/news-calendar.svg";
const newsBadgeIcon = "/assets/figma/programs/programs-svg-04.svg";

function NewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = 180;
    let timer: number;
    const mark = () => {
      setIsScrolling(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsScrolling(false), 160);
    };
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("wheel", mark, { passive: true });
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("wheel", mark);
      window.clearTimeout(timer);
    };
  }, []);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { pointerX: event.clientX, scrollLeft: track.scrollLeft };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || event.buttons === 0) return;
    track.scrollLeft =
      dragRef.current.scrollLeft - (event.clientX - dragRef.current.pointerX);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    setIsDragging(false);
    if (track && track.hasPointerCapture(event.pointerId))
      track.releasePointerCapture(event.pointerId);
  }

  return (
    <section
      className="news-section relative mx-auto mt-[88px] h-[495px] w-[min(1272px,100%-32px)] pt-0"
      aria-labelledby="news-title"
    >
      <div className="section-intro mx-auto w-[min(872px,100%)] text-center">
        <span className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img className="h-[17px] w-[13.6px]" src={newsBadgeIcon} alt="" />
          Berita SMK Negeri 26 Jakarta
        </span>
        <h2 id="news-title" className="mt-11 mb-2.5 text-4xl font-bold leading-[54px] text-ink">
          Berita &amp; Informasi Terkini
          <br />
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">SMK Negeri 26 Jakarta</span>
        </h2>
      </div>
      <div className="news-viewport absolute left-1/2 top-[195.02px] h-[300px] w-[1272px] max-w-full -translate-x-1/2 overflow-hidden">
        <div
          className={`news-track flex h-[300px] cursor-grab select-none gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] ${isDragging ? "is-dragging cursor-grabbing" : ""}${isScrolling ? " is-scrolling pointer-events-none" : ""}`}
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {newsCards.map((card) => (
            <article
              className="news-card group relative box-border h-[300px] w-[400px] shrink-0 overflow-hidden rounded-xl border-2 border-school-bg bg-white transition-none hover:border-4 hover:border-transparent hover:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#4cbaf5,#0092ff,#006cdc)_border-box] focus-within:border-4 focus-within:border-transparent focus-within:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#4cbaf5,#0092ff,#006cdc)_border-box]"
              tabIndex={0}
              key={card.title + card.date}
            >
              <img className="absolute left-0 top-0 h-[176px] w-[396px] object-cover" src={card.image} alt="" draggable={false} />
              <div className="absolute bottom-[18px] left-[18px] right-[18px] h-[83px] p-0">
                <span className="absolute -left-0.5 -top-[37px] inline-flex items-center gap-1.5 rounded-full [background:linear-gradient(90deg,#4cbaf5_0%,#0092ff_50%,#006cdc_100%)] py-[5px] pr-3 pl-2.5 text-sm font-semibold text-white">
                  <img className="h-[17px] w-[17px] shrink-0" src={newsCategoryIcon} alt="" />
                  {card.category}
                </span>
                <h3 className="absolute left-0 top-0 m-0 bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-2xl font-bold leading-[29px] text-transparent">{card.title}</h3>
                <time className="absolute bottom-[3px] left-0 m-0 block text-xs leading-[18px] text-muted">{card.date}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="news-controls pointer-events-none absolute left-0 top-[314.02px] flex w-[1382px] justify-between gap-0">
        <button className="pointer-events-auto grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white hover:bg-primary-dark focus-visible:bg-primary-dark" type="button" aria-label="Berita sebelumnya">
          <img className="h-6 w-6" src="/assets/figma/news/news-svg-02.svg" alt="" />
        </button>
        <button className="pointer-events-auto grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white hover:bg-primary-dark focus-visible:bg-primary-dark" type="button" aria-label="Berita berikutnya">
          <img className="h-6 w-6 rotate-180" src="/assets/figma/news/news-svg-02.svg" alt="" />
        </button>
      </div>
    </section>
  );
}

function AiCtaSection({ onAskAi }: Props) {
  const [botSettled, setBotSettled] = useState(false);
  const botRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setBotSettled(true), 1);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const bot = botRef.current;
    if (!bot) return;
    const float = bot.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-14px)" },
        { transform: "translateY(0)" },
      ],
      { duration: 3600, iterations: Infinity, easing: "ease-in-out" },
    );
    return () => float.cancel();
  }, []);
  return (
    <section
      className={`ai-cta relative mx-auto mt-[88px] flex h-[536px] w-[1437px] max-w-[calc(100vw-3px)] overflow-hidden bg-white ${botSettled ? "is-bot-settled" : ""}`}
      aria-labelledby="ai-cta-title"
    >
      <span className="ai-cta-badge absolute left-1/2 top-[78px] inline-flex -translate-x-1/2 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
        Tanya Pembangunan.AI
      </span>
      <div className="ai-cta-copy absolute left-[106px] top-[103px] z-[1] w-[586px]">
        <h2
          id="ai-cta-title"
          className="m-0 mb-3 text-4xl leading-[54px] text-ink"
        >
          Punya Pertanyaan tentang
          <br />
          <span className="bg-gradient-to-r from-primary-dark via-primary to-soft-blue bg-clip-text text-transparent">
            SMK Negeri 26 Jakarta?
          </span>
        </h2>
        <p className="text-lg font-medium leading-[30px] text-muted">
          Temukan informasi tentang jurusan, program sekolah, fasilitas,
          pendaftaran, hingga berbagai layanan SMK Negeri 26 Jakarta bersama{" "}
          <strong className="font-extrabold text-primary-dark">
            Pembangunan.AI
          </strong>
          .
        </p>
        <button
          className="group primary-button mt-8 inline-flex items-center gap-4 rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-[13px] text-sm font-semibold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] hover:border hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none"
          type="button"
          onClick={onAskAi}
        >
          Mulai Bertanya{" "}
          <span
            className="size-5 shrink-0 bg-white group-hover:bg-primary"
            style={{
              maskImage: `url(${figmaAssets.icons.arrowRight})`,
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskImage: `url(${figmaAssets.icons.arrowRight})`,
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
            }}
            aria-hidden="true"
          />
        </button>
      </div>
      <span className="ai-circle ai-circle-small absolute left-[1253px] top-[137px] size-[61px] rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue" />
      <span className="ai-circle ai-circle-large absolute left-[770px] top-[374px] size-[92px] rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue" />
      <div
        className="ai-cta-art absolute left-[859px] top-[78px] size-[418px]"
        aria-label="Ilustrasi Pembangunan.AI"
      >
        <img
          className="ai-cta-layer ai-cta-fill absolute left-[26px] top-[27px] size-[365px] transition-[top] duration-1000 ease-out"
          style={{ top: botSettled ? "31px" : "27px" }}
          src={figmaAssets.aiCtaLayers.fill}
          alt=""
        />
        <img
          className="ai-cta-layer ai-cta-ring absolute left-[26px] top-[27px] size-[365px]"
          src={figmaAssets.aiCtaLayers.ring}
          alt=""
        />
        <img
          className="ai-cta-layer ai-cta-outline absolute left-0 top-0 h-[417px] w-[418px] transition-[top] duration-1000 ease-out"
          style={{ top: botSettled ? "2px" : "0px" }}
          src={figmaAssets.aiCtaLayers.outline}
          alt=""
        />
        <img
          ref={botRef}
          className="ai-cta-bot absolute left-[66px] top-[64px] size-[285px] object-contain transition-[top] duration-1000 ease-out"
          style={{ top: botSettled ? "68px" : "64px" }}
          src={figmaAssets.aiCtaLayers.bot}
          alt=""
        />
      </div>
    </section>
  );
}
