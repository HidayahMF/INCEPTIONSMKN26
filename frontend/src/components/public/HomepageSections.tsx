import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { figmaAssets } from "../../assets/figmaAssets";
import { newsItems } from "../../data/news";
import { useFloatShapes } from "../../lib/useFloatShapes";
import { NewsCard } from "./NewsCard";

type Props = { onAskAi: () => void };
const bludCards = [
  [
    "KGStudio",
    "Mengasah keterampilan melalui produksi dan layanan kreatif.",
    "/blud/kgstudio",
  ],
  [
    "UPTECHNO",
    "Mengembangkan solusi teknologi sesuai kebutuhan industri.",
    "/blud/uptechno",
  ],
  [
    "E-MAN",
    "Menerapkan kompetensi kelistrikan dalam praktik nyata.",
    "/blud/e-man",
  ],
  [
    "Manufaktur26",
    "Mengenal proses produksi dan pembuatan komponen manufaktur.",
    "/blud/manufaktur26",
  ],
  [
    "Garage26",
    "Praktik langsung dalam perawatan dan perbaikan kendaraan.",
    "/blud/garage26",
  ],
  [
    "GADIZ VOKASI",
    "Mengubah kompetensi vokasi menjadi produk dan layanan.",
    "/blud/gadiz-vokasi",
  ],
] as const;
const achievementCards = [
  [
    "Tim Basket",
    "Juara 1 kategori student Ciara Student Orienteering 4 - Tingkat nasional",
    "/assets/home/achievements/achievements-raw-08.png",
  ],
  [
    "Tim Futsal",
    "Juara 1 Kofesse Cup - Tingkat Provinsi",
    "/assets/home/achievements/achievements-raw-03.png",
  ],
  [
    "Paskibra Swabhangun",
    "Harapan 3 | Juara Make Up 2 | Juara Utama 1 | Variasi Formasi Terbaik",
    "/assets/home/achievements/achievements-raw-01.png",
  ],
  [
    "Tim Pramuka",
    "Juara Umum 3 Putra | Juara 2 Tari Tradisional Putra - Kwartir JakTim",
    "/assets/home/achievements/achievements-raw-04.png",
  ],
  [
    "Tim Voli",
    "Juara 2 Galaxy Cup 2025 - Tingkat Wilayah",
    "/assets/home/achievements/achievements-raw-07.png",
  ],
] as const;
const newsCards = newsItems;
const programRightCards = [
  [
    "Lembaga Sertifikasi Profesi",
    "Validasi kompetensi, siapkan diri untuk dunia kerja.",
    "/assets/home/programs/programs-raw-07.png",
    "/programs/lsp",
  ],
  [
    "OSIS & MPK",
    "Tempat belajar memimpin, berkolaborasi, dan berkontribusi.",
    "/assets/home/programs/programs-raw-10.png",
    "/programs/organisasi",
  ],
  [
    "Bursa Kerja Khusus",
    "Menghubungkan kompetensi siswa dengan peluang kerja.",
    "/assets/home/programs/programs-raw-02.png",
    "/programs/bkk",
  ],
] as const;
const programPanels = [
  "/assets/home/programs/programs-raw-04.png",
  "/assets/home/programs/programs-raw-06.png",
  "/assets/home/programs/programs-raw-03.png",
] as const;
const programArrow = "/assets/home/programs/programs-svg-01.svg";
const programCtaArrow = "/assets/shared/icons/arrow-right.svg";
const programBadgeIcon = "/assets/shared/icons/section-badge.svg";

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
  const decorationLeftRef = useRef<HTMLImageElement>(null);
  const decorationRightRef = useRef<HTMLImageElement>(null);
  const [playState, setPlayState] = useState<"idle" | "hover" | "pressed">(
    "idle",
  );

  useFloatShapes([
    { ref: decorationLeftRef, duration: 3200, distance: 18 },
    { ref: decorationRightRef, duration: 3200, distance: -18 },
  ]);

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
      [
        { transform: "scale(1)", opacity: 0.9 },
        { transform: "scale(1.154)", opacity: 0 },
      ],
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
      className="video-profile relative h-[830px] overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-soft-blue text-white max-md:h-[760px]"
      aria-labelledby="video-profile-title"
    >
      <img
        ref={decorationLeftRef}
        className="pointer-events-none absolute left-[-73px] top-[92px] z-[2] block size-[245px] max-md:left-[-145px] max-md:top-[120px]"
        src={figmaAssets.videoProfile.decorationLeft}
        alt=""
        aria-hidden="true"
      />
      <img
        ref={decorationRightRef}
        className="pointer-events-none absolute right-[-55px] top-[415px] z-[2] block size-[180px] max-md:right-[-60px] max-md:top-[420px]"
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
        <span data-aos="fade-down" className="inline-flex items-center rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium leading-5 text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img
            className="mr-[7px] size-[17px]"
            src={figmaAssets.videoProfile.badgeIcon}
            alt=""
          />
          VIDEO PROFILE
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          id="video-profile-title"
          className="my-[24px] mb-[10px] max-w-[720px] text-[36px] font-bold leading-[54px] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] max-md:mt-[18px] max-md:max-w-[320px] max-md:text-[28px] max-md:leading-[36px]"
        >
          Kenali SMKN 26 Jakarta lebih Dekat
        </h2>
        <p data-aos="fade-up" data-aos-delay="180" className="w-[578px] max-w-full text-lg font-medium leading-[30px] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] max-md:text-base max-md:leading-[26px]">
          Satu sekolah, banyak cerita, dan langkah nyata untuk belajar, bekerja,
          dan membangun masa depan.
        </p>
      </div>
      <div data-aos="zoom-in" data-aos-delay="240" className="absolute left-1/2 top-[259px] z-[5] box-border h-[500px] w-[1000px] -translate-x-1/2 overflow-hidden rounded-[24px] border-[12px] border-white max-[1271px]:w-[calc(100%-48px)] max-md:top-[270px] max-md:h-[280px] max-md:w-[calc(100%-32px)] max-md:rounded-[20px] max-md:border-[8px]">
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
  const cardRef = useRef<HTMLElement>(null);
  const [slideWidth, setSlideWidth] = useState(532);

  // Measure the feature card's inner width so the ekstrakurikuler slider tracks
  // the viewport on mobile (desktop keeps its fixed 532px slide).
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const measure = () => {
      const styles = getComputedStyle(card);
      const inner =
        card.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      setSlideWidth(mobile ? inner : 532);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

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
        <span data-aos="fade-down" className="section-badge inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img src={programBadgeIcon} alt="" />
          PROGRAM SMK NEGERI 26 JAKARTA
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          id="programs-title"
          className="mt-5 mb-2.5 text-4xl font-bold leading-[54px] text-ink max-md:text-[28px] max-md:leading-9"
        >
          Berkembang di Dalam dan{" "}
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">
            di Luar Kelas
          </span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="180" className="mx-auto max-w-[774px] text-base leading-6 text-muted">
          Ruang bagi siswa untuk mengembangkan kompetensi, pengalaman,
          kepemimpinan, dan potensi melalui berbagai program sekolah.
        </p>
      </div>
      <div className="program-grid grid h-[468px] grid-cols-[580px_580px] gap-6 max-md:h-auto max-md:grid-cols-1 max-md:gap-4">
        <article data-aos="fade-right" data-aos-delay="200" ref={cardRef} className="program-slider program-feature-card relative box-border h-[468px] w-[580px] overflow-hidden rounded-3xl border-4 border-white bg-white px-[22px] pt-[23px] max-md:h-auto max-md:w-full max-md:px-4 max-md:pt-4 max-md:pb-5">
          <div
            className="program-panel-track flex h-[299px] w-max gap-6 max-md:h-auto"
            style={{
              transform: `translateX(${-(slideWidth + 24) * panel}px)`,
              transition: `transform ${panel === 0 ? 0 : 1458.4209919}ms cubic-bezier(.2,.7,.2,1)`,
            }}
          >
            {programPanels.map((src, index) => (
              <img
                className="block shrink-0 rounded-[18px] object-cover"
                key={src}
                src={src}
                alt={`Panel ekstrakurikuler ${index + 1}`}
                draggable={false}
                style={{ width: slideWidth, height: slideWidth * (299 / 532) }}
              />
            ))}
          </div>
          <div className="program-feature-copy pt-4">
            <h3 className="m-0 bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-2xl font-bold text-transparent">
              Ekstrakurikuler
            </h3>
            <p className="my-1 mb-3 text-xs leading-[18px] text-ink">
              Temukan ruang untuk berkembang sesuai minat dan bakatmu.
            </p>
            <a
              className="group primary-button inline-flex h-[41px] items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 text-sm font-bold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] hover:border hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none"
              href="/programs/ekstrakurikuler"
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
        <div data-aos="fade-up" data-aos-delay="200" className="program-cards grid grid-rows-[repeat(3,140px)] gap-5 max-md:grid-rows-none">
          {programRightCards.map(([title, description, image, href]) => (
            <article
              className="program-card relative flex h-[140px] w-[580px] cursor-pointer items-center gap-6 overflow-hidden rounded-3xl border-2 border-school-bg bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:shadow-[0_12px_28px_rgba(15,23,42,.16)] focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:shadow-[0_12px_28px_rgba(15,23,42,.16)] max-md:h-auto max-md:w-full max-md:flex-col max-md:items-stretch max-md:gap-0"
              onClick={(event) => {
                if (!(event.target instanceof Element) || !event.target.closest("a")) {
                  window.location.href = href;
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  window.location.href = href;
                }
              }}
              role="link"
              tabIndex={0}
              key={title}
            >
              <img
                className="h-[136px] w-[290px] shrink-0 object-cover max-md:h-auto max-md:w-full max-md:aspect-[290/136]"
                src={image}
                alt=""
                draggable={false}
              />
              <div className="program-card-content grid w-[237px] min-w-[237px] max-w-[237px] flex-none grid-cols-[minmax(0,1fr)_45px] grid-rows-[auto_1fr] items-center gap-x-2 p-0 max-md:max-w-none max-md:min-w-0 max-md:w-full max-md:p-4 max-md:gap-x-3">
                <h3 className="col-start-1 row-start-1 m-0 bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-base font-bold leading-tight text-transparent max-md:text-lg">
                  {title}
                </h3>
                <p className="col-start-1 row-start-2 m-0 w-full text-[10px] leading-[18px] text-ink max-md:text-xs">
                  {description}
                </p>
                <a
                  className="group col-start-2 row-span-2 row-start-1 inline-flex size-[45px] items-center justify-center rounded-full border border-slate-200 bg-white transition-none hover:border-primary focus-visible:border-primary hover:bg-primary focus-visible:bg-primary"
                  href={href}
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
    <section className="relative mt-[88px] w-full bg-[#F4F8FF] py-14">
      <div
        className="blud-section relative mx-auto h-[629px] w-[min(1272px,100%-32px)] overflow-visible p-0 max-md:h-auto"
        aria-labelledby="blud-title"
      >
        <div className="section-intro blud-intro relative mb-[31px] w-full text-left">
          <div className="flex justify-center">
            <span data-aos="fade-down" className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
              <img
                className="h-[17px] w-[13.6px]"
                src={figmaAssets.blud.badgeIcon}
                alt=""
              />
              BELAJAR • BERKARYA • MENGHASILKAN
            </span>
          </div>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            id="blud-title"
            className="mt-5 mb-2.5 text-4xl font-bold leading-[54px] text-ink max-md:text-[28px] max-md:leading-9"
          >
            Belajar Melalui{" "}
            <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">
              Pengalaman Nyata
            </span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="180" className="mt-1 max-w-[698px] text-lg leading-[30px] text-muted max-md:text-base max-md:leading-[26px]">
            Menghubungkan pembelajaran dengan pengalaman kerja melalui unit
            produksi dan layanan yang dikelola oleh SMK Negeri 26 Jakarta.
          </p>
          <a
             className="group blud-cta primary-button absolute right-0 bottom-2 inline-flex h-[41px] shrink-0 items-center justify-center gap-4 whitespace-nowrap rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-[13px] text-sm font-bold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] hover:border hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none min-[1600px]:top-[135px] min-[1600px]:bottom-auto max-md:static max-md:mt-2 max-md:w-full"
            href="/blud/kgstudio"
          >
            Jelajahi BLUD{" "}
            <span
               className="size-5 shrink-0 bg-white transition-colors group-hover:bg-primary"
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
        <div className="blud-grid grid grid-cols-3 grid-rows-2 gap-6 overflow-visible max-md:grid-cols-1 max-md:grid-rows-none">
          {bludCards.map(([name, description, href], index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 80, 320)}
              className="relative min-w-0"
              key={name}
            >
               <a href={href} className="group blud-card relative flex h-[200px] min-w-0 flex-col justify-between overflow-hidden rounded-3xl border-2 border-school-bg bg-white p-[18px] no-underline">
                <span className="pointer-events-none absolute right-[-126px] top-[-8px] z-0 size-[210px] rounded-full bg-gradient-to-br from-[#006cdc] to-[#009cff] opacity-0 transition-[right,opacity] duration-300 ease-out group-hover:right-[-118px] group-hover:opacity-100 group-focus-visible:right-[-118px] group-focus-visible:opacity-100" aria-hidden="true">
                  <span className="absolute inset-[7px] rounded-full border border-white/80" />
                </span>
                <span className="blud-icon relative z-[1] grid size-[54px] shrink-0 aspect-square place-items-center rounded-full bg-gradient-to-br from-primary-dark to-soft-blue">
                  <img
                    className="size-[29.455px]"
                    src={figmaAssets.blud.icons[index]}
                    alt=""
                  />
                </span>
                <h3 className="relative z-[1] m-0 bg-gradient-to-r from-primary-dark to-soft-blue bg-clip-text text-2xl leading-[29px] font-bold text-transparent min-[1600px]:mt-5 min-[1600px]:text-[30px] min-[1600px]:leading-9">
                  {name}
                </h3>
                <p
                  className={`relative z-[1] m-0 h-[36px] overflow-hidden text-[12px] font-normal leading-[18px] tracking-[0%] text-ink ${bludCardTextWidth[index]}`}
                >
                  {description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const achievementBadgeIcon = "/assets/shared/icons/section-badge.svg";

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
        <span data-aos="fade-down" className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img
            className="h-[17px] w-[13.6px]"
            src={achievementBadgeIcon}
            alt=""
          />
          PRESTASI SMK NEGERI 26 JAKARTA
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          id="achievements-title"
          className="mt-5 mb-2.5 text-4xl font-bold leading-[54px] text-ink max-md:text-[28px] max-md:leading-9"
        >
          Karya dan{" "}
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">
            Prestasi Siswa
          </span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="180" className="mx-auto w-[774px] max-w-full text-base leading-6 text-muted">
          Berbagai pencapaian siswa menjadi bagian dari perjalanan SMK Negeri 26
          Jakarta dalam mengembangkan talenta dan potensi generasi muda.
        </p>
      </div>
      <div data-aos="fade-up" data-aos-delay="200" className="achievement-carousel flex w-full max-w-full items-center gap-3 px-11 min-[640px]:px-14 min-[768px]:relative min-[768px]:block min-[768px]:h-[296px] min-[1272px]:w-[1272px] min-[1272px]:max-w-none min-[1272px]:px-0 max-md:relative max-md:px-0">
        <button
          type="button"
          className="group grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-school-bg bg-white text-[22px] text-primary-dark hover:bg-primary-dark focus-visible:bg-primary-dark md:absolute md:top-[114px] md:z-[2] md:size-12 md:border-slate-200 min-[768px]:max-[1271.98px]:left-1 min-[1272px]:left-[-57px] max-md:absolute max-md:top-[134px] max-md:z-[2] max-md:left-2"
          aria-label="Prestasi sebelumnya"
          onClick={() => scrollByStep(-1)}
        >
          <img
            className="size-6 transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            src={figmaAssets.advantages.arrowLeft}
            alt=""
          />
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
              className={`group/achievement achievement-card relative h-[296px] w-[237px] shrink-0 overflow-hidden rounded-[10.9px] border-2 border-white bg-ink transition-none max-[1271.98px]:[scroll-snap-align:start] ${isDragging ? " pointer-events-none" : ""}`}
              tabIndex={0}
              key={src}
            >
              <img
                className="block h-full w-full object-cover [-webkit-user-drag:none]"
                src={src}
                alt=""
                draggable={false}
              />
              <div
                 className="pointer-events-none absolute left-0 right-0 top-[79px] h-[217px] bg-gradient-to-b from-transparent to-[#000059] opacity-0 transition-opacity duration-300 ease-out group-hover/achievement:opacity-100 group-focus-within/achievement:opacity-100"
                aria-hidden="true"
              />
               <div className="achievement-card-content pointer-events-none absolute bottom-[14px] left-4 right-0 z-[1] flex w-[216px] [transform:translateY(12px)] flex-col items-start justify-end opacity-0 shadow-[0_4px_7px_rgba(0,0,0,.1)] transition-[opacity,transform] duration-300 ease-out group-hover/achievement:pointer-events-auto group-hover/achievement:[transform:translateY(0)] group-hover/achievement:opacity-100 group-focus-within/achievement:pointer-events-auto group-focus-within/achievement:[transform:translateY(0)] group-focus-within/achievement:opacity-100">
                <h3 className="text-[20px] font-bold leading-[24.2px] text-white">
                  {title}
                </h3>
                <p className="mt-1 mb-2.5 w-[216px] text-xs leading-[14.5px] text-white">
                  {description}
                </p>
                <a
                  className="group/achievement-button inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium leading-[18px] text-primary no-underline shadow-[0_4px_15px_rgba(15,23,42,.08)] transition-[background-color,background-image,color,box-shadow] duration-300 ease-out [-webkit-user-drag:none] hover:bg-[linear-gradient(105deg,#006cdc,#0092ff,#4cbaf5)] hover:text-white focus-visible:bg-[linear-gradient(105deg,#006cdc,#0092ff,#4cbaf5)] focus-visible:text-white"
                  href="/achievements"
                >
                  Lihat Detail{" "}
                  <span className="relative inline-flex size-[18px] shrink-0" aria-hidden="true">
                    <img
                      className="absolute inset-0 size-[18px] object-contain opacity-100 transition-opacity duration-300 group-hover/achievement-button:opacity-0 group-focus-visible/achievement-button:opacity-0"
                      src="/assets/shared/icons/secondary-arrow-right.svg"
                      alt=""
                    />
                    <img
                      className="absolute inset-0 size-[18px] object-contain opacity-0 transition-opacity duration-300 group-hover/achievement-button:opacity-100 group-focus-visible/achievement-button:opacity-100"
                      src="/assets/shared/icons/arrow-right.svg"
                      alt=""
                    />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="group grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-school-bg bg-white text-[22px] text-primary-dark hover:bg-primary-dark focus-visible:bg-primary-dark md:absolute md:top-[114px] md:z-[2] md:size-12 md:border-slate-200 min-[768px]:max-[1271.98px]:right-1 min-[1272px]:right-[-57px] max-md:absolute max-md:top-[134px] max-md:z-[2] max-md:right-2"
          aria-label="Prestasi berikutnya"
          onClick={() => scrollByStep(1)}
        >
          <img
            className="size-6 transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            src={figmaAssets.advantages.arrowRight}
            alt=""
          />
        </button>
      </div>
      <div data-aos="fade-up" data-aos-delay="240" className="achievement-stats mx-auto mt-9 grid h-[122px] w-[calc(100%-78px)] grid-cols-5 items-center gap-5 rounded-3xl bg-white px-7 py-5 text-ink [box-shadow:0_4px_16px_rgba(15,23,42,.06)] transition-[box-shadow] duration-300 ease-out hover:[box-shadow:0_4px_16px_rgba(15,23,42,.08)] focus-within:[box-shadow:0_4px_16px_rgba(15,23,42,.08)] max-md:h-auto max-md:w-full max-md:grid-cols-1 max-md:gap-4 max-md:px-5 max-md:py-6">
        {[
          [
            "100+",
            "Prestasi",
            "/assets/home/achievements/achievements-svg-12.svg",
          ],
          [
            "10",
            "Tingkat Internasional",
            "/assets/home/achievements/achievements-svg-03.svg",
          ],
          [
            "56",
            "Tingkat Nasional",
            "/assets/home/achievements/achievements-svg-03.svg",
          ],
          [
            "24",
            "Tingkat Provinsi",
            "/assets/home/achievements/achievements-svg-03.svg",
          ],
          [
            "30",
            "Tingkat Kota",
            "/assets/home/achievements/achievements-svg-03.svg",
          ],
        ].map(([value, label, icon], index) => (
          <div
            className="relative grid grid-cols-[70px_auto] items-center justify-center gap-x-3 max-md:mx-auto max-md:w-[250px] max-md:justify-start"
            key={label}
          >
            <span className="stat-icon row-span-2 grid size-[70px] place-items-center rounded-full bg-[linear-gradient(135deg,#4cbaf5_0%,#0092ff_50%,#006cdc_100%)] text-white">
              <img
                className="h-[33px] w-[33px] object-contain"
                src={icon}
                alt=""
              />
            </span>
            <strong className="text-[36px]">{value}</strong>
            <p className="m-0 text-xs leading-[18px] font-medium text-muted">
              {label}
            </p>
            {index < 4 && (
              <span
                className="pointer-events-none absolute right-[-10px] h-[86px] border-r border-dashed border-primary max-md:hidden"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const newsBadgeIcon = "/assets/shared/icons/section-badge.svg";

function NewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerX: 0, scrollLeft: 0 });
  const draggedRef = useRef(false);
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

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { pointerX: event.clientX, scrollLeft: track.scrollLeft };
    draggedRef.current = false;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || event.buttons === 0) return;
    if (Math.abs(event.clientX - dragRef.current.pointerX) > 8) {
      if (!draggedRef.current) track.setPointerCapture(event.pointerId);
      draggedRef.current = true;
      setIsDragging(true);
    }
    track.scrollLeft =
      dragRef.current.scrollLeft - (event.clientX - dragRef.current.pointerX);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    setIsDragging(false);
    if (track && track.hasPointerCapture(event.pointerId))
      track.releasePointerCapture(event.pointerId);
  }

  function scrollByStep(direction: -1 | 1) {
    trackRef.current?.scrollBy({ left: direction * 424, behavior: "smooth" });
  }

  return (
    <section
       className="news-section relative mx-auto mt-[88px] h-[527px] w-[min(1272px,100%-32px)] pt-0 max-md:h-auto"
      aria-labelledby="news-title"
    >
      <div className="section-intro mx-auto w-[min(872px,100%)] text-center">
        <span data-aos="fade-down" className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
          <img className="h-[17px] w-[13.6px]" src={newsBadgeIcon} alt="" />
          BERITA SMK NEGERI 26 JAKARTA
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          id="news-title"
          className="mt-11 mb-2.5 text-4xl font-bold leading-[54px] text-ink max-md:mt-5 max-md:text-[28px] max-md:leading-9"
        >
          Berita &amp; Informasi Terkini
          <br />
          <span className="bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-transparent">
            SMK Negeri 26 Jakarta
          </span>
        </h2>
      </div>
      <a
        data-aos="fade-left"
        data-aos-delay="180"
        href="/news"
        className="group absolute right-0 top-[112px] inline-flex h-[41px] items-center justify-center gap-4 whitespace-nowrap rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-[13px] text-sm font-bold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] transition-[background,color,border-color,box-shadow,transform] duration-300 ease-out hover:border hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none motion-reduce:transition-none max-md:static max-md:mx-auto max-md:mt-5 max-md:flex max-md:w-fit"
      >
        Lihat Semua
        <span
          className="size-5 shrink-0 bg-white transition-colors group-hover:bg-primary group-focus-visible:bg-primary"
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
      <div className="max-md:relative">
       <div className="news-viewport absolute left-1/2 top-[195.02px] h-[332px] w-[1272px] max-w-full -translate-x-1/2 overflow-hidden max-md:static max-md:mt-6 max-md:h-[332px] max-md:w-full max-md:translate-x-0">
         <div
           className={`news-track flex h-[332px] cursor-grab select-none gap-6 overflow-x-auto overflow-y-hidden py-4 [scrollbar-width:none] ${isDragging ? "is-dragging cursor-grabbing" : ""}${isScrolling ? " is-scrolling pointer-events-none" : ""}`}
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {newsCards.map((card, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 100, 400)}
              className="shrink-0"
              key={card.title + card.date}
            >
               <NewsCard
                 news={card}
                 variant="homepage"
                 aosDelay={Math.min(index * 100, 400)}
                 onClick={(event) => {
                   if (draggedRef.current) {
                     event.preventDefault();
                     draggedRef.current = false;
                   }
                 }}
               />
            </div>
          ))}
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay="200" className="news-controls pointer-events-none absolute left-0 top-[314.02px] flex w-full justify-between gap-0 min-[1272px]:left-[-57px] min-[1272px]:w-[calc(100%+114px)] max-md:absolute max-md:top-[126px] max-md:z-[2] max-md:pl-2 max-md:pr-2">
        <button
          className="group pointer-events-auto grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white transition-colors hover:bg-primary-dark focus-visible:bg-primary-dark"
          type="button"
          aria-label="Berita sebelumnya"
          onClick={() => scrollByStep(-1)}
        >
          <img
            className="h-6 w-6 transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            src={figmaAssets.advantages.arrowLeft}
            alt=""
          />
        </button>
        <button
          className="group pointer-events-auto grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white transition-colors hover:bg-primary-dark focus-visible:bg-primary-dark"
          type="button"
          aria-label="Berita berikutnya"
          onClick={() => scrollByStep(1)}
        >
          <img
            className="h-6 w-6 transition-[filter] group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
            src={figmaAssets.advantages.arrowRight}
            alt=""
          />
        </button>
      </div>
      </div>
    </section>
  );
}

function AiCtaSection({ onAskAi }: Props) {
  const [botSettled, setBotSettled] = useState(false);
  const botRef = useRef<HTMLImageElement>(null);
  const smallCircleRef = useRef<HTMLSpanElement>(null);
  const largeCircleRef = useRef<HTMLSpanElement>(null);
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
  useEffect(() => {
    const circles: [HTMLElement | null, number, number][] = [
      [smallCircleRef.current, 3200, -12],
      [largeCircleRef.current, 4100, 16],
    ];
    const animations = circles
      .filter((circle): circle is [HTMLElement, number, number] =>
        Boolean(circle[0]),
      )
      .map(([element, duration, distance]) =>
        element.animate(
          [
            { transform: "translateY(0)" },
            { transform: `translateY(${distance}px)` },
            { transform: "translateY(0)" },
          ],
          { duration, iterations: Infinity, easing: "ease-in-out" },
        ),
      );
    return () => animations.forEach((animation) => animation.cancel());
  }, []);
  return (
    <section
      id="ai-cta"
      className={`ai-cta scroll-mt-28 relative mt-[88px] w-full bg-white ${botSettled ? "is-bot-settled" : ""}`}
      aria-labelledby="ai-cta-title"
    >
      <div className="relative mx-auto h-[536px] w-[1437px] max-w-[calc(100vw-3px)] overflow-hidden max-md:h-auto max-md:w-full max-md:max-w-full max-md:px-5 max-md:flex max-md:flex-col max-md:items-center">
        <span data-aos="fade-down" className="ai-cta-badge absolute left-1/2 top-[78px] inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)] max-md:static max-md:mt-14 max-md:translate-x-0">
          <img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />
          TANYA PEMBANGUNAN.AI
        </span>
        <div className="ai-cta-copy absolute left-[106px] top-[103px] z-[1] w-[586px] max-md:static max-md:mt-8 max-md:w-full max-md:text-center">
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            id="ai-cta-title"
            className="m-0 mb-3 text-4xl font-bold leading-[54px] text-ink max-md:mb-4 max-md:text-[28px] max-md:leading-9"
          >
            Punya Pertanyaan tentang
            <br />
            <span className="bg-gradient-to-r from-primary-dark via-primary to-soft-blue bg-clip-text text-transparent">
              SMK Negeri 26 Jakarta?
            </span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="180" className="text-lg font-medium leading-[30px] text-muted max-md:text-base max-md:leading-6">
            Temukan informasi tentang jurusan, program sekolah, fasilitas,
            pendaftaran, hingga berbagai layanan SMK Negeri 26 Jakarta bersama{" "}
            <strong className="font-bold text-primary-dark">
              Pembangunan.AI
            </strong>
            .
          </p>
          <button
            className="group primary-button mt-8 inline-flex items-center gap-4 rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-[13px] text-sm font-bold text-white shadow-[0_4px_8px_rgba(15,23,42,.08)] hover:border hover:border-slate-300 hover:bg-slate-100 hover:bg-none hover:text-primary hover:shadow-none focus-visible:border focus-visible:border-slate-300 focus-visible:bg-slate-100 focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none"
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
        <div
          className="ai-cta-art absolute left-[859px] top-[78px] size-[418px] max-md:relative max-md:left-auto max-md:top-auto max-md:mt-12 max-md:mb-8 max-md:w-[280px] max-md:h-[400px]"
          aria-label="Ilustrasi Pembangunan.AI"
        >
          <span
            ref={smallCircleRef}
            className="ai-circle ai-circle-small absolute left-[394px] top-[59px] size-[61px] rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue max-md:left-[200px] max-md:top-[-31px]"
          />
          <span
            ref={largeCircleRef}
            className="ai-circle ai-circle-large absolute left-[-89px] top-[296px] size-[92px] rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue max-md:left-0 max-md:top-[292px]"
          />
          <img
            className="ai-cta-layer ai-cta-fill absolute left-[26px] top-[27px] size-[365px] transition-[top] duration-1000 ease-out max-md:left-[10px] max-md:size-[260px]"
            style={{ top: botSettled ? "31px" : "27px" }}
            src={figmaAssets.aiCtaLayers.fill}
            alt=""
          />
          <img
            ref={botRef}
            className="ai-cta-bot absolute left-[66px] top-[64px] size-[285px] object-contain transition-[top] duration-1000 ease-out max-md:left-[47px] max-md:size-[186px]"
            style={{ top: botSettled ? "68px" : "64px" }}
            src={figmaAssets.aiCtaLayers.bot}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}






