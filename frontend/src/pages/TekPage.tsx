import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { IndustryPartnersMarquee } from "../components/public/IndustryPartnersMarquee";

const asset = (name: string) => `/assets/figma/TEK/${name}`;

const competencies = [
  "Dasar Elektronika",
  "Pengukuran Elektronika",
  "Perakitan Rangkaian",
  "Sistem Digital",
  "Teknik Komunikasi",
  "Pemrograman & Kendali",
  "Troubleshooting",
  "Proyek Teknologi",
];

const achievements = [
  ["Hidayah Fadillah", "Juara 1 - Kompetisi Elektronika Pelajar", "Hidayah Fadillah.png"],
  ["Firmansyah", "Juara 2 - Lomba Inovasi Teknologi", "Firmansyah.png"],
  ["Alyssa Bella", "Finalis - Kompetisi Robotika Pelajar", "Alyssa Bella.png"],
  ["Dinda Azzahra", "Juara 3 - Kompetisi Teknologi", "Dinda Azzahra.png"],
] as const;

const alumni = [
  ["Fajar Maulana", "Fajar Ramadhan.png", "TEK — Angkatan 50", "Bekerja sebagai Teknisi Elektronika", "Selama belajar di TEK, saya tidak hanya memahami teori, tetapi juga terbiasa praktik, menguji rangkaian, dan menyelesaikan masalah secara langsung. Pengalaman tersebut sangat membantu saya saat memasuki dunia kerja."],
  ["Abi Rafi", "Abi Rafi.png", "TEK — Angkatan 49", "Bekerja sebagai Teknisi Elektronika", "Pembelajaran dan praktik di TEK membuat saya lebih percaya diri menghadapi dunia kerja. Banyak pengalaman yang saya dapatkan di sekolah bisa langsung saya terapkan setelah lulus."],
] as const;

function Label({ children }: { children: string }) {
  return <span className="inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.04em] text-[#006cdc] shadow-[0_2px_8px_rgba(15,23,42,.08)]">{children}</span>;
}

