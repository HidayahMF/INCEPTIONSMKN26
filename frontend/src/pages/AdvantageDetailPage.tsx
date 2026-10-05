import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { advantages } from "../data/advantages";

export function AdvantageDetailPage({ slug }: { slug: string }) {
  const advantage = advantages.find((item) => item.slug === slug) ?? advantages[0];

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F4F8FF] text-ink">
      <PublicNavbar />
      <main className="mx-auto w-[min(1272px,100%-32px)] px-0 pb-24 pt-[140px] sm:pt-[160px]">
        <a className="text-sm font-semibold text-primary hover:underline" href="/#school-advantages">
          ← Kembali ke Keunggulan
        </a>
        <section className="mt-8 grid overflow-hidden rounded-[32px] bg-white shadow-[0_4px_24px_rgba(15,23,42,.08)] lg:grid-cols-2">
          <img
            className="h-[280px] w-full object-cover sm:h-[380px] lg:h-full lg:min-h-[540px]"
            src={advantage.image}
            alt={advantage.title}
          />
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <span className="w-fit rounded-full bg-light-blue px-3 py-1.5 text-sm font-semibold text-primary">
              Keunggulan SMK Negeri 26 Jakarta
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-primary-dark sm:text-5xl">
              {advantage.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
              {advantage.description}
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
