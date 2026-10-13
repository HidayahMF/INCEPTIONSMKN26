import { useRef } from "react";
import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import type { StaffMember } from "../data/organization";
import { useFloatShapes } from "../lib/useFloatShapes";

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
      className="relative mx-auto flex h-[430px] w-full max-w-[305px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[18.3px] border border-[1.525px] border-school-bg bg-white p-[15px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary min-[768px]:h-[450px]"
      href={`/guru/${staffSlug(teacher)}`}
    >
      <img
        alt=""
        className="pointer-events-none absolute left-[-2.3px] top-[-1.52px] aspect-[304.779/354] w-[calc(100%+4.6px)] max-w-none select-none object-cover"
        draggable={false}
        src={teacher.photo}
      />
      <div className="relative flex min-h-[66px] w-full flex-col gap-1 text-left">
        <h2 className={`${gradientText} text-[18px] font-bold leading-[30px] lg:text-[20px]`}>
          {teacher.name}
        </h2>
        <p className="w-full text-sm leading-[16px] text-ink">{teacher.role}</p>
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
  const leftDecorationRef = useRef<HTMLImageElement>(null);
  const rightDecorationRef = useRef<HTMLImageElement>(null);
  useFloatShapes([
    { ref: leftDecorationRef, duration: 3600, distance: -14 },
    { ref: rightDecorationRef, duration: 4200, distance: 16 },
  ]);

  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#f3f8ff] text-ink">
      <PublicNavbar />
      <main className="px-6 pb-20 pt-[132px] sm:px-8 lg:px-12">
        <section aria-labelledby="teacher-directory-title" className="relative mx-auto max-w-[1280px]">
          <img
            ref={leftDecorationRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-[-30px] top-14 aspect-square h-[60px] w-[60px] max-w-none md:left-[-30px] md:top-20"
            src="/assets/shared/decorations/kiri.png"
            alt=""
          />
          <img
            ref={rightDecorationRef}
            aria-hidden="true"
            className="pointer-events-none absolute right-[-30px] top-5 aspect-square h-[60px] w-[60px] max-w-none md:right-[-30px] md:top-2"
            src="/assets/shared/decorations/kanan.png"
            alt=""
          />
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
