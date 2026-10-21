import { useState } from "react";

export function LostFoundGallery({ name, images }: { name: string; images: string[] }) {
  const [active, setActive] = useState(0);
  const image = images[active] ?? images[0];
  if (!image) return <div className="grid min-h-56 place-items-center rounded-2xl bg-[#f3f7fd] text-sm text-muted">Foto barang tidak tersedia.</div>;
  return <div className="min-w-0">
    <div className="overflow-hidden rounded-[22px] bg-[#f3f7fd]"><img className="aspect-[1.42] w-full object-cover" src={image} alt={`${name} · foto ${active + 1}`} /></div>
    {images.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Galeri foto barang">{images.map((src, index) => <button key={src} type="button" aria-label={`Tampilkan foto ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)} onKeyDown={(event) => { if (event.key === "ArrowRight") setActive((index + 1) % images.length); if (event.key === "ArrowLeft") setActive((index - 1 + images.length) % images.length); }} className={`h-[78px] w-[110px] shrink-0 overflow-hidden rounded-xl border-2 bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${active === index ? "border-primary" : "border-transparent"}`}><img className="size-full object-cover" src={src} alt="" /></button>)}</div>}
  </div>;
}
