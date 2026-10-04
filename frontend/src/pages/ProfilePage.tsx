import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const missions = [
  ["01", "Karakter & Nilai", "Menanamkan nilai-nilai keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa, kewargaan, penalaran kritis, kreativitas, kemandirian, kolaborasi, kesehatan, serta komunikasi."],
  ["02", "Kompetensi Keahlian", "Menyelenggarakan pembelajaran mendalam yang berpusat pada murid untuk mengembangkan kemampuan berpikir kritis, kreatif, inovatif, kolaboratif, dan komunikatif."],
  ["03", "Pembelajaran Berpusat", "Meningkatkan profesionalisme pendidik dan tenaga kependidikan melalui pendidikan/pelatihan, inovasi pembelajaran dan penguasaan teknologi terkini."],
  ["04", "Kemampuan Bahasa Asing", "Meningkatkan kemampuan berbahasa asing murid guna mendukung lulusan yang berdaya saing global."],
  ["05", "Profesionalisme Pendidik", "Mengembangkan kompetensi keahlian sesuai kebutuhan dunia usaha/dunia industri (DUDI) melalui teaching factory, magang, guru tamu, dan sertifikasi."],
  ["06", "Kemitraan Strategis", "Mengintegrasikan teknologi digital dan proyek nyata dalam proses pembelajaran."],
  ["07", "Teknologi & Proyek Nyata", "Membangun kemitraan strategis dengan dunia usaha/dunia industri (DUDI), perguruan tinggi, dan masyarakat untuk mendukung pembelajaran kontekstual dan berkelanjutan."],
  ["08", "Sarana & Prasarana", "Menyediakan sarana dan prasarana pembelajaran yang sesuai standar pendidikan."],
] as const;

const milestones = [
  ["1971", "STM Pembangunan Jakarta", "Awal perjalanan pendidikan teknologi pembangunan di Jakarta melalui peresmian sekolah pada 1 Juli 1971."],
  ["1971-1985", "Proyek Perintis Sekolah Teknologi Menengah Pembangunan", "SMK Negeri 26 menjadi bagian dari perjalanan proyek perintis pendidikan teknologi menengah pembangunan di Indonesia."],
  ["1986", "STMN Pembangunan Jakarta", "Sekolah mengalami perubahan menjadi STMN Pembangunan Jakarta sebagai bagian dari perkembangan pendidikan kejuruan."],
  ["1997 - Now", "SMK Negeri 26 Jakarta", "Nomenklatur sekolah berubah menjadi SMK Negeri 26 Jakarta dan terus berkembang sebagai sekolah vokasi teknologi."],
] as const;

function ProfileBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <span className="size-2 rounded-full bg-soft-blue" aria-hidden="true" />
      {children}
    </span>
  );
}

