import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import type { StaffMember } from "../data/organization";

const gradientText =
  "bg-[linear-gradient(90deg,#006cdc,#0092ff)] bg-clip-text text-transparent";

export function staffSlug(teacher: StaffMember) {
  return `${teacher.name}-${teacher.role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function TeacherCard({ teacher }: { teacher: StaffMember }) {
  return (
    <a
      className="block overflow-hidden rounded-[14px] border border-[#dce8f5] bg-white shadow-[0_4px_12px_rgba(15,23,42,.05)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary"
      href={`/guru/${staffSlug(teacher)}`}
    >
      <img
        alt=""
        className="aspect-[1.08] w-full object-cover object-top"
        draggable={false}
        src={teacher.photo}
      />
      <div className="min-h-[70px] px-3 py-2.5 text-left">
        <h2 className={`${gradientText} text-sm font-bold leading-5`}>
          {teacher.name}
        </h2>
        <p className="mt-0.5 text-[10px] leading-4 text-ink">{teacher.role}</p>
      </div>
    </a>
  );
}

export function TeacherDirectoryPage({
  title,
  description,
  teachers,
}: {
  title: string;
  description: string;
  teachers: StaffMember[];
}) {
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#f3f8ff] text-ink">
      <PublicNavbar />
      <main className="px-6 pb-20 pt-[132px] sm:px-8 lg:px-12">
        <section aria-labelledby="teacher-directory-title" className="relative mx-auto max-w-[1280px]">
          <div aria-hidden="true" className="absolute left-0 top-10 size-6 rounded-full bg-gradient-to-br from-[#4cbaf5] to-primary md:size-8" />
          <div aria-hidden="true" className="absolute right-0 top-6 size-6 rounded-full bg-gradient-to-br from-primary to-[#4cbaf5] md:size-8" />
          <div className="mx-auto max-w-[760px] text-center">
            <div data-aos="fade-down">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)] sm:text-xs">
                <img alt="" className="size-2" src={figmaAssets.struktur.badgeIcon} />
                PENDIDIK SMK NEGERI 26 JAKARTA
              </span>
            </div>
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-4 text-[28px] font-bold leading-9 text-ink sm:text-[38px] sm:leading-[48px]"
              id="teacher-directory-title"
            >
              Guru <span className={gradientText}>{title}</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-2 max-w-[650px] text-xs leading-5 text-muted sm:text-sm sm:leading-6">
              {description}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {teachers.map((teacher, index) => (
              <div data-aos="fade-up" data-aos-delay={Math.min(index * 60, 360)} key={teacher.name + teacher.role}>
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
