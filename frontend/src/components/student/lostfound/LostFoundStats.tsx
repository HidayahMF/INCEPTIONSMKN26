export function LostFoundStats({ isDemo }: { isDemo: boolean }) {
  const stats = [
    [isDemo ? "2" : "0", "Laporan Saya", "Laporan yang kamu buat"],
    [isDemo ? "3" : "0", "Barang Ditemukan", "Barang yang dilaporkan"],
    [isDemo ? "2" : "0", "Menunggu Verifikasi", "Laporan dalam pemeriksaan"],
  ];
  return <div className="grid gap-4 md:grid-cols-3">{stats.map(([value, label, description]) => <section key={label} className="min-w-0 rounded-2xl border border-[#e1e9f4] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(25,63,112,.02)]"><strong className="block text-[30px] font-bold leading-none text-ink">{value}</strong><h2 className="mt-3 text-[13px] font-medium text-[#52658a]">{label}</h2><p className="mt-2 text-[11px] text-muted">{description}</p></section>)}</div>;
}
