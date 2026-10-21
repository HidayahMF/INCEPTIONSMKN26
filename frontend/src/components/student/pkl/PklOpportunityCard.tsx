import { Link } from "../../../routes/compat";
import type { PklOpportunity } from "./pkl.types";

type PklOpportunityCardProps = { opportunity: PklOpportunity; onDetail?: (opportunity: PklOpportunity) => void };

const icons = {
  major: "/assets/pages/siswapages/BKK&PKL/mdi_book-education%20(2).png",
  location: "/assets/pages/siswapages/BKK&PKL/boxicons_location-filled.png",
  date: "/assets/pages/siswapages/BKK&PKL/lets-icons_date-fill%20(1).png",
  period: "/assets/pages/siswapages/BKK&PKL/ion_book%20(1).png",
};

export function PklOpportunityCard({ opportunity, onDetail }: PklOpportunityCardProps) {
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e1e9f4] bg-white shadow-[0_2px_8px_rgba(25,63,112,.02)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.1)]">
    <img className="h-[204px] w-full rounded-t-2xl rounded-bl-[3rem] object-cover" src={opportunity.image} alt={`Gedung ${opportunity.company}`} />
    <div className="flex flex-1 flex-col p-5">
      <h3 className="break-words text-[17px] font-bold text-ink">{opportunity.company}</h3>
      <p className="mt-1 text-[12px] text-[#607296]">{opportunity.industry}</p>
      <h4 className="mt-4 break-words text-[17px] font-bold leading-6 text-ink">{opportunity.program}</h4>
      <div className="mt-2 grid gap-2 text-[12px] text-[#607296]">
        <InfoLine icon={icons.major} text={opportunity.major} />
        <InfoLine icon={icons.location} text={opportunity.location} />
        <InfoLine icon={icons.date} text={opportunity.registrationPeriod} />
        <InfoLine icon={icons.period} text={opportunity.internshipPeriod} />
      </div>
      {onDetail ? <button type="button" onClick={() => onDetail(opportunity)} className="mt-4 min-h-10 w-full rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-4 py-2.5 text-[13px] font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border hover:border-[#cbd5e1] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Lihat Detail</button> : <Link to={`/dashboard/pkl/${opportunity.id}`} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-4 py-2.5 text-[13px] font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border hover:border-[#cbd5e1] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Lihat Detail</Link>}
    </div>
  </article>;
}

function InfoLine({ icon, text }: { icon: string; text: string }) {
  return <div className="flex min-w-0 items-center gap-2"><img className="size-5 shrink-0 object-contain" src={icon} alt="" aria-hidden="true" /><span className="break-words">{text}</span></div>;
}
