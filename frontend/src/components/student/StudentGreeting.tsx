import type { Me } from "../../types/auth";

export function StudentGreeting({ me, isDemo }: { me: Me | null; isDemo: boolean }) {
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "pagi" : hour < 15 ? "siang" : hour < 18 ? "sore" : "malam";
  const date = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  return <section className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end"><div className="min-w-0"><span className="inline-flex max-w-full rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-semibold text-primary">Siswa SMK Negeri 26 Jakarta</span><h1 className="mt-3 break-words text-[28px] font-bold leading-tight tracking-[-.03em] text-ink sm:text-[30px]">Selamat {greeting}, {me?.profile.display_name || "Siswa"}!</h1><p className="mt-2 break-words text-[13px] text-muted">{isDemo ? "Lengkapi portofolio untuk memperkuat lamaran PKL — periksa tindakan berikutnya di bawah." : "Informasi layanan dan pembelajaranmu akan tampil di dashboard ini."}</p></div>{isDemo && <div className="shrink-0 text-left sm:text-right"><strong className="block text-[12px] font-semibold capitalize text-ink">{date}</strong><span className="mt-1 block text-[11px] text-muted">Semester ganjil 2026/2027</span></div>}</section>;
}
