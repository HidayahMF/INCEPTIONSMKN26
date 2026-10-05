import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { IndustryPartnersMarquee } from "../components/public/IndustryPartnersMarquee";

const asset = (name: string) => `/assets/figma/KGS/${name}`;

const competencies = [
  "Gambar Konstruksi",
  "Pengukuran & Pemetaan",
  "Konstruksi Bangunan",
  "Pekerjaan Finishing",
  "Sistem Sanitasi",
  "Keselamatan Kerja",
  "Plumbing",
  "Mekanika Teknik",
];

const students = [
  ["Fathan Muyasar", "Juara 1 - Kompetisi Festifal Pelajar", "Fathan Muyasar.png"],
  ["Nabilla Pertiwi", "Juara 2 - Lomba Gambar Teknik", "Nabilla Pertiwi.png"],
  ["Angelica Vero", "Finalis - Kompetisi Inovasi Bangunan", "Angelica Vero.png"],
  ["Agung Lazuardi", "Juara 3 - Plumbing Competition", "Agung Lazuardi.png"],
] as const;

const alumni = [
  ["Andi Pratama", "Andi Pratama.png", "KGS — Angkatan 50", "Bekerja di PT WIKA", "Selama belajar di KGS, saya nggak cuma belajar tentang konstruksi, tapi juga belajar bekerja dengan teliti, disiplin, dan bertanggung jawab. Pengalaman praktiknya sangat membantu saya saat masuk ke dunia kerja."],
  ["Fajar Ramadhan", "Fajar Ramadhan.png", "KGS — Angkatan 49", "Bekerja di PT WIKA", "Pembelajaran dan praktik di KGS membuat saya lebih percaya diri menghadapi dunia kerja. Banyak pengalaman yang saya dapat dan bisa saya terapkan setelah lulus."],
] as const;

function Label({ children }: { children: string }) {
  return <span className="inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.04em] text-[#e30613] shadow-[0_2px_8px_rgba(15,23,42,.08)]">{children}</span>;
}