export function TekPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#9cb3cb] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img className="absolute inset-0 -z-10 size-full object-cover object-center" src={asset("Hero Section.png")} alt="Siswa Teknik Elektronika dan Komunikasi SMKN 26 Jakarta" />
          <div className="mx-auto flex w-full max-w-[1272px] px-5 pb-36 sm:px-8 lg:px-16 lg:pb-44"><div className="max-w-[560px] pt-10 text-white sm:pt-16 lg:pt-20"><Label>JURUSAN TEK</Label><h1 className="mt-4 text-[34px] font-bold leading-[1.08] sm:text-5xl lg:text-[60px]">Teknik <span className="text-[#1688f5]">Elektronika &amp; Komunikasi</span></h1><p className="mt-4 max-w-[480px] text-sm leading-5 text-white/90 sm:text-base sm:leading-6">Membekali siswa dengan keterampilan elektronika, komunikasi, dan teknologi melalui pembelajaran berbasis praktik serta proyek nyata.</p></div></div>
        </section>

        <section className="relative z-20 mx-auto -mt-8 w-[calc(100%-32px)] max-w-[1200px] overflow-hidden rounded-lg bg-[#0874d1] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10"><div className="grid grid-cols-2 sm:grid-cols-4">{[["3 Tahun", "Program Pendidikan"], ["10+", "Mitra Industri"], ["288+", "Siswa"], ["20+", "Prestasi TEK"]].map(([value, label]) => <div className="border-r border-white/40 px-2 py-3 last:border-0 sm:py-4" key={label}><strong className="block text-xl font-bold sm:text-2xl">{value}</strong><span className="text-[9px] sm:text-xs">{label}</span></div>)}</div></section>

        <section className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[.9fr_1.1fr] lg:py-20"><img className="mx-auto w-full max-w-[470px] object-contain" src={asset("mengenal.png")} alt="Siswa Teknik Elektronika dan Komunikasi" /><div><Label>MENGENAL TEK</Label><h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Mengenal <span className="text-[#0874d1]">Teknik Elektronika &amp; Komunikasi</span></h2><p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">Teknik Elektronika dan Komunikasi membekali siswa dengan pengetahuan dan keterampilan dalam memahami, merancang, merakit, serta mengembangkan berbagai sistem elektronika dan komunikasi. Pembelajaran dirancang untuk menggabungkan pemahaman teori dengan pengalaman praktik sehingga siswa terbiasa menghadapi permasalahan teknologi secara langsung.</p><p className="mt-3 text-sm font-bold text-[#0874d1]">Belajar teknologi dengan cara yang nyata.</p></div></section>

        <section className="px-6 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1140px] text-center"><Label>KOMPETENSI UTAMA</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Kompetensi yang <span className="text-[#0874d1]">Dipelajari</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">Siswa TEK mengembangkan keterampilan elektronika dan komunikasi melalui pembelajaran teori, praktik, proyek, serta pemecahan masalah yang diterapkan secara langsung.</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{competencies.map((item) => <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-left text-[11px] font-semibold shadow-[0_3px_12px_rgba(15,23,42,.05)] sm:text-xs" key={item}><img className="size-7 shrink-0 rounded-full" src={asset("Button shortcut.png")} alt="" aria-hidden="true" />{item}</div>)}</div></div></section>

        <section className="px-5 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1140px] text-center"><Label>ROADMAP PEMBELAJARAN</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Dari Dasar hingga Siap Berkarya <span className="text-[#0874d1]">#Program3Tahun</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">Tiga tahun perjalanan untuk mengenal, menguasai, dan menerapkan kompetensi elektronika dan komunikasi melalui pembelajaran sekolah hingga pengalaman industri.</p><img className="mx-auto mt-8 w-full max-w-[1140px] object-contain" src={asset("kompetensi.png")} alt="Roadmap pembelajaran TEK dari kelas X hingga kelas XIII" /></div></section>

        <section className="px-5 py-12 sm:px-10 lg:py-16"><div className="mx-auto max-w-[1200px] text-center"><Label>KEGIATAN PEMBELAJARAN</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Belajar Tidak Hanya di <span className="text-[#0874d1]">Dalam Kelas</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm text-[#61708b]">Pengalaman belajar TEK hadir melalui perpaduan teori, praktik, proyek, dan kegiatan yang membantu siswa memahami dunia elektronika dan komunikasi secara nyata.</p><div className="mx-auto mt-8 grid max-w-[1100px] gap-3"><img className="h-auto w-full rounded-2xl object-contain" src={asset("Dokumentasi Pembelajaran atas.png")} alt="Dokumentasi kegiatan pembelajaran TEK baris pertama" /><img className="h-auto w-full rounded-2xl object-contain" src={asset("Dokumentasi Pembelajaran bawah.png")} alt="Dokumentasi kegiatan pembelajaran TEK baris kedua" /></div></div></section>

        <section className="px-6 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1140px] text-center"><Label>PRESTASI SISWA</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Prestasi yang Dibangun <span className="text-[#0874d1]">dari Kompetensi</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">Kompetensi yang dipelajari menjadi bekal siswa TEK untuk berani berkompetisi, berinovasi, dan menunjukkan kemampuan di bidang elektronika dan teknologi.</p><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{achievements.map(([name, achievement, photo]) => <article className="overflow-hidden rounded-2xl bg-white text-left shadow-[0_4px_16px_rgba(15,23,42,.06)]" key={name}><img className="aspect-[1.15] w-full object-cover" src={asset(photo)} alt={name} /><div className="p-3"><h3 className="text-xs font-bold text-[#0874d1]">{name}</h3><p className="mt-1 text-[10px] leading-4 text-[#61708b]">{achievement}</p></div></article>)}</div></div></section>

        <IndustryPartnersMarquee accent="text-[#0874d1]" />

        <section className="bg-[#0874d1] px-6 py-14 text-center text-white sm:px-10 lg:py-16"><Label>ALUMNI TEK</Label><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Dari TEK, Melangkah Lebih Jauh</h2><p className="mx-auto mt-3 max-w-xl text-sm text-white/85">Kompetensi yang diperoleh selama belajar menjadi bekal bagi alumni untuk melanjutkan pendidikan, memasuki dunia kerja, maupun mengembangkan karier di bidang elektronika dan teknologi.</p><div className="mx-auto mt-8 grid max-w-[1080px] gap-5 sm:grid-cols-2">{alumni.map(([name, photo, batch, work, quote]) => <article className="flex items-start gap-4 rounded-2xl bg-white p-4 text-left text-[#10182b] sm:gap-5 sm:p-5" key={name}><img className="size-28 shrink-0 rounded-xl object-cover sm:size-36" src={asset(photo)} alt={name} /><div className="min-w-0"><strong className="block text-base sm:text-lg">{name}</strong><span className="mt-1 block text-xs text-[#61708b] sm:text-sm">{batch}</span><strong className="mt-2 block text-xs text-[#006cdc] sm:text-sm">{work}</strong><p className="mt-2 text-xs leading-5 text-[#61708b] sm:text-sm">“{quote}”</p></div></article>)}</div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
