import { educationStaff } from "../data/organization";
import { TeacherDirectoryPage } from "./TeacherDirectoryPage";

export function TenagaKependidikanPage() {
  return (
    <TeacherDirectoryPage
      description="Mereka yang mendukung setiap proses dan layanan sekolah agar berjalan dengan baik."
      teachers={educationStaff}
      title="Kependidikan"
    />
  );
}
