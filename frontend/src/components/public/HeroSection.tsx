import { useState, type FormEvent } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type HeroSectionProps = { onAskAi?: () => void };

export function HeroSection({ onAskAi: _onAskAi }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value)
      window.dispatchEvent(
        new CustomEvent("school-search", { detail: { query: value } }),
      );
    window.location.href = value
      ? `/information?q=${encodeURIComponent(value)}`
      : "/information";
  }
  return (
    <section className="relative h-[760px] overflow-hidden bg-[#087edc] text-white md:h-[880px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="absolute inset-0 size-full object-cover"
          src={figmaAssets.hero.schoolBuilding}
          alt="Gedung SMK Negeri 26 Jakarta"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/25 to-primary/25" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-[103px] bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute inset-x-0 -top-7 z-[2] h-[214px] bg-gradient-to-b from-white to-transparent" />
      </div>
      <div className="absolute left-1/2 top-[140px] z-10 flex w-[calc(100%-32px)] max-w-[1200px] -translate-x-1/2 flex-col items-center text-center">
          <span className="flex items-center gap-1 rounded-full bg-[#f5faff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-sm">
          <span className="size-2 rounded-full bg-soft-blue ring-1 ring-primary/25" />
          SMK Negeri 26 Jakarta
        </span>
        <h1 className="mt-1 text-[38px] font-bold leading-[52px] drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] md:mt-0 md:whitespace-nowrap md:text-[clamp(46px,4.45vw,64px)] md:leading-[1.5]">
          Belajar, Bekerja,{" "}
          <span className="hero-gradient-text">Membangun!</span>
        </h1>
        <p className="w-full max-w-[681px] text-sm font-medium leading-6 drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] md:text-xl md:leading-[30px]">
          Membentuk generasi yang kompeten, berkarakter, dan siap memasuki dunia
          kerja untuk masa depan yang lebih baik.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 ease-out hover:border-white hover:bg-white hover:bg-none hover:text-primary focus-visible:border-white focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none"
            href="/profile"
          >
            Jelajahi SMKN 26{" "}
            <span className="relative inline-flex size-5 shrink-0" aria-hidden="true">
              <img className="absolute inset-0 size-5 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none" src={figmaAssets.icons.arrowRight} alt="" />
              <img className="absolute inset-0 size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" src={figmaAssets.secondaryButton.arrowRight} alt="" />
            </span>
          </a>
          <a
            className="group inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-lg transition-colors duration-300 ease-out hover:border-transparent hover:bg-gradient-to-br hover:from-primary-dark hover:via-primary hover:to-soft-blue hover:text-white focus-visible:border-transparent focus-visible:bg-gradient-to-br focus-visible:from-primary-dark focus-visible:via-primary focus-visible:to-soft-blue focus-visible:text-white focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none"
            href="#video-profile"
          >
            <span
              className="size-5 shrink-0 bg-current text-primary transition-colors duration-300 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none"
              style={{
                maskImage: `url(${figmaAssets.icons.playVideo})`,
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "20px 20px",
                WebkitMaskImage: `url(${figmaAssets.icons.playVideo})`,
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "20px 20px",
              }}
              aria-hidden="true"
            />
            Tonton Video Profile
          </a>
        </div>
      </div>
      <form
        className="group absolute left-1/2 top-[725px] z-30 flex h-11 w-[calc(100%-32px)] max-w-[840px] -translate-x-1/2 items-center justify-between rounded-full border-2 border-[#e5e7eb] bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 text-sm text-white transition-[background-color,color,border-color] duration-300 ease-out hover:border-primary hover:bg-white hover:bg-none hover:text-primary focus-within:border-primary focus-within:bg-white focus-within:bg-none focus-within:text-primary motion-reduce:transition-none"
        onSubmit={submitSearch}
        role="search"
      >
        <label className="sr-only" htmlFor="hero-search">
          Cari informasi SMKN 26
        </label>
        <input
          id="hero-search"
          className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white transition-colors duration-300 ease-out group-hover:text-primary group-hover:placeholder:text-primary group-focus-within:text-primary group-focus-within:placeholder:text-primary motion-reduce:transition-none"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari disini..."
        />
        <button
          className="grid size-7 shrink-0 place-items-center rounded-full bg-white focus-visible:outline-2 focus-visible:outline-white"
          type="submit"
          aria-label="Cari"
        >
          <img className="size-4" src={figmaAssets.icons.search} alt="" />
        </button>
      </form>
      <div className="pointer-events-none absolute bottom-[-34px] left-1/2 z-20 h-[clamp(240px,35.83vw,516px)] w-[clamp(520px,78vw,1120px)] -translate-x-1/2">
        <div
          aria-hidden="true"
          className="absolute left-[-6.1%] top-[36.8%] z-0 aspect-square w-[112.1%] rounded-full bg-gradient-to-r from-primary-dark to-primary"
        />
        <div
          aria-hidden="true"
          className="absolute left-[-14.5%] top-[26%] z-[1] aspect-square w-[128.9%] rounded-full border-4 border-white"
        />
        <div className="absolute left-[24%] top-[4.5%] z-10 h-[92.2%] w-[27%] overflow-hidden">
          <img
            className="hero-student-female absolute left-0 top-0 max-w-none"
            src={figmaAssets.hero.studentMale}
            alt=""
          />
        </div>
        <div className="absolute left-[35.5%] top-0 z-10 h-full w-[46.4%] overflow-hidden">
          <img
            className="absolute left-[-68.3%] top-0 h-full w-auto max-w-none"
            src={figmaAssets.hero.studentMale}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