function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F4F8FF] text-ink">
      <PublicNavbar />
      <main>
        <section className="relative isolate flex min-h-[626px] items-center overflow-hidden bg-primary-dark px-6 pb-16 pt-36 text-white md:px-16">
          <img className="absolute inset-0 -z-20 size-full object-cover opacity-45" src={figmaAssets.profile.heroBackground} alt="Gedung SMK Negeri 26 Jakarta" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-dark/95 via-primary/80 to-soft-blue/60" aria-hidden="true" />
          <div className="mx-auto w-full max-w-[1025px] text-center">
            <ProfileBadge>PROFIL SMK NEGERI 26 JAKARTA</ProfileBadge>
            <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-[-.02em] md:text-6xl md:leading-[1.12]">
              Belajar, Bekerja, Membangun!
            </h1>
            <p className="mx-auto mt-6 max-w-[1025px] text-base leading-7 text-white/85 md:text-lg">
              SMK Negeri 26 Jakarta merupakan sekolah menengah kejuruan yang berkomitmen membentuk generasi yang kompeten, berkarakter, inovatif, dan siap menghadapi dunia kerja serta perkembangan teknologi.
            </p>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-[45px] grid w-[min(1200px,100%-32px)] grid-cols-2 gap-4 rounded-xl bg-gradient-to-r from-primary-dark via-primary to-soft-blue px-5 py-5 text-white shadow-[0_8px_24px_rgba(15,23,42,.16)] sm:grid-cols-3 md:grid-cols-5 md:gap-0 md:px-8">
          {[
            ["6", "Jurusan"],
            ["1750+", "Siswa Aktif"],
            ["80", "Pendidik"],
            ["50", "Mitra Industri"],
            ["24", "Ekstrakulikuler"],
          ].map(([value, label]) => (
            <div className="flex flex-col items-center justify-center px-3 py-2 text-center md:border-r md:border-white/60 last:border-r-0" key={label}>
              <strong className="text-2xl font-bold md:text-3xl">{value}</strong>
              <span className="mt-1 text-xs font-medium text-white/90">{label}</span>
            </div>
          ))}
        </section>

        <section className="mx-auto grid w-[min(1272px,100%-32px)] gap-12 py-20 md:grid-cols-[538px_1fr] md:items-center md:py-24">
          <div className="relative isolate h-[365px]">
            <span className="absolute left-[12%] top-[4%] -z-10 aspect-square w-[82%] rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue" aria-hidden="true" />
            <span className="absolute left-[6%] top-[10%] -z-10 aspect-square w-[94%] rounded-full border-4 border-white" aria-hidden="true" />
            <img className="relative z-10 h-[265px] w-[452px] max-w-full rounded-[14px] object-cover shadow-[0_12px_40px_rgba(15,23,42,.12)] md:absolute md:left-[4%] md:top-[50px]" src={figmaAssets.profile.overviewPhoto} alt="Lingkungan SMK Negeri 26 Jakarta" />
            <span className="absolute bottom-0 left-0 z-20 size-14 rounded-full bg-gradient-to-br from-soft-blue to-primary" aria-hidden="true" />
          </div>
          <div>
            <ProfileBadge>MENGENAL SMK</ProfileBadge>
            <h2 className="mt-5 text-3xl font-bold leading-[1.2] md:text-4xl">
              Mengenal SMK Negeri 26 Jakarta
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              SMK Negeri 26 Jakarta hadir sebagai satuan pendidikan vokasi yang mengembangkan kompetensi siswa melalui pembelajaran yang relevan dengan kebutuhan dunia usaha dan dunia industri. Dengan mengintegrasikan pembelajaran, teknologi, pengalaman praktik, dan kemitraan industri, SMK Negeri 26 Jakarta terus mendorong siswa untuk berkembang dan menghasilkan karya nyata.
            </p>
            <a className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-dark via-primary to-soft-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(15,23,42,.12)]" href="/tour">
              Jelajahi Sekolah
              <img className="size-5 brightness-0 invert" src={figmaAssets.icons.arrowRight} alt="" />
            </a>
          </div>
        </section>

        <section className="bg-[#F4F8FF] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px] text-center">
            <ProfileBadge>VISI &amp; MISI SEKOLAH</ProfileBadge>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">Visi &amp; Misi Sekolah</h2>
            <p className="mx-auto mt-4 max-w-[908px] text-base leading-7 text-muted md:text-lg">
              Menjadi landasan SMK Negeri 26 Jakarta dalam membentuk lulusan yang berkarakter, kompeten, inovatif, dan siap menghadapi perkembangan dunia kerja serta tantangan global.
            </p>
            <div className="relative mx-auto mt-12 max-w-[1272px] overflow-hidden rounded-3xl bg-white p-8 text-left shadow-[0_4px_16px_rgba(15,23,42,.06)] md:p-12">
              <span className="absolute -right-10 top-0 size-44 rounded-full bg-gradient-to-br from-primary via-primary-dark to-primary" aria-hidden="true" />
              <ProfileBadge>VISI SEKOLAH</ProfileBadge>
              <p className="relative mt-5 max-w-[900px] text-2xl font-semibold leading-10 text-ink md:text-3xl">
                &quot;SMK teknologi unggul yang menghasilkan lulusan berkarakter, kompeten, inovatif, dan berdaya saing global.&quot;
              </p>
            </div>
            <div className="mt-16 text-left">
              <ProfileBadge>MISI SEKOLAH</ProfileBadge>
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">Delapan Langkah untuk Masa Depan yang Lebih Baik</h3>
              <p className="mt-4 max-w-[894px] text-base leading-7 text-muted">
                Misi SMK Negeri 26 Jakarta diwujudkan melalui pembelajaran yang berpusat pada murid, penguatan kompetensi, pemanfaatan teknologi, serta kolaborasi dengan dunia industri.
              </p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {missions.map(([number, title, description]) => (
                  <details className="group rounded-2xl border border-school-bg bg-white" key={number}>
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 font-bold text-ink marker:hidden">
                      <span className="text-3xl font-bold text-primary">{number}</span>
                      <span className="flex-1">{title}</span>
                      <span className="text-primary transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                    </summary>
                    <p className="border-t border-school-bg px-5 py-4 text-sm leading-6 text-muted">{description}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-soft-blue via-primary to-primary-dark px-6 py-20 text-white md:px-10 md:py-24">
          <div className="mx-auto w-[min(1272px,100%-32px)]">
          <div className="text-center">
            <ProfileBadge>IDENTITAS SMK NEGERI 26 JAKARTA</ProfileBadge>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">Identitas yang Menjadi Karakter Kami</h2>
            <p className="mx-auto mt-4 max-w-[872px] text-base leading-7 text-white/85">
              Nilai, semangat, dan prinsip yang menjadi bagian dari perjalanan SMK Negeri 26 Jakarta dalam membentuk generasi yang siap belajar, bekerja, dan membangun.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["MOTTO", "Belajar, Bekerja, Membangun", "Menjadi pedoman dalam setiap langkah untuk terus belajar, menghasilkan karya, dan memberikan kontribusi nyata bagi masyarakat.", figmaAssets.profile.mottoBackground],
              ["SEMBOYAN", "Bersih, Jujur, Disiplin dan Terbuka", "Nilai yang menjadi landasan dalam membangun pribadi yang berintegritas, bertanggung jawab, disiplin, dan terbuka dalam kehidupan sekolah maupun masyarakat.", figmaAssets.profile.semboyanBackground],
              ["MARS", "Derap Langkah Cita Bersama", "Mengasah keterampilan melalui praktik dan pengalaman produksi nyata di lingkungan Mars SMK Negeri 26 Jakarta menjadi simbol semangat dan kebersamaan warga sekolah dalam melangkah menuju masa depan sekolah.", figmaAssets.profile.marsBackground],
            ].map(([label, title, description, image]) => (
              <article className="relative min-h-[215px] overflow-hidden rounded-3xl border-2 border-white/70 bg-white p-7 text-ink shadow-[0_4px_16px_rgba(15,23,42,.08)]" key={label}>
                <img className="absolute inset-0 size-full object-cover opacity-45" src={image} alt="" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20" aria-hidden="true" />
                <div className="relative">
                <span className="text-sm font-bold tracking-[.16em] text-primary">{label}</span>
                <h3 className="mt-4 text-xl font-bold leading-7">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className="bg-[#F4F8FF] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px]">
            <div className="text-center">
              <ProfileBadge>SEJARAH SMK NEGERI 26 JAKARTA</ProfileBadge>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">Jejak Perjalanan SMK Negeri 26 Jakarta</h2>
              <p className="mx-auto mt-4 max-w-[848px] text-base leading-7 text-muted">
                Dari sekolah teknologi pembangunan hingga menjadi SMK Negeri 26 Jakarta, setiap perubahan menjadi bagian dari perjalanan dalam membangun pendidikan vokasi.
              </p>
            </div>
            <div className="relative mt-16 grid gap-8 md:grid-cols-4 md:gap-0">
              <span className="absolute left-0 right-0 top-4 hidden h-1 bg-soft-blue md:block" aria-hidden="true" />
              {milestones.map(([year, title, description], index) => (
                <article className={`relative z-10 px-4 md:min-h-[260px] ${index % 2 === 1 ? "md:pt-32" : ""}`} key={year}>
                  <span className="mx-auto block size-4 rounded-full border-2 border-white bg-soft-blue shadow-[0_0_0_2px_#4cbaf5] md:mx-0" aria-hidden="true" />
                  <strong className="mt-5 block text-xl font-bold text-primary-dark">{year}</strong>
                  <h3 className="mt-4 text-lg font-bold leading-7">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

export { ProfilePage };
