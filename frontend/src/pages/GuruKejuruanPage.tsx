import { vocationalTeachers } from "../data/organization";
import { TeacherDirectoryPage } from "./TeacherDirectoryPage";

export function GuruKejuruanPage() {
  return (
    <TeacherDirectoryPage
      description="Membentuk kompetensi dan keterampilan sesuai dunia kerja dan bidang keahlian."
      teachers={vocationalTeachers}
      title="Kejuruan"
    />
  );
}
