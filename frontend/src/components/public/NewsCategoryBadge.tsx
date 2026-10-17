type NewsCategoryBadgeProps = { category: string };

export function NewsCategoryBadge({ category }: NewsCategoryBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4cbaf5] via-[#0092ff] to-[#006cdc] px-2.5 py-[5px] text-sm font-medium leading-[18px] text-white">
      {category}
    </span>
  );
}
