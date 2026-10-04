import { useEffect, useRef, useState } from "react";
import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

function MarsBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <span className="size-2 rounded-full bg-soft-blue" aria-hidden="true" />
      {children}
    </span>
  );
}

export function MarsPage() {
  const ringRef = useRef<HTMLImageElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const [playState, setPlayState] = useState<"idle" | "hover" | "pressed">("idle");

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || playState !== "idle" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = ring.animate(
      [
        { width: "98.4px", height: "98.4px", left: "11.8px", top: "11.8px" },
        { width: "120px", height: "120px", left: "1px", top: "1px" },
      ],
      { duration: 1000, direction: "alternate", iterations: Infinity, easing: "ease-out" },
    );
    return () => animation.cancel();
  }, [playState]);

  useEffect(() => {
    const pulse = pulseRef.current;
    if (!pulse) return;
    const animation = pulse.animate(
      [{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(1.154)", opacity: 0 }],
      { duration: 1350, iterations: Infinity, easing: "cubic-bezier(.2,.65,.3,1)" },
    );
    return () => animation.cancel();
  }, []);

  const ringStyle = playState === "idle" ? undefined : { left: "1px", top: "1px", width: "120px", height: "120px", filter: "drop-shadow(0 0 2px rgba(255,255,255,.25))" };
  const innerStyle = { transform: playState === "pressed" ? "scale(.98)" : "none" };

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-ink">
      <PublicNavbar />
      <main>
        <section className="relative h-[830px] overflow-hidden bg-[#F4F8FF] text-ink max-md:h-[650px]" aria-labelledby="mars-title">
          <img className="pointer-events-none absolute left-[5%] top-[120px] z-[1] size-[100px] object-contain md:size-[120px]" src={figmaAssets.profile.marsHeroBallLeft} alt="" aria-hidden="true" />
          <img className="pointer-events-none absolute right-[5%] top-[205px] z-[1] size-[100px] object-contain md:size-[120px]" src={figmaAssets.profile.marsHeroBallRight} alt="" aria-hidden="true" />
          <div className="absolute left-1/2 top-[112px] z-[7] flex w-[872px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center text-center max-md:top-[96px]">
            <MarsBadge>IDENTITAS SEKOLAH</MarsBadge>
            <h1 id="mars-title" className="my-[24px] mb-[10px] text-[36px] font-extrabold leading-[54px] max-md:mt-[18px] max-md:text-[30px] max-md:leading-[42px]"><span className="text-primary-dark">MARS</span> SMK Negeri 26 Jakarta</h1>
            <p className="w-[578px] max-w-full text-lg font-semibold leading-[30px] text-muted max-md:text-base max-md:leading-[26px]">
              Sebuah lagu yang merepresentasikan semangat, perjuangan, dan kebanggaan keluarga besar SMK Negeri 26 Jakarta.
            </p>
          </div>
          <img className="pointer-events-none absolute bottom-[-20px] left-1/2 z-[2] h-auto w-[1100px] max-w-none -translate-x-1/2" src={figmaAssets.profile.marsHeroBackground} alt="" aria-hidden="true" />
          <div className="absolute left-1/2 top-[300px] z-[5] box-border h-[450px] w-[900px] -translate-x-1/2 overflow-hidden rounded-[24px] border-[12px] border-white bg-white shadow-[0_12px_40px_rgba(15,23,42,.12)] max-[1271px]:w-[calc(100%-48px)] max-md:top-[230px] max-md:h-[280px] max-md:w-[calc(100%-32px)] max-md:rounded-[20px] max-md:border-[8px]">
            <img className="block size-full object-cover object-center" src={figmaAssets.videoProfile.preview} alt="Mars SMK Negeri 26 Jakarta" />
            <div className="absolute inset-0 z-[1] bg-[rgba(0,108,220,.04)]" aria-hidden="true" />
            <a className="group absolute left-1/2 top-1/2 z-10 grid size-[122px] -translate-x-1/2 -translate-y-1/2 place-items-center" href="#mars-lyrics" aria-label="Buka lirik Mars SMKN 26" onPointerEnter={() => setPlayState("hover")} onPointerLeave={() => setPlayState("idle")} onPointerDown={() => setPlayState("pressed")} onPointerUp={() => setPlayState("hover")} onFocus={() => setPlayState((state) => (state === "pressed" ? state : "hover"))} onBlur={() => setPlayState("idle")}>
              <span ref={pulseRef} className="pointer-events-none absolute left-1/2 top-1/2 size-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3.5px] border-white/95 [filter:drop-shadow(0_0_4px_rgba(255,255,255,.38))]" aria-hidden="true" />
              <img ref={ringRef} className="pointer-events-none absolute left-[11.8px] top-[11.8px] z-[2] size-[98.4px] object-fill" style={ringStyle} src={figmaAssets.videoProfile.playRing} alt="" />
              <span className="video-play-button pointer-events-none relative grid size-[98.4px] place-items-center rounded-full border-2 border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,.16)] [transition:transform_110ms_cubic-bezier(0.25,1,0.5,1),box-shadow_300ms_cubic-bezier(0.25,1,0.5,1)] group-focus-visible:[box-shadow:0_5px_16px_rgba(15,23,42,.16)]" style={innerStyle}>
                <img className="size-[52px]" src={figmaAssets.videoProfile.playIcon} alt="" />
              </span>
            </a>
          </div>
        </section>

        <section className="min-h-[500px] bg-[#F4F8FF] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px] text-center">
            <MarsBadge>TENTANG MARS</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">
              <span className="text-ink">Derap Langkah</span> <span className="text-primary-dark">Cita Bersama</span> <span className="text-ink">SMK NEGERI 26 JAKARTA</span>
            </h2>
           
            <div className="relative mx-auto mt-12 h-[219px] max-w-[1272px] overflow-hidden rounded-3xl bg-white p-8 text-left shadow-[0_4px_16px_rgba(15,23,42,.06)] md:p-12">
              <img className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none object-contain" src="/assets/figma/profile/VISI SEKOLAHujung.png" alt="" aria-hidden="true" />
              <div className="relative z-10 flex items-center gap-2">
                <img className="size-[22px] object-contain" src="/assets/figma/profile/icondisampingjudulvisimisi.png" alt="" aria-hidden="true" />
                <span className="text-sm font-semibold text-soft-blue">TENTANG MARS</span>
              </div>
              <p className="relative z-10 mt-5 max-w-[927px] text-lg font-semibold leading-[30px] text-muted">
                Mars SMK Negeri 26 Jakarta merupakan bagian dari identitas sekolah yang mencerminkan semangat belajar, bekerja, dan membangun. Lagu ini menjadi salah satu representasi semangat dan kebanggaan keluarga besar SMK Negeri 26 Jakarta.
              </p>
              <img className="absolute bottom-6 left-12 h-[5px] w-[64px] object-fill" src="/assets/figma/profile/GARISBAWAHVISISEKOLAH.png" alt="" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="min-h-[389px] bg-white px-6 py-16 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1272px] text-center">
            <MarsBadge>PENCIPTA MARS</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">Diciptakan untuk SMK Negeri 26 Jakarta</h2>
            <p className="mx-auto mt-4 max-w-[858px] text-lg leading-[30px] text-muted">
              MARS SMK Negeri 26 Jakarta lahir dari dedikasi dan kecintaan terhadap sekolah, sebagai wujud semangat untuk terus melangkah, belajar, bekerja, dan membangun masa depan bersama.
            </p>
            <div className="mx-auto mt-8 grid max-w-[760px] gap-6 md:grid-cols-2">
              {[
                ["Bu Derliana", figmaAssets.profile.creatorBuDerliana],
                ["Pak Sutaryo", figmaAssets.profile.creatorPakSutaryo],
              ].map(([name, image]) => (
                <article className="rounded-3xl bg-[#F4F8FF] p-6 text-left shadow-[0_4px_16px_rgba(15,23,42,.08)]" key={name}>
                  <img className="size-20 rounded-full object-cover" src={image} alt={name} />
                  <h3 className="mt-4 text-xl font-bold">{name}</h3>
                  <p className="mt-2 text-sm text-muted">Pencipta MARS SMK Negeri 26 Jakarta</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mars-lyrics" className="mx-auto min-h-[696px] w-[min(1272px,100%-32px)] py-20 md:py-24">
          <div className="text-center">
            <MarsBadge>LIRIK MARS</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">Lirik Mars SMK Negeri 26 Jakarta</h2>
            <p className="mx-auto mt-4 max-w-[887px] text-lg leading-[30px] text-muted">
              Derap langkah cita bersama, menjadi pengingat semangat untuk terus belajar, bekerja, dan membangun.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-[1024px] gap-8 rounded-3xl bg-white p-8 shadow-[0_4px_16px_rgba(15,23,42,.08)] md:grid-cols-2 md:p-12">
            <p className="whitespace-pre-line text-lg font-medium leading-[27px] text-ink">
              {`Derap langkah cita bersama,
menjadi pengingat semangat untuk terus belajar, bekerja, dan membangun.

Sebagai pusaka panji-panji suci
SMK 26 kepada ibu pertiwi
Paku jiwa sungguh terpatri
Tingkatkan kompetensi anak negeri`}
            </p>
            <p className="whitespace-pre-line text-lg font-medium leading-[27px] text-ink">
              {`Sebagai patriot pejuang sejati
Hadapi tantangan teknologi mendatang
Kami ada di depan persada
Bina cipta hadirkan karya

Janji kami di gerbang hati
Demi sekolah yang kucintai`}
            </p>
          </div>
        </section>

        <section className="min-h-[369px] bg-gradient-to-br from-soft-blue via-primary to-primary-dark px-6 py-14 text-white md:px-10 md:py-14">
          <div className="mx-auto max-w-[1272px] text-center">
            <MarsBadge>SEMANGAT YANG KAMI BAWA</MarsBadge>
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">BELAJAR, BEKERJA, MEMBANGUN</h2>
            <p className="mx-auto mt-4 max-w-[887px] text-lg leading-[30px] text-white/85">
              Derap langkah cita bersama, menjadi pengingat semangat untuk terus belajar, bekerja, dan membangun.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                ["Belajar", "Terus mengembangkan pengetahuan dan kompetensi untuk menghadapi masa depan."],
                ["Bekerja", "Membangun keterampilan, profesionalisme, dan kesiapan menghadapi dunia kerja."],
                ["Membangun", "Menghasilkan karya dan kontribusi bagi sekolah, masyarakat, dan bangsa."],
              ].map(([title, description]) => (
                <article className="rounded-3xl bg-white/15 p-5 text-left backdrop-blur-sm" key={title}>
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-4 text-lg leading-7 text-white/85">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
