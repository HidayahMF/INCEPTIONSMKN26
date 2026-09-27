import { PublicNavbar } from "../components/public/PublicNavbar";
import { SchoolMajors } from "../components/public/SchoolMajors";

export function MajorsPage() {
  return <div className="min-h-screen bg-white"><PublicNavbar /><main><SchoolMajors page /></main></div>;
}
