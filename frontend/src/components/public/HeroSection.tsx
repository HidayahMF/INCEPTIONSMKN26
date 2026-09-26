import { useState, type FormEvent } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type HeroSectionProps = { onAskAi: () => void };

export function HeroSection({ onAskAi }: HeroSectionProps) {
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
        <div className="absolute left-[6.4%] top-[591px] hidden size-[1256px] rounded-full bg-gradient-to-r from-primary-dark to-primary md:block" />
        <div className="absolute -left-0.5 top-[535px] hidden size-[1444px] rounded-full border-4 border-white md:block" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-[103px] bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute inset-x-0 -top-7 z-[2] h-[214px] bg-gradient-to-b from-white to-transparent" />
      </div>
      <div className="absolute left-1/2 top-[140px] z-10 flex w-[calc(100%-32px)] max-w-[932px] -translate-x-1/2 flex-col items-center text-center">
        <span className="flex items-center gap-1 rounded-full bg-[#f5faff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-sm">
          <span className="size-2 rounded-full bg-soft-blue ring-1 ring-primary/25" />
          SMK Negeri 26 Jakarta
        </span>
        <h1 className="mt-1 text-[38px] font-bold leading-[52px] drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] md:mt-0 md:text-[64px] md:leading-[96px]">
          Belajar, Bekerja,{" "}
          <span className="text-primary-dark">Membangun!</span>
        </h1>
        <p className="w-full max-w-[681px] text-sm font-medium leading-6 drop-shadow-[0_4px_8px_rgba(0,0,0,.1)] md:text-xl md:leading-[30px]">
          Membentuk generasi yang kompeten, berkarakter, dan siap memasuki dunia
          kerja untuk masa depan yang lebih baik.
        </p>
      </div>
      <div className="absolute left-1/2 top-[351px] z-30 flex -translate-x-1/2 items-center gap-3">
        <a
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-white"
          href="/profile"
        >
          Jelajahi SMKN 26{" "}
          <img className="size-5" src={figmaAssets.icons.arrowRight} alt="" />
        </a>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
          onClick={onAskAi}
        >
          <img className="size-5" src={figmaAssets.icons.playVideo} alt="" />
          Tonton Video Profile
        </button>
      </div>
      <form
        className="absolute left-1/2 top-[725px] z-30 flex h-11 w-[calc(100%-32px)] max-w-[840px] -translate-x-1/2 items-center justify-between rounded-full border-2 border-gray-200 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 text-sm"
        onSubmit={submitSearch}
        role="search"
      >
        <label className="sr-only" htmlFor="hero-search">
          Cari informasi SMKN 26
        </label>
        <input
          id="hero-search"
          className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari apapun blablablabka"
        />
        <button
          className="grid size-7 shrink-0 place-items-center rounded-full bg-white transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-white"
          type="submit"
          aria-label="Cari"
        >
          <img className="size-4" src={figmaAssets.icons.search} alt="" />
        </button>
      </form>
      <div className="pointer-events-none absolute bottom-[-34px] left-1/2 z-20 h-[476px] w-[302px] -translate-x-[92%] overflow-hidden md:left-[429px] md:top-[421px] md:bottom-auto md:translate-x-0">
        <img
          className="absolute left-0 top-0 h-[516px] w-[880px] max-w-none object-contain"
          src={figmaAssets.hero.studentMale}
          alt=""
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-34px] left-1/2 z-20 h-[516px] w-[520px] translate-x-[-4%] overflow-hidden md:left-[558px] md:top-[401px] md:bottom-auto md:translate-x-0">
        <img
          className="absolute left-[-355px] top-0 h-[516px] w-[880px] max-w-none object-contain"
          src={figmaAssets.hero.studentMale}
          alt=""
        />
      </div>
    </section>
  );
}
