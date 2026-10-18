import type { MouseEventHandler } from "react";
import type { newsItems } from "../../data/news";
import { NewsCategoryBadge } from "./NewsCategoryBadge";

type NewsItem = (typeof newsItems)[number];
type NewsCardProps = { news: NewsItem; variant?: "homepage" | "listing"; isActive?: boolean; aosDelay?: number; onClick?: MouseEventHandler<HTMLAnchorElement> };

export function NewsCard({ news, variant = "listing", isActive = false, aosDelay, onClick }: NewsCardProps) {
  const homepage = variant === "homepage";
  const sizeClass = homepage ? "h-[300px] w-[400px] max-md:w-full" : "w-full";
  const imageClass = homepage ? "h-[176px]" : "h-[190px] sm:h-[176px]";
  return (
    <a href={`/news/${news.slug}`} onClick={onClick} data-aos={aosDelay !== undefined ? "fade-up" : undefined} data-aos-delay={aosDelay} className={`${sizeClass} group relative isolate block shrink-0 overflow-hidden rounded-xl bg-white no-underline ${homepage ? "" : "shadow-[0_4px_16px_rgba(15,23,42,.05)]"} transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,.16)] focus-visible:outline-2 focus-visible:outline-primary`}>
      <div className={`${imageClass} relative w-full`}><img className="block h-full w-full object-cover" src={news.image} alt={news.title} draggable={false} /></div>
      <div className={`${homepage ? "absolute bottom-[18px] left-[18px] right-[18px] h-[83px]" : "relative bg-white p-4"}`}>
        <div className={`${homepage ? "absolute -left-0.5 -top-[37px]" : "absolute -top-px left-4"} z-10`}><NewsCategoryBadge category={news.category} /></div>
        <h2 className={`${homepage ? "absolute left-0 top-0 bg-[linear-gradient(105deg,#006cdc,#0092ff_72%,#4cbaf5)] bg-clip-text text-2xl leading-[29px] text-transparent" : `text-[21px] leading-7 ${isActive ? "text-primary" : "text-ink"}`} m-0 font-bold`}>{news.title}</h2>
        <time className={`${homepage ? "absolute bottom-[3px] left-0" : "mt-3"} flex items-center gap-1.5 text-xs leading-[18px] text-muted`}><img className="size-[18px] object-contain" src="/assets/pages/berita/lets-icons_date-fill.png" alt="" aria-hidden="true" />{news.date}</time>
      </div>
    </a>
  );
}
