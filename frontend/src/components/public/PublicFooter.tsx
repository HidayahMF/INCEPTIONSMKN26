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

const schoolAddress =
  "SMK Negeri 26 Jakarta, Jl. Balai Pustaka Baru No. 1, Rawamangun, Jakarta Timur";
const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=SMK+Negeri+26+Jakarta%2C+Jl.+Balai+Pustaka+Baru+No.+1%2C+Rawamangun%2C+Jakarta+Timur";
const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=SMK+Negeri+26+Jakarta%2C+Jl.+Balai+Pustaka+Baru+No.+1%2C+Rawamangun%2C+Jakarta+Timur&output=embed";

function linkHref(title: string, link: string) {
  const routes: Record<string, string> = {
    "Tentang Kami:Profil Sekolah": "/profile",
    "Tentang Kami:Struktur & Unit Kerja": "/struktur-unit-kerja",
    "Tentang Kami:School Tour": "/tour",
    "Tentang Kami:Mitra Industri": "/partners",
    "Jurusan:Konstruksi Gedung & Sanitasi": "/majors/kgs",
    "Jurusan:Teknik Elektronika & Komunikasi": "/majors/tek",
    "Jurusan:Teknik Instalasi Tenaga Listrik": "/majors/titl",
    "Jurusan:Teknik Fabrikasi Logam & Manufaktur": "/majors/tflm",
    "Jurusan:Teknik Kendaraan Ringan": "/majors/tkr",
    "Jurusan:Sistem Informasi, Jaringan & Aplikasi": "/majors/sija",
    "Program:LSP": "/programs",
    "Program:Organisasi Sekolah": "/programs",
    "Program:Ekstrakurikuler": "/programs",
    "Program:BKK": "/programs",
    "BLUD:KGStudio": "/blud/kgstudio",
    "BLUD:UPTECHNO": "/blud/uptechno",
    "BLUD:E-MAN": "/blud/e-man",
    "BLUD:Manufaktur26": "/blud/manufaktur26",
    "BLUD:Garage26": "/blud/garage26",
    "BLUD:GADIZ VOKASI": "/blud/gadiz-vokasi",
    "Informasi:Berita": "/news",
    "Informasi:Prestasi": "/achievements",
    "Informasi:Portal Informasi": "/information",
    "Informasi:Pembangunan.AI": "/#ai-cta",
  };
  return routes[`${title}:${link}`] ?? "/";
}

export function PublicFooter() {
  return (
    <footer className="box-border min-h-[626px] min-w-0 max-w-full overflow-x-clip bg-[linear-gradient(125deg,#95d8fd_0%,#4cbaf5_34.034%,#0092ff_100%)] pb-6 pt-12 text-white">
      <div className="mx-auto w-[min(1272px,100%-32px)]">
      <div className="relative flex flex-col items-center justify-center gap-6 min-[1272px]:grid min-[1272px]:h-11 min-[1272px]:grid-cols-[1fr_auto_1fr] min-[1272px]:items-end min-[1272px]:gap-8">
        <h2 className="m-0 shrink-0 text-center text-xl font-bold leading-7 min-[1272px]:justify-self-start">
          Dapatkan Informasi
          <br />
          SMKN 26 Jakarta
        </h2>
        <form
          className="flex h-11 w-full min-w-0 items-center overflow-hidden rounded-full bg-white min-[1272px]:w-[654px] min-[1272px]:justify-self-center"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="min-w-0 flex-1 border-0 bg-transparent pl-6 pr-4 text-sm text-ink outline-none placeholder:text-muted"
            aria-label="Email"
            placeholder="Ketik Email disini..."
            type="email"
          />
          <button
            className="h-11 w-28 shrink-0 rounded-full border-0 bg-gradient-to-r from-primary-dark via-primary to-soft-blue font-medium text-white transition-[background,color] duration-300 hover:bg-white hover:bg-none hover:text-primary focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary"
            type="submit"
          >
            Kirim
          </button>
        </form>
        <div className="flex gap-3 min-[1272px]:static min-[1272px]:justify-self-end">
          <a
            className="grid size-[45px] place-items-center rounded-full bg-white"
            href="https://www.instagram.com/smkn.26jakarta/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img className="size-[22px]" src={footerIcon.instagram} alt="" />
          </a>
          <a
            className="grid size-[45px] place-items-center rounded-full bg-white"
            href="https://www.youtube.com/@smkn26jakarta23"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <img className="size-[22px]" src={footerIcon.youtube} alt="" />
          </a>
          <a
            className="grid size-[45px] place-items-center rounded-full bg-white"
            href="mailto:smkn26jkt@gmail.com"
            aria-label="Email"
          >
            <img className="size-[22px]" src={footerIcon.email} alt="" />
          </a>
        </div>
      </div>
      <div className="my-8 h-px bg-white/70" />
      <div className="grid min-w-0 gap-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)_249px] lg:gap-11">
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
              className="size-[18px] shrink-0 object-contain brightness-0 invert"
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
        <div className="grid min-w-0 grid-cols-1 content-start gap-[26px] sm:grid-cols-2 md:grid-cols-3">
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
                      className="mb-[9px] block break-words text-xs leading-4 text-white/90 no-underline hover:text-primary"
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
          <div className="w-full max-w-[249px]">
          <div className="relative block aspect-[249/150] overflow-hidden rounded-[18px] border-2 border-white bg-[#dbeafe]">
            <iframe
              className="pointer-events-none size-full border-0"
              src={googleMapsEmbedUrl}
              title={`Pratinjau peta ${schoolAddress}`}
              loading="lazy"
            />
          </div>
          <a
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/70 px-3 py-2 text-xs font-medium text-white transition-[background,color] duration-300 hover:bg-white hover:text-primary focus-visible:bg-white focus-visible:text-primary"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
          </div>
        </div>
      </div>
      <div className="mt-8 h-px bg-white/70" />
      <p className="mt-6 text-center text-sm leading-6">
        © 2026 SMKN 26 Jakarta. Semua Hak Dilindungi.
      </p>
      </div>
    </footer>
  );
}
