import { useState, type ReactNode } from "react";

import { figmaAssets } from "../assets/figmaAssets";
import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { staffSlug } from "./TeacherDirectoryPage";
import {
  educationStaff,
  normativeTeachers,
  principal,
  statistics,
  supportTeam,
  vicePrincipals,
  vocationalTeachers,
  type StaffMember,
} from "../data/organization";

const gradientText =
  "bg-[linear-gradient(90deg,#006cdc,#0092ff)] bg-clip-text text-transparent";

function GradientText({ children }: { children: string }) {
  return <span className={gradientText}>{children}</span>;
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <img alt="" className="h-[17px] w-[13.6px]" src="/assets/figma/majors/icon-section-badge.svg" />
      {label}
    </span>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <a
      className="relative mx-auto flex h-[430px] w-full max-w-[305px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[18.3px] border border-[1.525px] border-school-bg bg-white p-[15px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary min-[768px]:h-[450px]"
      data-staff-card
      href={`/guru/${staffSlug(member)}`}
    >
      <img
        alt=""
        className="pointer-events-none absolute left-[-2.3px] top-[-1.52px] aspect-[304.779/354] w-[calc(100%+4.6px)] max-w-none select-none object-cover"
        draggable={false}
        src={member.photo}
      />
      <div className="relative flex min-h-[66px] w-full flex-col gap-1">
        <h3
          className={`${gradientText} text-[18px] font-bold leading-[30px] lg:text-[20px]`}
        >
          {member.name}
        </h3>
        <p className="w-full text-sm leading-[16px] text-ink">{member.role}</p>
      </div>
    </a>
  );
}

