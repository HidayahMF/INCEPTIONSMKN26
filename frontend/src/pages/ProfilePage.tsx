import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const missions = [
  ["01", "Karakter & Nilai", "Menanamkan nilai-nilai keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa, kewargaan, penalaran kritis, kreativitas, kemandirian, kolaborasi, kesehatan, serta komunikasi."],
  ["05", "Profesionalisme Pendidik", "Mengembangkan kompetensi keahlian sesuai kebutuhan dunia usaha/dunia industri (DUDI) melalui teaching factory, magang, guru tamu, dan sertifikasi."],
  ["02", "Kompetensi Keahlian", "Menyelenggarakan pembelajaran mendalam yang berpusat pada murid untuk mengembangkan kemampuan berpikir kritis, kreatif, inovatif, kolaboratif, dan komunikatif."],
  ["06", "Kemitraan Strategis", "Mengintegrasikan teknologi digital dan proyek nyata dalam proses pembelajaran."],
  ["03", "Pembelajaran Berpusat", "Meningkatkan profesionalisme pendidik dan tenaga kependidikan melalui pendidikan/pelatihan, inovasi pembelajaran dan penguasaan teknologi terkini."],
  ["07", "Teknologi & Proyek Nyata", "Membangun kemitraan strategis dengan dunia usaha/dunia industri (DUDI), perguruan tinggi, dan masyarakat untuk mendukung pembelajaran kontekstual dan berkelanjutan."],
  ["04", "Kemampuan Bahasa Asing", "Meningkatkan kemampuan berbahasa asing murid guna mendukung lulusan yang berdaya saing global."],
  ["08", "Sarana & Prasarana", "Menyediakan sarana dan prasarana pembelajaran yang sesuai standar pendidikan."],
] as const;

const milestones = [
  ["1971", "STM Pembangunan Jakarta", "Awal perjalanan pendidikan teknologi pembangunan di Jakarta melalui peresmian sekolah pada 1 Juli 1971."],
  ["1971-1985", "Proyek Perintis Sekolah Teknologi Menengah Pembangunan", "SMK Negeri 26 menjadi bagian dari perjalanan proyek perintis pendidikan teknologi menengah pembangunan di Indonesia."],
  ["1986", "STMN Pembangunan Jakarta", "Sekolah mengalami perubahan menjadi STMN Pembangunan Jakarta sebagai bagian dari perkembangan pendidikan kejuruan."],
  ["1997 - Now", "SMK Negeri 26 Jakarta", "Nomenklatur sekolah berubah menjadi SMK Negeri 26 Jakarta dan terus berkembang sebagai sekolah vokasi teknologi."],
] as const;

function ProfileBadge({ children, icon }: { children: string; icon?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      {icon ? <img className="size-[18px] object-contain" src={icon} alt="" aria-hidden="true" /> : <span className="size-2 rounded-full bg-soft-blue" aria-hidden="true" />}
      {children}
    </span>
  );
}

