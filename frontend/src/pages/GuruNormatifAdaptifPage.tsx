import { normativeTeachers } from "../data/organization";
import { TeacherDirectoryPage } from "./TeacherDirectoryPage";

export function GuruNormatifAdaptifPage() {
  return (
    <TeacherDirectoryPage
      description="Membekali siswa dengan pengetahuan dan dasar kompetensi untuk mendukung perjalanan belajar di SMK Negeri 26 Jakarta."
      teachers={normativeTeachers}
      title="Normatif & Adaptif"
    />
  );
}
