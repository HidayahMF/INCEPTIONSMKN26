import { useState, type ReactNode } from "react";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentSidebar } from "../components/student/StudentSidebar";
import { StudentTopbar } from "../components/student/StudentTopbar";
import { PortalShellHost, usePortalShellHost } from "./PortalShellContext";

export function StudentPortalLayout({ children, breadcrumb = "Beranda" }: { children: ReactNode; breadcrumb?: string }) {
  const hosted = usePortalShellHost();
  const { me } = useAuth();
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");

  if (hosted) return <>{children}</>;

  function unavailable(label: string) {
    setNotice(`${label} segera hadir di portal siswa.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  const shell = (
    <div className="portal-shell min-h-screen overflow-x-hidden bg-[#f3f7fd] text-ink">
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:block ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <StudentSidebar me={me} onClose={() => setOpen(false)} onUnavailable={unavailable} />
      </div>
      {open && <button type="button" aria-label="Tutup navigasi siswa" className="fixed inset-0 z-40 bg-ink/30 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="portal-main-offset min-h-screen">
        <StudentTopbar me={me} onOpenMenu={() => setOpen(true)} onUnavailable={unavailable} breadcrumb={breadcrumb} />
        <main className="mx-auto w-full max-w-[1400px] px-5 py-7 sm:px-8 lg:px-8 lg:py-8">{children}</main>
      </div>
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-xl">{notice}</div>}
    </div>
  );
  return <PortalShellHost>{shell}</PortalShellHost>;
}
