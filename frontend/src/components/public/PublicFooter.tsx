import { figmaAssets } from "../../assets/figmaAssets";

const columns = [
  ["Tentang Kami", ["Profil Sekolah", "Struktur & Unit Kerja", "School Tour", "Mitra Industri"]],
  ["Jurusan", ["Konstruksi Gedung & Sanitasi", "Teknik Elektronika & Komunikasi", "Teknik Instalasi Tenaga Listrik", "Teknik Fabrikasi Logam & Manufaktur", "Teknik Kendaraan Ringan", "Sistem Informasi, Jaringan & Aplikasi"]],
  ["Program", ["LSP", "Organisasi Sekolah", "Ekstrakurikuler", "BKK"]],
  ["BLUD", ["KGStudio", "UPTECHNO", "E-MAN", "Manufaktur26", "Garage26", "GADIZ VOKASI"]],
  ["Informasi", ["Berita", "Prestasi", "Portal Informasi", "Pembangunan.AI"]],
] as const;

const footerIcon = {
  whatsapp: "/assets/figma/footer/footer-svg-03.svg",
  email: "/assets/figma/footer/footer-svg-04.svg",
  address: "/assets/figma/footer/footer-svg-13.svg",
  instagram: "/assets/figma/footer/footer-svg-07.svg",
  youtube: "/assets/figma/footer/footer-svg-08.svg",
};

function linkHref(title: string, link: string) {
  if (title === "Tentang Kami") {
    if (link === "Profil Sekolah") return "/profile";
    if (link === "School Tour") return "/tour";
    return "/majors";
  }
  return "/information";
}

export function PublicFooter() {
  return (
    <footer className="box-border min-h-[626px] bg-[linear-gradient(125deg,#95d8fd_0%,#4cbaf5_34.034%,#0092ff_100%)] px-6 pb-6 pt-12 text-white md:px-[84px]">
      <div className="relative flex flex-col gap-6 md:grid md:h-11 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-8">
        <h2 className="m-0 shrink-0 text-xl leading-7 md:justify-self-start">
          Dapatkan Informasi
          <br />
          SMKN 26 Jakarta
        </h2>
        <form
          className="flex h-11 w-full min-w-0 gap-2 md:w-[654px] md:justify-self-center"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="min-w-0 flex-1 rounded-full border-0 bg-white px-4 text-ink outline-none"
            aria-label="Email"
            placeholder="Ketik Email disini..."
            type="email"
          />
          <button
            className="h-11 w-28 shrink-0 rounded-full border border-white/35 bg-gradient-to-r from-primary-dark via-primary to-soft-blue font-semibold text-white"
            type="submit"
          >
            Kirim
          </button>
        </form>
        <div className="flex gap-3 md:static md:justify-self-end">
          <a
            className="grid size-[45px] place-items-center rounded-full bg-white"
            href="#footer-social"
            aria-label="Instagram"
          >
            <img className="size-[22px]" src={footerIcon.instagram} alt="" />
          </a>
          <a
            className="grid size-[45px] place-items-center rounded-full bg-white"
            href="#footer-social"
            aria-label="YouTube"
          >
            <img className="size-[22px]" src={footerIcon.youtube} alt="" />
          </a>
          <a
            className="grid size-[45px] place-items-center rounded-full bg-white"
            href="#footer-social"
            aria-label="Email"
          >
            <img className="size-[22px]" src={footerIcon.email} alt="" />
          </a>
        </div>
      </div>
      <div className="my-8 h-px bg-white/70" />
      <div className="grid gap-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)_249px] lg:gap-11">
        <div className="max-w-[300px]">
          <div className="flex items-center gap-2.5">
            <img
              className="size-16 object-contain"
              src={figmaAssets.branding.schoolLogo}
              alt="SMK Negeri 26 Jakarta"
            />
            <div>
              <strong className="block text-[13px] italic">
                SMK NEGERI 26
                <br />
                JAKARTA
              </strong>
              <em className="mt-1 block text-[11px] italic">
                Belajar, Bekerja, Membangun
              </em>
            </div>
          </div>
          <p className="mt-3 text-xs leading-[18px] text-white/90">
            Membentuk generasi yang kompeten melalui pembelajaran vokasi,
            pengalaman nyata, dan semangat untuk terus berkarya serta membangun
            masa depan.
          </p>
          <a
            className="mt-3 flex items-start gap-2 text-xs leading-[18px] text-white/90 no-underline"
            href="tel:+62214720310"
          >
            <img
              className="size-[18px] shrink-0 object-contain"
              src={footerIcon.whatsapp}
              alt=""
            />
            (021) 4720310
          </a>
          <a
            className="mt-3 flex items-start gap-2 text-xs leading-[18px] text-white/90 no-underline"
            href="mailto:smkn26jkt@gmail.com"
          >
            <img
              className="size-[18px] shrink-0 object-contain"
              src={footerIcon.email}
              alt=""
            />
            smkn26jkt@gmail.com
          </a>
          <address className="mt-3 flex items-start gap-2 text-xs leading-[18px] not-italic text-white/90">
            <img
              className="size-[18px] shrink-0 object-contain"
              src={footerIcon.address}
              alt=""
            />
            Jl. Balai Pustaka Baru No. 1, Rawamangun, Kec. Pulo Gadung, Kota
            Jakarta Timur, DKI Jakarta 13220
          </address>
        </div>
        <div className="grid content-start grid-cols-2 gap-[26px] md:grid-cols-3">
          {[
            columns.slice(0, 2),
            columns.slice(2, 4),
            columns.slice(4),
          ].map((group, groupIndex) => (
            <div className="grid content-start gap-[26px]" key={groupIndex}>
              {group.map(([title, links]) => (
                <div key={title}>
                  <h3 className="mb-3.5 inline-block text-base font-bold">
                    {title}
                  </h3>
                  {links.map((link) => (
                    <a
                      className="mb-[9px] block text-xs leading-4 text-white/90 no-underline hover:text-ink"
                      href={linkHref(title, link)}
                      key={link}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-3.5 inline-block text-base font-bold">
            Lokasi Sekolah
          </h3>
          <img
            className="w-full max-w-[249px] rounded-[18px] border-2 border-white object-cover"
            src="/assets/figma/footer/footer-raw-02.png"
            alt="Peta lokasi SMK Negeri 26 Jakarta"
          />
        </div>
      </div>
      <div className="mt-8 h-px bg-white/70" />
      <p className="mt-6 text-center text-sm leading-6">
        © 2026 SMKN 26 Jakarta. Semua Hak Dilindungi.
      </p>
    </footer>
  );
}