function ProfilePage() {
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#F4F8FF] text-ink">
      <PublicNavbar />
      <main>
        <section className="relative isolate flex h-[626px] items-start overflow-visible bg-[#F4F8FF] px-6 pt-[146px] text-ink max-md:h-[680px] max-md:overflow-hidden max-md:pt-[128px] md:px-16">
          <img className="absolute left-0 top-[30px] z-0 h-[757px] w-full object-cover object-top max-md:top-[390px] max-md:h-auto max-md:w-full max-md:object-contain" src={figmaAssets.profile.heroBackground} alt="Gedung SMK Negeri 26 Jakarta" />
          <div className="pointer-events-none absolute inset-x-0 top-10 z-[1] h-auto bg-gradient-to-b from-[#F4F8FF] via-[#F4F8FF] to-[#F4F8FF]/90" aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full max-w-[1025px] text-center">
            <ProfileBadge>PROFIL SMK NEGERI 26 JAKARTA</ProfileBadge>
            <h1 className="mt-6 text-4xl font-bold leading-[54px] tracking-[-.02em] md:text-[48px] md:leading-[72px]">
              Belajar, Bekerja, <span className="bg-gradient-to-r from-primary-dark via-primary to-soft-blue bg-clip-text text-transparent">Membangun!</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[1025px] text-[20px] font-medium leading-[30px] text-muted max-md:max-w-[350px] max-md:text-base max-md:leading-6">
              SMK Negeri 26 Jakarta merupakan sekolah menengah kejuruan yang berkomitmen membentuk generasi yang kompeten, berkarakter, inovatif, dan siap menghadapi dunia kerja serta perkembangan teknologi.
            </p>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-[45px] h-[160px] w-[min(1200px,100%-32px)] translate-y-[100px] max-md:mt-4 max-md:h-auto max-md:translate-y-0">
          <h2 className="pointer-events-none absolute -top-12 left-0 right-0 z-20 text-center text-xl font-bold text-primary-dark md:hidden">Overview Statistic</h2>
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 overflow-hidden rounded-[12px] bg-gradient-to-r from-primary-dark via-primary to-soft-blue text-white shadow-[0_8px_24px_rgba(15,23,42,.16)] sm:grid-cols-3 md:grid-cols-5 max-md:relative">
            {[
              ["6", "Jurusan"],
              ["1750+", "Siswa Aktif"],
              ["80", "Pendidik"],
              ["50", "Mitra Industri"],
              ["24", "Ekstrakulikuler"],
            ].map(([value, label], index) => (
              <div className={`flex h-[90px] flex-col items-center justify-center border-r border-white/60 px-3 text-center last:border-r-0 max-md:h-auto max-md:min-h-[68px] max-md:border-b max-md:border-white/70 max-md:nth-[2n]:border-r-0 ${index === 4 ? "max-md:col-span-2 max-md:border-b-0" : ""}`} key={label}>
                <strong className={`${index === 0 ? "text-[36px] leading-[44px] max-md:text-[26px] max-md:leading-[31px]" : "text-[32px] leading-[39px] max-md:text-[24px] max-md:leading-[29px]"} font-bold`}>{value}</strong>
                <span className="mt-1 text-base font-medium leading-[19px] text-white/90 max-md:mt-0.5 max-md:text-[11px] max-md:leading-4">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-[45px] grid min-h-[549px] min-w-0 w-full bg-white px-6 py-16 md:grid-cols-[minmax(0,538px)_minmax(0,1fr)] md:items-center md:gap-[68px] md:px-[84px] md:py-[40px]">
          <img className="mx-auto h-auto max-h-[365px] w-full max-w-[538px] object-contain" src={figmaAssets.profile.overviewComposite} alt="Lingkungan SMK Negeri 26 Jakarta" />
          <div className="min-w-0 md:pt-[30px]">
          
            <h2 className="mt-5 max-w-[494px] text-[36px] font-bold leading-[54px] md:text-[44px] md:leading-[53.25px]">
              Mengenal
              <br />
              <span className="bg-gradient-to-r from-primary-dark via-primary to-soft-blue bg-clip-text text-transparent">SMK Negeri 26 Jakarta</span>
            </h2>
            <p className="mt-5 max-w-[652px] text-[20px] leading-[30px] text-muted">
              SMK Negeri 26 Jakarta hadir sebagai satuan pendidikan vokasi yang mengembangkan kompetensi siswa melalui pembelajaran yang relevan dengan kebutuhan dunia usaha dan dunia industri. Dengan mengintegrasikan pembelajaran, teknologi, pengalaman praktik, dan kemitraan industri, SMK Negeri 26 Jakarta terus mendorong siswa untuk berkembang dan menghasilkan karya nyata.
            </p>
            <a className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-dark via-primary to-soft-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(15,23,42,.12)] transition-[background-color,background-image,color,box-shadow] duration-300 ease-out hover:border-0 hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-0 focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none" href="/tour">
              Jelajahi Sekolah
              <span
                className="size-5 shrink-0 bg-white group-hover:bg-primary group-focus-visible:bg-primary"
                style={{
                  maskImage: `url(${figmaAssets.icons.arrowRight})`,
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskImage: `url(${figmaAssets.icons.arrowRight})`,
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                }}
                aria-hidden="true"
              />
            </a>
          </div>
        </section>

        <section className="min-h-[1016px] min-w-0 overflow-hidden bg-[#F4F8FF] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px] text-center">
            <h2 className="mt-5 text-[32px] font-bold leading-[48px]">
              <span className="text-primary-dark">Visi &amp; Misi</span> <span className="text-ink">Sekolah</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[908px] text-lg leading-[30px] text-muted">
              Menjadi landasan SMK Negeri 26 Jakarta dalam membentuk lulusan yang berkarakter, kompeten, inovatif, dan siap menghadapi perkembangan dunia kerja serta tantangan global.
            </p>
            <div className="relative mx-auto mt-12 h-[219px] max-w-[1272px] overflow-hidden rounded-3xl bg-white p-8 text-left shadow-[0_4px_16px_rgba(15,23,42,.06)] md:p-12">
              <img className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none object-contain" src="/assets/figma/profile/VISI SEKOLAHujung.png" alt="" aria-hidden="true" />
              <div className="relative z-10 flex items-center gap-2">
                <img className="size-[22px] object-contain" src="/assets/figma/profile/icondisampingjudulvisimisi.png" alt="" aria-hidden="true" />
                <span className="text-sm font-semibold text-soft-blue">VISI SEKOLAH</span>
              </div>
              <p className="relative z-10 mt-5 max-w-[927px] text-[32px] font-bold leading-[48px] text-ink">
                <span className="text-primary-dark">&quot;</span>SMK teknologi unggul yang menghasilkan lulusan <span className="text-primary-dark">berkarakter</span>, kompeten, inovatif, dan berdaya saing global.<span className="text-primary-dark">&quot;</span>
              </p>
              <img className="absolute bottom-6 left-12 h-[5px] w-[64px] object-fill" src="/assets/figma/profile/GARISBAWAHVISISEKOLAH.png" alt="" aria-hidden="true" />
            </div>
            <div className="mt-16 text-center">
              <ProfileBadge icon="/assets/figma/profile/icondisampingjudulvisimisi.png">MISI SEKOLAH</ProfileBadge>
              <h3 className="mt-5 text-[32px] font-bold leading-[48px]"><span className="text-primary-dark">Delapan Langkah</span> <span className="text-ink">untuk Masa Depan yang Lebih Baik</span></h3>
              <p className="mx-auto mt-4 max-w-[894px] text-lg leading-[30px] text-muted">
                Misi SMK Negeri 26 Jakarta diwujudkan melalui pembelajaran yang berpusat pada murid, penguatan kompetensi, pemanfaatan teknologi, serta kolaborasi dengan dunia industri.
              </p>
              <div className="mt-8 grid items-start gap-3 md:grid-cols-2">
                {missions.map(([number, title, description]) => (
                  <details className="group self-start overflow-hidden rounded-2xl border border-school-bg bg-white" key={number}>
                    <summary className="flex min-h-[76px] cursor-pointer list-none items-center justify-start gap-4 px-6 py-4 text-left font-bold text-ink marker:hidden">
                      <span className="w-[44px] shrink-0 text-left text-[32px] font-bold leading-[48px] text-primary">{number}</span>
                      <span className="min-w-0 flex-1 text-left text-2xl leading-[29px]">{title}</span>
                      <span className="size-5 shrink-0 rotate-[-90deg] bg-ink transition-transform duration-300 group-open:rotate-90" style={{ maskImage: `url(${figmaAssets.icons.chevronDown})`, maskPosition: "center", maskRepeat: "no-repeat", maskSize: "8px 14px", WebkitMaskImage: `url(${figmaAssets.icons.chevronDown})`, WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat", WebkitMaskSize: "8px 14px" }} aria-hidden="true" />
                    </summary>
                    <p className="border-t border-school-bg px-6 pb-6 pt-5 text-left text-base leading-7 text-muted">{description}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[701px] bg-gradient-to-br from-soft-blue via-primary to-primary-dark px-6 py-20 text-white md:px-10 md:py-[44px]">
          <div className="mx-auto w-[min(1272px,100%-32px)]">
          <div className="text-center">
            <ProfileBadge>IDENTITAS SMK NEGERI 26 JAKARTA</ProfileBadge>
            <h2 className="mt-5 text-[36px] font-bold leading-[54px]">Identitas yang Menjadi Karakter Kami</h2>
            <p className="mx-auto mt-4 max-w-[872px] text-lg leading-[30px] text-white/85">
              Nilai, semangat, dan prinsip yang menjadi bagian dari perjalanan SMK Negeri 26 Jakarta dalam membentuk generasi yang siap belajar, bekerja, dan membangun.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-[996px] gap-12 md:grid-cols-3">
            {[
              ["MOTTO", "Belajar, Bekerja, Membangun", "Menjadi pedoman dalam setiap langkah untuk terus belajar, menghasilkan karya, dan memberikan kontribusi nyata bagi masyarakat.", figmaAssets.profile.mottoBackground, figmaAssets.profile.mottoTitle],
              ["SEMBOYAN", "Bersih, Jujur, Disiplin dan Terbuka", "Nilai yang menjadi landasan dalam membangun pribadi yang berintegritas, bertanggung jawab, disiplin, dan terbuka dalam kehidupan sekolah maupun masyarakat.", figmaAssets.profile.semboyanBackground, figmaAssets.profile.semboyanTitle],
              ["MARS", "Derap Langkah Cita Bersama", "Mengasah keterampilan melalui praktik dan pengalaman produksi nyata di lingkungan Mars SMK Negeri 26 Jakarta menjadi simbol semangat dan kebersamaan warga sekolah dalam melangkah menuju masa depan sekolah.", figmaAssets.profile.marsBackground, figmaAssets.profile.marsTitle],
            ].map(([label, subtitle, description, image, titleImage]) => (
                <article id={label === "MARS" ? "mars" : undefined} className="group relative h-[400px] w-full overflow-hidden rounded-3xl border-2 border-white/70 bg-white p-7 text-ink shadow-[0_4px_16px_rgba(15,23,42,.08)] md:w-[300px]" key={label}>
                <img className="absolute bottom-0 left-0 h-[215px] w-full object-cover opacity-100" src={image} alt="" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/65 to-transparent" aria-hidden="true" />
                <div className="relative">
                <img className="h-[52px] w-auto max-w-full object-contain object-left" src={titleImage} alt={label} />
                <h3 className="mt-3 text-xl font-bold leading-7">{subtitle}</h3>
                <p className="mt-4 text-xs leading-[18px] text-muted">{description}</p>
                {label === "MARS" && <a className="absolute left-0 top-[286px] inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary shadow-[0_4px_12px_rgba(15,23,42,.12)] transition-[background,color,box-shadow] duration-300 ease-out hover:bg-gradient-to-r hover:from-primary-dark hover:to-primary hover:text-white hover:shadow-[0_4px_16px_rgba(15,23,42,.16)]" href="/mars"><img className="size-4" src={figmaAssets.videoProfile.playIcon} alt="" />Dengar Mars SMKN 26</a>}
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className="min-h-[612px] bg-[#F4F8FF] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1272px]">
            <div className="text-center">
              <ProfileBadge>SEJARAH SMK NEGERI 26 JAKARTA</ProfileBadge>
              <h2 className="mt-5 text-[32px] font-bold leading-[48px]">Jejak Perjalanan <span className="text-primary-dark">SMK Negeri 26 Jakarta</span></h2>
              <p className="mx-auto mt-4 max-w-[848px] text-lg leading-[30px] text-muted">
                Dari sekolah teknologi pembangunan hingga menjadi SMK Negeri 26 Jakarta, setiap perubahan menjadi bagian dari perjalanan dalam membangun pendidikan vokasi.
              </p>
            </div>
            <div className="relative mt-16 grid gap-8 pb-8 md:grid-cols-4 md:gap-0">
              <img className="pointer-events-none absolute left-0 right-0 top-[220px] hidden h-auto w-full md:block" src={figmaAssets.profile.timelineLine} alt="" aria-hidden="true" />
              {milestones.map(([year, title, description], index) => (
                <article className={`relative z-10 min-w-0 px-4 md:min-h-[460px] ${index % 2 === 1 ? "md:pt-[260px]" : "md:pt-0"} ${index === 3 ? "md:pr-6" : ""}`} key={year}>
                  <strong className="block text-2xl font-bold leading-9 text-primary-dark">{year}</strong>
                  <h3 className="mt-2 break-words text-2xl font-bold leading-9">{title}</h3>
                  <p className="mt-2 break-words text-sm leading-[21px] text-muted">{description}</p>
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
