import { supportTeam } from "../data/organization";
import { TeacherDirectoryPage } from "./TeacherDirectoryPage";

export function TimPendukungSekolahPage() {
  return (
    <TeacherDirectoryPage
      description="Mereka yang memastikan lingkungan sekolah tetap aman, nyaman, dan siap untuk setiap aktivitas."
      teachers={supportTeam}
      title="Pendukung Sekolah"
    />
  );
}
