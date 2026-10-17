import { figmaAssets } from "../../assets/figmaAssets";

const columns = [
  ["Tentang Kami", ["Profil Sekolah", "Struktur & Unit Kerja", "School Tour", "Mitra Industri"]],
  ["Jurusan", ["Konstruksi Gedung & Sanitasi", "Teknik Elektronika & Komunikasi", "Teknik Instalasi Tenaga Listrik", "Teknik Fabrikasi Logam & Manufaktur", "Teknik Kendaraan Ringan", "Sistem Informasi, Jaringan & Aplikasi"]],
  ["Program", ["LSP", "Organisasi Sekolah", "Ekstrakurikuler", "BKK"]],
  ["BLUD", ["KGStudio", "UPTECHNO", "E-MAN", "Manufaktur26", "Garage26", "GADIZ VOKASI"]],
  ["Informasi", ["Berita", "Prestasi", "Portal Informasi", "Pembangunan.AI"]],
] as const;

const footerIcon = {
  whatsapp: "/assets/shared/footer/footer-whatsapp.svg",
  email: "/assets/shared/footer/footer-email.svg",
  address: "/assets/shared/footer/footer-address.svg",
  instagram: "/assets/shared/footer/footer-instagram.svg",
  youtube: "/assets/shared/footer/footer-youtube.svg",
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
    "Program:LSP": "/programs/lsp",
    "Program:Organisasi Sekolah": "/programs/organisasi",
    "Program:Ekstrakurikuler": "/programs/ekstrakurikuler",
    "Program:BKK": "/programs/bkk",
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
        <h2 className="m-0 shrink-0 text-left text-xl font-bold leading-7 min-[1272px]:justify-self-start">
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
             className="mr-[-1px] h-11 w-28 shrink-0 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue font-medium text-white transition-[background,color,border-color,box-shadow] duration-300 hover:border-[#CBD5E1] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none"
            type="submit"
          >
            Kirim
          </button>
        </form>
        <div className="flex gap-3 min-[1272px]:static min-[1272px]:justify-self-end">
          <a
             className="group grid size-[45px] place-items-center rounded-full border border-transparent bg-white transition-[background,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-primary-dark focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:bg-primary-dark"
            href="https://www.instagram.com/smkn.26jakarta/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
             <img className="size-[22px] transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src={footerIcon.instagram} alt="" />
          </a>
          <a
             className="group grid size-[45px] place-items-center rounded-full border border-transparent bg-white transition-[background,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-primary-dark focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:bg-primary-dark"
            href="https://www.youtube.com/@smkn26jakarta23"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
             <img className="size-[22px] transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src={footerIcon.youtube} alt="" />
          </a>
          <a
             className="group grid size-[45px] place-items-center rounded-full border border-transparent bg-white transition-[background,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-primary-dark focus-visible:-translate-y-0.5 focus-visible:border-white focus-visible:bg-primary-dark"
            href="mailto:smkn26jkt@gmail.com"
            aria-label="Email"
          >
             <img className="size-[22px] transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src={footerIcon.email} alt="" />
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
             className="group mt-3 flex items-start gap-2 text-xs leading-[18px] text-white/90 no-underline transition-colors duration-300 hover:text-white"
            href="tel:+62214720310"
          >
            <img
               className="size-[18px] shrink-0 object-contain brightness-0 invert transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:[filter:brightness(0)_saturate(100%)_invert(43%)_sepia(97%)_saturate(1800%)_hue-rotate(185deg)_brightness(98%)_contrast(102%)]"
              src={footerIcon.whatsapp}
              alt=""
            />
            (021) 4720310
          </a>
          <a
             className="group mt-3 flex items-start gap-2 text-xs leading-[18px] text-white/90 no-underline transition-colors duration-300 hover:text-white"
            href="mailto:smkn26jkt@gmail.com"
          >
            <img
               className="size-[18px] shrink-0 object-contain brightness-0 invert transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:[filter:brightness(0)_saturate(100%)_invert(43%)_sepia(97%)_saturate(1800%)_hue-rotate(185deg)_brightness(98%)_contrast(102%)]"
              src={footerIcon.email}
              alt=""
            />
            smkn26jkt@gmail.com
          </a>
           <address className="group mt-3 flex items-start gap-2 text-xs leading-[18px] not-italic text-white/90 transition-colors duration-300 hover:text-white">
            <img
               className="size-[18px] shrink-0 object-contain brightness-0 invert transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:[filter:brightness(0)_saturate(100%)_invert(43%)_sepia(97%)_saturate(1800%)_hue-rotate(185deg)_brightness(98%)_contrast(102%)]"
              src={footerIcon.address}
              alt=""
            />
            Jl. Balai Pustaka Baru No. 1, Rawamangun, Kec. Pulo Gadung, Kota
            Jakarta Timur, DKI Jakarta 13220
          </address>
        </div>
        <div className="grid min-w-0 grid-cols-1 content-start gap-[26px] md:grid-cols-3">
          {[
            columns.slice(0, 2),
            columns.slice(2, 4),
            columns.slice(4),
          ].map((group, groupIndex) => (
            <div className="grid grid-cols-2 content-start gap-[26px] md:grid-cols-1" key={groupIndex}>
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
        <div className="max-md:text-center">
          <h3 className="mb-3.5 inline-block text-base font-bold">
            Lokasi Sekolah
          </h3>
          <div className="w-full max-w-[249px] max-md:mx-auto max-md:max-w-full">
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
