import { useEffect, useRef, useState } from "react";
import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { useFloatShapes } from "../lib/useFloatShapes";

function MarsBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <span className="size-2 rounded-full bg-soft-blue" aria-hidden="true" />
      {children}
    </span>
  );
}

export function MarsPage() {
  const ringRef = useRef<HTMLImageElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const ballLeftRef = useRef<HTMLImageElement>(null);
  const ballRightRef = useRef<HTMLImageElement>(null);
  const [playState, setPlayState] = useState<"idle" | "hover" | "pressed">(
    "idle",
  );

  useFloatShapes([
    { ref: ballLeftRef, duration: 3200, distance: -12 },
    { ref: ballRightRef, duration: 4100, distance: 16 },
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
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#F4F8FF] text-ink">
      <PublicNavbar />
      <main>
        <section
          className="relative h-[830px] overflow-hidden bg-[#F4F8FF] text-ink max-md:h-[650px]"
          aria-labelledby="mars-title"
        >
          <img
            ref={ballLeftRef}
            className="pointer-events-none absolute left-2 top-[118px] z-[1] size-12 object-contain md:left-[5%] md:top-[120px] md:size-[120px]"
            src={figmaAssets.profile.marsHeroBallLeft}
            alt=""
            aria-hidden="true"
          />
          <img
            ref={ballRightRef}
            className="pointer-events-none absolute right-2 top-[178px] z-[1] size-12 object-contain md:right-[5%] md:top-[205px] md:size-[120px]"
            src={figmaAssets.profile.marsHeroBallRight}
            alt=""
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-[112px] z-[7] flex w-[872px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center text-center max-md:top-[96px]">
            <MarsBadge>IDENTITAS SEKOLAH</MarsBadge>
            <h1
              id="mars-title"
              className="my-[24px] mb-[10px] text-[36px] font-bold leading-[54px] max-md:mt-[18px] max-md:text-[30px] max-md:leading-[42px]"
            >
              <span className="text-primary-dark">MARS</span> SMK Negeri 26
              Jakarta
            </h1>
            <p className="w-[578px] max-w-full text-lg font-medium leading-[30px] text-muted max-md:text-base max-md:leading-[26px]">
              Sebuah lagu yang merepresentasikan semangat, perjuangan, dan
              kebanggaan keluarga besar SMK Negeri 26 Jakarta.
            </p>
          </div>
          <img
            className="pointer-events-none absolute bottom-[-20px] left-1/2 z-[2] h-auto w-[1100px] max-w-none -translate-x-1/2 max-md:w-[760px]"
            src={figmaAssets.profile.marsHeroBackground}
            alt=""
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-[300px] z-[5] box-border h-[450px] w-[900px] -translate-x-1/2 overflow-hidden rounded-[24px] border-[12px] border-white bg-white shadow-[0_12px_40px_rgba(15,23,42,.12)] max-[1271px]:w-[calc(100%-48px)] max-md:top-[230px] max-md:h-[280px] max-md:w-[calc(100%-32px)] max-md:rounded-[20px] max-md:border-[8px]">
            <img
              className="block size-full object-cover object-center"
              src={figmaAssets.videoProfile.preview}
              alt="Mars SMK Negeri 26 Jakarta"
            />
            <div
              className="absolute inset-0 z-[1] bg-[rgba(0,108,220,.04)]"
              aria-hidden="true"
            />
            <a
              className="group absolute left-1/2 top-1/2 z-10 grid size-[122px] -translate-x-1/2 -translate-y-1/2 place-items-center"
              href="#mars-lyrics"
              aria-label="Buka lirik Mars SMKN 26"
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
                className="pointer-events-none absolute left-[11.8px] top-[11.8px] z-[2] size-[98.4px] object-fill"
                style={ringStyle}
                src={figmaAssets.videoProfile.playRing}
                alt=""
              />
              <span
                className="video-play-button pointer-events-none relative grid size-[98.4px] place-items-center rounded-full border-2 border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,.16)] [transition:transform_110ms_cubic-bezier(0.25,1,0.5,1),box-shadow_300ms_cubic-bezier(0.25,1,0.5,1)] group-focus-visible:[box-shadow:0_5px_16px_rgba(15,23,42,.16)]"
                style={innerStyle}
              >
                <img
                  className="size-[52px]"
                  src={figmaAssets.videoProfile.playIcon}
                  alt=""
                />
              </span>
            </a>
          </div>
        </section>

        <section className="min-h-[500px] bg-[#F4F8FF] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px] text-center">
            <MarsBadge>TENTANG MARS</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">
              <span className="text-ink">Derap Langkah</span>{" "}
              <span className="text-primary-dark">Cita Bersama</span>
            </h2>

            <div className="relative mx-auto mt-12 h-[219px] max-w-[1272px] overflow-hidden rounded-3xl bg-white p-8 text-left shadow-[0_4px_16px_rgba(15,23,42,.06)] md:p-12">
              <img
                className="pointer-events-none absolute right-[-18%] top-0 h-full w-auto max-w-[58%] object-contain opacity-60 md:right-0 md:max-w-none md:opacity-100"
                src="/assets/figma/profile/VISI SEKOLAHujung.png"
                alt=""
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-center gap-2">
                <img
                  className="size-[22px] object-contain"
                  src="/assets/figma/profile/icondisampingjudulvisimisi.png"
                  alt=""
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-soft-blue">
                  TENTANG MARS
                </span>
              </div>
              <p className="relative z-10 mt-5 max-w-[927px] text-lg font-bold leading-[30px] ">
                Mars SMK Negeri 26 Jakarta merupakan bagian dari identitas
                sekolah yang mencerminkan semangat belajar, bekerja, dan
                membangun. Lagu ini menjadi salah satu representasi semangat dan
                kebanggaan keluarga besar SMK Negeri 26 Jakarta.
              </p>
              <img
                className="absolute bottom-6 left-12 h-[5px] w-[64px] object-fill"
                src="/assets/figma/profile/GARISBAWAHVISISEKOLAH.png"
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section
          id="mars-lyrics"
          className="mx-auto min-h-[696px] w-[min(1272px,100%-32px)] py-20 md:py-24"
        >
          <div className="text-center">
            <MarsBadge>LIRIK MARS</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">
              <span className="text-primary-dark">Lirik Mars</span>{" "}
              <span className="text-ink">SMK Negeri 26 Jakarta</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[900px] text-lg leading-[30px] text-muted">
              Derap langkah cita bersama, menjadi pengingat semangat untuk terus
              belajar, bekerja, dan membangun.
            </p>
            <div className="mx-auto mt-10 grid max-w-[1272px] gap-8 text-left md:grid-cols-2 md:gap-9">
              <div className="rounded-[28px] bg-white p-8 shadow-[0_4px_16px_rgba(15,23,42,.08)] md:p-10">
                <p className="whitespace-pre-line text-lg font-medium leading-[27px] text-ink">
                  {`Derap Langkah Cita Bersama
Belajar bekerja membangun bangsa

Sebagai pusaka panji-panji suci
SMK 26 kepada ibu pertiwi

Paku jiwa sungguh terpatri
Tingkatkan kompetensi anak negeri

Sebagai patriot pejuang sejati
Hadapi tantangan teknologi mendatang

Kami ada di depan persada
Bina cipta hadirkan karya

Janji kami di gerbang hati
Demi sekolah yang kucintai`}
                </p>
              </div>
              <div className="rounded-[28px] bg-white p-8 shadow-[0_4px_16px_rgba(15,23,42,.08)] md:p-10">
                <span className="inline-flex rounded-full bg-primary-dark px-5 py-2 text-base font-bold text-white">
                  Reff:
                </span>
                <p className="mt-5 whitespace-pre-line text-lg font-medium leading-[27px] text-ink">
                  {`Ayo ayo giat belajar
Ayo ayo semangat bekerja

Ayo ayo prestasi membangun
Semoga SMK Negeri 26 jaya

Pasti SMK Negeri 26 jayalah terus`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[575px] bg-school-bg px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px] text-center">
            <MarsBadge>PENCIPTA MARS</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px] text-ink max-md:text-[28px] max-md:leading-[40px]">
              <span className="text-primary-dark">Diciptakan untuk</span> SMK
              Negeri 26 Jakarta
            </h2>
            <p className="mx-auto mt-4 max-w-[858px] text-lg leading-[30px] text-muted max-md:text-base max-md:leading-7">
              MARS SMK Negeri 26 Jakarta lahir dari dedikasi dan kecintaan
              terhadap sekolah, sebagai wujud semangat untuk terus melangkah,
              belajar, bekerja, dan membangun masa depan bersama.
            </p>
            <div className="mx-auto mt-12 grid max-w-[900px] gap-8 md:grid-cols-2 md:gap-[52px]">
              {[
                ["Bu Derliana", figmaAssets.profile.creatorBuDerliana],
                ["Pak Sutaryo", figmaAssets.profile.creatorPakSutaryo],
              ].map(([name, image]) => (
                <article
                  className="group relative flex flex-col items-center rounded-[28px] bg-white px-8 py-6 text-center shadow-[0_8px_24px_rgba(15,23,42,.08)] md:min-h-[156px] md:flex-row md:items-center md:py-0 md:pl-[208px] md:pr-6 md:text-left"
                  key={name}
                >
                  <img
                    className="size-[140px] rounded-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03] md:absolute md:left-0 md:top-1/2 md:size-[172px] md:-translate-y-1/2"
                    src={image}
                    alt={name}
                  />
                  <div className="mt-4 md:mt-0">
                    <h3 className="text-2xl font-bold leading-9 text-primary-dark">
                      {name}
                    </h3>
                    <img
                      className="mt-1 h-auto  object-contain max-md:mx-auto"
                      src="/assets/figma/decorations/Rectangle 93 (1).png"
                      alt=""
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-base leading-6 text-muted">
                      Pencipta MARS SMK Negeri 26 Jakarta
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="min-h-[578px] bg-[#F4F8FF] px-6 py-14 text-ink md:px-10 md:py-16">
          <div className="mx-auto max-w-[1272px] text-center">
            <MarsBadge>SEMANGAT YANG KAMI BAWA</MarsBadge>
            <h2 className="mt-5 text-[40px] font-bold leading-[52px] max-md:text-[30px] max-md:leading-10">
              BELAJAR, BEKERJA,{" "}
              <span className="text-primary-dark">MEMBANGUN</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[887px] text-lg leading-[30px] text-[#5b7098] max-md:text-base max-md:leading-7">
              Derap langkah cita bersama, menjadi pengingat semangat untuk terus
              belajar, bekerja, dan membangun.
            </p>
            <div className="mt-8 grid gap-6 text-left md:grid-cols-3">
              {[
                [
                  "Belajar",
                  [
                    "Terus mengembangkan",
                    "pengetahuan dan kompetensi",
                    "untuk menghadapi masa depan.",
                  ],
                ],
                [
                  "Bekerja",
                  [
                    "Membangun keterampilan,",
                    "profesionalisme, dan kesiapan",
                    "menghadapi dunia kerja.",
                  ],
                ],
                [
                  "Membangun",
                  [
                    "Menghasilkan karya dan",
                    "kontribusi bagi sekolah,",
                    "masyarakat, dan bangsa.",
                  ],
                ],
              ].map(([title, description]) => {
                const lines = Array.isArray(description)
                  ? description
                  : [description];
                return (
                  <article
                    className="min-h-[248px] rounded-[28px] border-2 border-[#e2f1fb] bg-white px-7 py-5 shadow-[0_2px_8px_rgba(15,23,42,.02)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,.22)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_14px_34px_rgba(15,23,42,.22)]"
                    key={String(title)}
                  >
                    <div className="flex items-center gap-6">
                      <img
                        className="size-[68px] shrink-0 object-contain"
                        src="/assets/figma/mars/SEMANGATlogo.png"
                        alt=""
                        aria-hidden="true"
                      />
                      <h3 className="text-[30px] font-bold leading-9 text-primary-dark">
                        {String(title)}
                      </h3>
                    </div>
                    <p className="ml-[94px] mt-3 text-left text-[18px] leading-[33px] text-[#5b7098] max-md:ml-0 max-md:text-lg max-md:leading-7">
                      {lines.map((line) => (
                        <span
                          className="block whitespace-nowrap max-md:whitespace-normal"
                          key={line}
                        >
                          {line}
                        </span>
                      ))}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