function StaffGrid({ members }: { members: StaffMember[] }) {
  return (
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-5 px-4 pb-2 min-[768px]:grid-cols-2 min-[1040px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[1280px]:px-0">
      {members.map((member) => (
        <StaffCard key={member.name + member.role} member={member} />
      ))}
    </div>
  );
}

function StaffHeading({
  id,
  lead,
  accent,
  description,
  action,
}: {
  id: string;
  lead: string;
  accent: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-[calc(100%-3rem)] max-w-[1280px] flex-col gap-5 text-left lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex min-w-0 flex-col gap-1">
        <h3
          className="m-0 text-[26px] font-bold leading-[34px] text-ink lg:text-[36px] lg:leading-[54px]"
          id={id}
        >
          {lead} <GradientText>{accent}</GradientText>
        </h3>
        <p className="m-0 max-w-[698px] text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function SectionHeading({ badge, children }: { badge: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-1 text-center">
      <div className="mb-7">
        <SectionBadge label={badge} />
      </div>
      {children}
    </div>
  );
}

function SectionAction({ href }: { href: string }) {
  return (
    <CtaLink className="shrink-0 self-start lg:self-center" href={href}>
      Lihat Semua
    </CtaLink>
  );
}

function PrincipalSection() {
  return (
    <section
      aria-labelledby="principal-heading"
      className="mx-auto w-full max-w-[1200px] px-6 md:px-10"
    >
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
        <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-[24px] border-2 border-school-bg sm:h-[420px] lg:h-[420px] lg:w-[350px]">
          <img
            alt="Foto Kepala SMK Negeri 26 Jakarta"
            className="absolute inset-0 size-full max-w-none rounded-[24px] object-cover"
            src={principal.photo}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-1">
            <SectionBadge label="KEPALA SEKOLAH" />
            <h2
              className="m-0 text-[28px] font-bold leading-[38px] text-ink lg:text-[36px] lg:leading-[54px]"
              id="principal-heading"
            >
              <span className={gradientText}>{principal.nameLeadGradient}</span>
              {principal.nameRemainder}
            </h2>
            <p className="m-0 max-w-[572px] text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
              {principal.summary}
            </p>
          </div>
          <dl className="grid w-full grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {principal.facts.map((fact) => (
              <div key={fact.label}>
                <dt
                  className={`${gradientText} text-base font-bold leading-[30px] lg:text-xl`}
                >
                  {fact.label}
                </dt>
                <dd className="m-0 max-w-[295px] text-sm leading-[18px] text-muted">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function VicePrincipalSection() {
  return (
    <section aria-labelledby="vice-principal-heading" className="w-full">
      <SectionHeading badge="WAKIL KEPALA SEKOLAH">
        <h2
          className="m-0 text-[24px] font-bold leading-[34px] text-ink lg:text-[32px] lg:leading-[48px]"
          id="vice-principal-heading"
        >
          <GradientText>Wakil Kepala</GradientText> SMK Negeri 26 Jakarta
        </h2>
        <p className="m-0 text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
          Struktur yang Menggerakkan Sekolah
        </p>
      </SectionHeading>
      <div className="mt-6">
        <StaffGrid members={vicePrincipals} />
      </div>
    </section>
  );
}

type TeacherFilterId = "semua" | "normatif" | "kejuruan";

const teacherFilters: readonly { id: TeacherFilterId; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "normatif", label: "Guru Normatif" },
  { id: "kejuruan", label: "Guru Kejuruan" },
];

function TeacherFilter({
  value,
  onChange,
}: {
  value: TeacherFilterId;
  onChange: (next: TeacherFilterId) => void;
}) {
  return (
    <div
      aria-label="Saring kategori pendidik"
      className="flex w-full max-w-[558px] items-center overflow-hidden rounded-full bg-white shadow-[0_4px_8px_rgba(15,23,42,.08)]"
      role="tablist"
    >
      {teacherFilters.map((option) => {
        const active = option.id === value;
        return (
          <button
            aria-selected={active}
            className={`w-1/3 shrink-0 whitespace-nowrap px-2 py-3 text-center text-sm font-medium transition-colors duration-300 sm:w-[186px] sm:px-6 sm:py-4 sm:text-xl ${
              active
                ? "rounded-full bg-[linear-gradient(90deg,#006cdc,#0092ff)] text-white"
                : "text-ink hover:text-primary-dark"
            }`}
            key={option.id}
            onClick={() => onChange(option.id)}
            role="tab"
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function TeacherDirectorySection() {
  const [filter, setFilter] = useState<TeacherFilterId>("semua");
  const showNormative = filter !== "kejuruan";
  const showVocational = filter !== "normatif";

  return (
    <section aria-labelledby="teacher-directory-heading" className="w-full">
      <SectionHeading badge="PENDIDIK SMK NEGERI 26 JAKARTA">
        <h2
          className="m-0 text-[24px] font-bold leading-[34px] text-ink lg:text-[32px] lg:leading-[48px]"
          id="teacher-directory-heading"
        >
          Kenali Para <GradientText>Pendidik</GradientText>
        </h2>
        <p className="m-0 text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
          Mereka yang membimbing, menginspirasi, dan mengembangkan potensi siswa.
        </p>
      </SectionHeading>
      <div className="mt-6 flex justify-center">
        <TeacherFilter onChange={setFilter} value={filter} />
      </div>
      <div className="mt-6 flex flex-col gap-6 lg:gap-8">
        {showNormative ? (
          <div aria-labelledby="normative-heading" className="flex flex-col gap-6 lg:gap-7">
            <StaffHeading
              accent="Normatif & Adaptif"
              description="Membangun dasar pengetahuan dan keterampilan untuk setiap langkah belajar."
              id="normative-heading"
              lead="Guru"
              action={<SectionAction href="/guru-normatif-adaptif" />}
            />
            <StaffGrid members={normativeTeachers} />
          </div>
        ) : null}
        {showVocational ? (
          <div aria-labelledby="vocational-heading" className="flex flex-col gap-6 lg:gap-7">
            <StaffHeading
              accent="Kejuruan"
              description="Membentuk kompetensi dan keterampilan sesuai dunia kerja dan bidang keahlian."
              id="vocational-heading"
              lead="Guru"
              action={<SectionAction href="/guru-kejuruan" />}
            />
            <StaffGrid members={vocationalTeachers} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function EducationStaffSection() {
  return (
    <section aria-labelledby="education-staff-heading" className="w-full">
      <SectionHeading badge="TENDIK SMK NEGERI 26 JAKARTA">
        <StaffHeading
          accent="Kependidikan"
          description="Mereka yang mendukung setiap proses dan layanan sekolah agar berjalan dengan baik."
          id="education-staff-heading"
          lead="Tenaga"
          action={<SectionAction href="/tenaga-kependidikan" />}
        />
      </SectionHeading>
      <div className="mt-6">
        <StaffGrid members={educationStaff} />
      </div>
    </section>
  );
}

function SupportTeamSection() {
  return (
    <section aria-labelledby="support-team-heading" className="w-full">
<SectionHeading badge="TIM PENDUKUNG SMK NEGERI 26 JAKARTA">
        <StaffHeading
          accent="Pendukung Sekolah"
          description="Mereka yang memastikan lingkungan sekolah tetap aman, nyaman, dan siap untuk setiap aktivitas."
          id="support-team-heading"
          lead="Tim"
          action={<SectionAction href="/tim-pendukung-sekolah" />}
        />
      </SectionHeading>
      <div className="mt-6">
        <StaffGrid members={supportTeam} />
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      aria-labelledby="organization-title"
      className="relative isolate z-20 min-h-[865px] min-w-0 overflow-visible bg-[#eaf5ff] px-6 pt-[140px] md:min-h-[895px] md:px-10 md:pt-[140px]"
    >
      <img
        alt="Gedung SMK Negeri 26 Jakarta dan tenaga pendidik"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full max-w-full object-cover object-top"
        src={figmaAssets.struktur.heroBackground}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#eaf5ff]/0 via-[#eaf5ff]/0 to-[#eaf5ff]/10"
      />
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.12)]">
          <img alt="" className="h-[17px] w-[13.6px]" src={figmaAssets.struktur.badgeIcon} />
          STRUKTUR &amp; UNIT KERJA
        </span>
        <h1
          className="mt-4 max-w-[1000px] text-[32px] font-bold leading-10 tracking-[-.02em] text-white drop-shadow-[0_3px_3px_rgba(15,23,42,.14)] md:text-[48px] md:leading-[58px]"
          id="organization-title"
        >
          <span>Di Balik </span>
          <span className="bg-[linear-gradient(90deg,#4cbaf5,#0092ff_50%,#006cdc)] bg-clip-text text-transparent">
            SMK Negeri 26 Jakarta
          </span>
          <br />
          Ada Tim yang Membangun Bersama
        </h1>
        <p className="mt-3 max-w-[1000px] text-base font-medium leading-6 text-white drop-shadow-[0_2px_3px_rgba(15,23,42,.2)] md:text-[20px] md:leading-[30px]">
          Kenali para pendidik dan tenaga kependidikan yang berperan dalam mendukung
          proses pembelajaran, pengembangan kompetensi, serta layanan di SMK Negeri 26
          Jakarta.
        </p>
        <CtaLink className="mt-4" href="#organization-statistics">
          Lihat Daftar Guru
        </CtaLink>
      </div>
      <div
        className="absolute bottom-0 left-1/2 z-30 grid w-[min(1200px,calc(100%-32px))] -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-2xl bg-[linear-gradient(90deg,#4cbaf5,#0092ff_50%,#006cdc)] text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:grid-cols-5 max-sm:grid-cols-2"
        id="organization-statistics"
      >
        {statistics.map(([value, label]) => (
          <div
            className="flex min-h-[90px] flex-col items-center justify-center border-r border-dashed border-white/80 px-2 py-3 text-center last:border-r-0 max-sm:nth-[odd]:border-r max-sm:nth-[-n+4]:border-b sm:last:border-r-0"
            key={label}
          >
            <strong className="text-[34px] font-bold leading-10">{value}</strong>
            <span className="mt-1 text-base leading-5 text-white/95">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StrukturUnitKerjaPage() {
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-white text-ink">
      <PublicNavbar />
      <main>
        <HeroSection />
          <div className="flex flex-col gap-[56px] pb-[88px] pt-24 lg:gap-[88px]">
          <PrincipalSection />
          <VicePrincipalSection />
          <TeacherDirectorySection />
          <EducationStaffSection />
          <SupportTeamSection />
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