export function KgsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#d5c8cc] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img className="absolute inset-0 -z-10 size-full object-cover object-center" src={asset("Hero Section.png")} alt="Siswa Konstruksi Gedung dan Sanitasi SMKN 26 Jakarta" />
          <div className="mx-auto flex w-full max-w-[1272px] px-5 pb-36 sm:px-8 lg:px-16 lg:pb-44">
            <div className="max-w-[560px] pt-10 text-white sm:pt-16 lg:pt-20">
              <Label>JURUSAN KGS</Label>
              <h1 className="mt-4 text-[34px] font-bold leading-[1.08] sm:text-5xl lg:text-[60px]">Konstruksi <span className="text-[#ff1824]">Gedung &amp; Sanitasi</span></h1>
              <p className="mt-4 max-w-[480px] text-sm leading-5 text-white/90 sm:text-base sm:leading-6">Membekali siswa dengan pengetahuan dan keterampilan dalam bidang konstruksi gedung, gambar bangunan, pekerjaan konstruksi, hingga sistem sanitasi untuk menghadapi kebutuhan dunia kerja dan industri.</p>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-8 w-[calc(100%-32px)] max-w-[1200px] overflow-hidden rounded-lg bg-[#e30613] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[["4 Tahun", "Program Pendidikan"], ["8+", "Mitra Industri"], ["288+", "Siswa"], ["15+", "Prestasi KGS"]].map(([value, label]) => <div className="border-r border-white/40 px-2 py-3 last:border-0 sm:py-4" key={label}><strong className="block text-xl font-bold sm:text-2xl">{value}</strong><span className="text-[9px] sm:text-xs">{label}</span></div>)}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[.9fr_1.1fr] lg:py-20">
          <img className="mx-auto w-full max-w-[470px] object-contain" src={asset("mengenal.png")} alt="Siswa Konstruksi Gedung dan Sanitasi" />
          <div>
            <Label>MENGENAL KGS</Label>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Mengenal <span className="text-[#e30613]">Konstruksi Gedung &amp; Sanitasi</span></h2>
            <p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">Konstruksi Gedung dan Sanitasi merupakan program keahlian yang mempersiapkan siswa untuk memahami proses pembangunan dan pemeliharaan bangunan serta sistem sanitasi. Melalui pembelajaran teori dan praktik, siswa diajak mengenali berbagai jenis pekerjaan konstruksi, mulai dari perencanaan, pengukuran, gambar bangunan, pelaksanaan pekerjaan, hingga penerapan keselamatan kerja.</p>
            <p className="mt-3 text-sm font-bold text-[#e30613]">Belajar dari Konsep, Berkarya dalam Praktik.</p>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center"><Label>KOMPETENSI UTAMA</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Kompetensi yang <span className="text-[#e30613]">Dipelajari</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">Siswa KGS mengembangkan berbagai keterampilan yang menjadi dasar untuk memasuki dunia pendidikan maupun dunia kerja.</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{competencies.map((item) => <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-left text-[11px] font-semibold shadow-[0_3px_12px_rgba(15,23,42,.05)] sm:text-xs" key={item}><img className="size-7 shrink-0 rounded-full" src={asset("Button shortcut.png")} alt="" aria-hidden="true" />{item}</div>)}</div></div>
        </section>

        <section className="px-5 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center"><Label>ROADMAP PEMBELAJARAN</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Dari Dasar hingga Siap Berkarya <span className="text-[#e30613]">#Program4Tahun</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">Empat tahun perjalanan untuk mengenal, mengembangkan, menerapkan, dan menguji kompetensi di dunia industri.</p><img className="mx-auto mt-8 w-full max-w-[1140px] object-contain" src={asset("kompetensi.png")} alt="Roadmap pembelajaran KGS dari kelas X hingga kelas XIII" /></div>
        </section>

        <section className="px-5 py-12 sm:px-10 lg:py-16"><div className="mx-auto max-w-[1200px] text-center"><Label>KEGIATAN PEMBELAJARAN</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Belajar Tidak Hanya di <span className="text-[#e30613]">Dalam Kelas</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm text-[#61708b]">Pengalaman belajar KGS hadir melalui perpaduan teori, praktik, proyek, dan kegiatan yang memberikan gambaran nyata mengenai dunia konstruksi.</p><div className="mx-auto mt-8 grid max-w-[1100px] gap-3"><img className="h-auto w-full rounded-2xl object-contain" src={asset("Dokumentasi Pembelajaranatas.png")} alt="Dokumentasi pembelajaran KGS baris pertama" /><img className="h-auto w-full rounded-2xl object-contain" src={asset("Dokumentasi Pembelajaranbawah.png")} alt="Dokumentasi pembelajaran KGS baris kedua" /></div></div></section>

        <section className="px-6 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1200px] text-center"><Label>PRESTASI SISWA</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Prestasi yang Dibangun <span className="text-[#e30613]">dari Kompetensi</span></h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{students.map(([name, achievement, photo]) => <article className="overflow-hidden rounded-2xl bg-white text-left shadow-[0_4px_16px_rgba(15,23,42,.06)]" key={name}><img className="aspect-[1.15] w-full object-cover" src={asset(photo)} alt={name} /><div className="p-3"><h3 className="text-xs font-bold text-[#e30613]">{name}</h3><p className="mt-1 text-[10px] leading-4 text-[#61708b]">{achievement}</p></div></article>)}</div></div></section>
        <IndustryPartnersMarquee accent="text-[#e30613]" />

        <section className="bg-[#e30613] px-6 py-14 text-center text-white sm:px-10 lg:py-16"><Label>ALUMNI KGS</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Dari KGS, Melangkah Lebih Jauh</h2><p className="mx-auto mt-3 max-w-xl text-sm text-white/85">Kompetensi yang diperoleh selama belajar menjadi bekal bagi alumni untuk melanjutkan pendidikan, memasuki dunia kerja, maupun mengembangkan karier di bidang konstruksi.</p><div className="mx-auto mt-8 grid max-w-[1080px] gap-5 sm:grid-cols-2">{alumni.map(([name, photo, batch, work, quote]) => <article className="flex items-start gap-4 rounded-2xl bg-white p-4 text-left text-[#10182b] sm:gap-5 sm:p-5" key={name}><img className="size-28 shrink-0 rounded-xl object-cover sm:size-36" src={asset(photo)} alt={name} /><div className="min-w-0"><strong className="block text-base sm:text-lg">{name}</strong><span className="mt-1 block text-xs text-[#61708b] sm:text-sm">{batch}</span><strong className="mt-2 block text-xs text-[#e30613] sm:text-sm">{work}</strong><p className="mt-2 text-xs leading-5 text-[#61708b] sm:text-sm">“{quote}”</p></div></article>)}</div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
