import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, usePathname } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import {
  getAchievements,
  getPortfolioProjects,
  getSignedPortfolioFile,
  removePortfolioFile,
  updateAchievement,
  updatePortfolio,
  uploadPortfolioFile,
} from "../components/student/portfolio/portfolio.api";
import type { PortfolioProject, StudentAchievement } from "../components/student/portfolio/portfolio.types";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { getCachedApi } from "../lib/api";
import { useToast } from "../components/shared/ToastProvider";

const inputClass = "h-11 w-full rounded-xl border border-[#cbd9ea] bg-white px-3 text-[12px] text-ink outline-none transition placeholder:text-[#9aaac2] focus:border-primary focus:ring-2 focus:ring-[#d7edff]";
const fallbackImage = "/assets/pages/siswapages/portofolioprestasi.png";
type RecordFile = NonNullable<PortfolioProject["files"]>[number];
type UploadState = "ready" | "uploading" | "uploaded" | "failed";
type NewUpload = { id: string; file: File; previewUrl: string; state: UploadState };

export function StudentPortfolioEditPage({ kind }: { kind: "project" | "achievement" }) {
  const { me } = useAuth();
  return (
    <RequireAuth>
      {me?.profile.account_type === "STUDENT" ? <EditContent kind={kind} /> : <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>}
    </RequireAuth>
  );
}

function EditContent({ kind }: { kind: "project" | "achievement" }) {
  const { addToast } = useToast();
  const pathname = usePathname();
  const id = decodeURIComponent(pathname.replace(/\/$/, "").split("/").slice(-2, -1)[0] || "");
  const project = kind === "project";
  const [record, setRecord] = useState<PortfolioProject | StudentAchievement | null>(() => {
    const records = project ? getCachedApi<PortfolioProject[]>("/api/student/portfolio") : getCachedApi<StudentAchievement[]>("/api/student/achievements");
    return records?.find((item) => item.id === id) || null;
  });
  const [existingFiles, setExistingFiles] = useState<RecordFile[]>(() => record?.files || []);
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});
  const [removedFileIds, setRemovedFileIds] = useState<string[]>([]);
  const [uploads, setUploads] = useState<NewUpload[]>([]);
  const previewUrls = useRef(new Set<string>());
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(() => !record);
  const [saving, setSaving] = useState(false);

  useEffect(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const [projects, achievements] = await Promise.all([getPortfolioProjects(), getAchievements()]);
      const next = project ? projects.find((item) => item.id === id) || null : achievements.find((item) => item.id === id) || null;
      if (!active) return;
      setRecord(next);
      const files = next?.files || [];
      setExistingFiles(files);
      const signed = await Promise.all(files.map(async (file) => {
        try {
          const result = await getSignedPortfolioFile(project ? "portfolio" : "achievement", file.id);
          return [file.id, result.url] as const;
        } catch {
          return [file.id, ""] as const;
        }
      }));
      if (active) setFileUrls(Object.fromEntries(signed));
    };
    load().catch((reason) => {
      if (active) setStatus(reason instanceof Error ? reason.message : "Data gagal dimuat.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [id, project]);

  const splitList = (value: FormDataEntryValue | null) => String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);

  function value(key: string) {
    if (!record) return "";
    if (key === "title") return record.title;
    if (key === "date") return record.date;
    if (key === "description") return record.description;
    if (project && "category" in record && key === "category") return record.category;
    if (project && "summary" in record && key === "summary") return record.summary;
    if (project && "skills" in record && key === "skills") return record.skills.join(", ");
    if (project && "role" in record && key === "role") return record.role;
    if (project && "purpose" in record && key === "purpose") return record.purpose || "";
    if (project && "background" in record && key === "background") return record.background || "";
    if (project && "features" in record && key === "features") return (record.features || []).join("\n");
    if (project && "outputs" in record && key === "outputs") return (record.outputs || []).join("\n");
    if (project && "lessonsLearned" in record && key === "lessonsLearned") return record.lessonsLearned || "";
    if (project && "github" in record && key === "github") return record.github || "";
    if (project && "demoUrl" in record && key === "demoUrl") return record.demoUrl || "";
    if (!project && "type" in record && key === "type") return record.type;
    if (!project && "competition" in record && key === "competition") return record.competition;
    if (!project && "organizer" in record && key === "organizer") return record.organizer;
    if (!project && "level" in record && key === "level") return record.level;
    if (!project && "rank" in record && key === "rank") return record.rank;
    return "";
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";
    if (!selected.length) return;
    if (selected.some((file) => !/image\/(jpeg|png|webp)/i.test(file.type))) {
      addToast({ variant: "error", title: "Format file tidak didukung", description: "Gunakan JPG, PNG, atau WebP." });
      return;
    }
    if (selected.some((file) => file.size > 4 * 1024 * 1024)) {
      addToast({ variant: "error", title: "Ukuran file terlalu besar", description: "Maksimal 4 MB per file agar kompatibel dengan serverless upload." });
      return;
    }
    const activeExisting = existingFiles.filter((file) => !removedFileIds.includes(file.id)).length;
    if (activeExisting + uploads.length + selected.length > 6) {
      addToast({ variant: "error", title: "Terlalu banyak gambar", description: "Maksimal 6 gambar per karya." });
      return;
    }
    const next = selected.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      previewUrls.current.add(previewUrl);
      return { id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, file, previewUrl, state: "ready" as const };
    });
    setUploads((current) => [...current, ...next]);
    addToast({ variant: "info", title: "File siap diunggah", description: `${selected.length} file akan disimpan saat perubahan dikonfirmasi.` });
  }

  function removeNew(idToRemove: string) {
    setUploads((current) => current.filter((item) => item.id !== idToRemove));
  }

  function moveUpload(index: number, direction: -1 | 1) {
    setUploads((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    setStatus("Menyimpan perubahan...");
    try {
      const updated = project
        ? await updatePortfolio(id, { title: String(form.get("title")), category: String(form.get("category")), summary: String(form.get("summary")), description: String(form.get("description")), skills: splitList(form.get("skills")), role: String(form.get("role")), purpose: String(form.get("purpose") || ""), background: String(form.get("background") || ""), features: splitList(form.get("features")), outputs: splitList(form.get("outputs")), lessonsLearned: String(form.get("lessonsLearned") || ""), github: String(form.get("github") || ""), demoUrl: String(form.get("demoUrl") || ""), date: String(form.get("date")) })
        : await updateAchievement(id, { title: String(form.get("title")), type: String(form.get("type")), competition: String(form.get("competition")), organizer: String(form.get("organizer")), level: String(form.get("level")), rank: String(form.get("rank")), date: String(form.get("date")), description: String(form.get("description")), evidence: "" });
      for (const fileId of removedFileIds) await removePortfolioFile(project ? "portfolio" : "achievement", fileId);
      for (let index = 0; index < uploads.length; index += 1) {
        const upload = uploads[index];
        setUploads((current) => current.map((item) => item.id === upload.id ? { ...item, state: "uploading" } : item));
        try {
          await uploadPortfolioFile(project ? "portfolio" : "achievement", updated.id, upload.file);
          setUploads((current) => current.map((item) => item.id === upload.id ? { ...item, state: "uploaded" } : item));
          setStatus(`Mengunggah ${index + 1}/${uploads.length} gambar...`);
        } catch (reason) {
          setUploads((current) => current.map((item) => item.id === upload.id ? { ...item, state: "failed" } : item));
          throw reason;
        }
      }
      setRemovedFileIds([]);
      setStatus(uploads.length ? `Perubahan tersimpan. ${uploads.length} gambar berhasil diunggah.` : "Perubahan tersimpan.");
      addToast({ variant: "success", title: project ? "Draf berhasil disimpan" : "Prestasi berhasil disimpan", description: "Data tetap mengikuti status backend dan dapat dikirim ulang untuk verifikasi." });
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Perubahan gagal disimpan.";
      setStatus(message);
      addToast({ variant: "error", title: project ? "Draf gagal disimpan" : "Prestasi gagal disimpan", description: message, duration: null });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Edit"><div className="h-72 animate-pulse rounded-2xl bg-white" /></StudentPortalLayout>;
  if (!record) return <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Edit"><section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white p-12 text-center"><h1 className="text-[18px] font-bold text-ink">Data tidak ditemukan</h1><Link className="mt-4 inline-flex text-[12px] font-semibold text-primary" to="/dashboard/portfolio">Kembali ke portofolio</Link></section></StudentPortalLayout>;

  const visibleFiles = existingFiles.filter((file) => !removedFileIds.includes(file.id));
  const fields = project
    ? [["title", "Judul proyek"], ["category", "Kategori"], ["summary", "Ringkasan"], ["description", "Deskripsi proyek"], ["skills", "Teknologi / keahlian · opsional"], ["role", "Peran siswa"], ["date", "Tanggal"]]
    : [["title", "Nama prestasi"], ["type", "Jenis prestasi"], ["competition", "Kompetisi atau kegiatan"], ["organizer", "Penyelenggara"], ["level", "Tingkat"], ["rank", "Peringkat atau hasil"], ["date", "Tanggal"], ["description", "Deskripsi"]];

  return (
    <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Edit">
      <div className="grid min-w-0 gap-5">
        <Link to="/dashboard/portfolio" className="inline-flex w-fit text-[12px] font-semibold text-primary">← Kembali ke Portofolio</Link>
        <header><h1 className="text-[28px] font-bold tracking-[-.03em] text-ink">Edit {project ? "Portofolio" : "Prestasi"}</h1><p className="mt-2 text-[13px] text-muted">Perubahan akan kembali menjadi draf dan perlu dikirim ulang untuk verifikasi.</p></header>
        {status && <p role="status" className="rounded-xl border border-[#dce8f5] bg-white p-4 text-[12px] text-muted">{status}</p>}
        <form onSubmit={submit} className="grid min-w-0 gap-6 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6">
          <FormSection title="Informasi dasar" copy="Field utama karya dan metadata siswa.">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map(([name, label]) => <Field key={name} name={name} label={label} value={value(name)} multiline={name === "description" || name === "summary"} type={name === "date" ? "date" : "text"} required={!name.includes("skills") && !name.includes("opsional")} />)}
            </div>
          </FormSection>
          {project && <>
            <FormSection title="Detail proyek" copy="Field opsional; bagian kosong tidak ditampilkan pada detail.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field name="purpose" label="Tujuan proyek · opsional" value={value("purpose")} multiline />
                <Field name="background" label="Latar belakang · opsional" value={value("background")} multiline />
                <Field name="features" label="Fitur / implementasi · opsional" value={value("features")} multiline helper="Satu item per baris atau pisahkan dengan koma." />
                <Field name="outputs" label="Hasil / output · opsional" value={value("outputs")} multiline helper="Satu item per baris atau pisahkan dengan koma." />
                <Field name="lessonsLearned" label="Catatan pembelajaran · opsional" value={value("lessonsLearned")} multiline />
              </div>
            </FormSection>
            <FormSection title="Tautan" copy="Tambahkan repository atau demo jika tersedia.">
              <div className="grid gap-5 sm:grid-cols-2"><Field name="github" label="GitHub · opsional" value={value("github")} type="url" /><Field name="demoUrl" label="Website / demo · opsional" value={value("demoUrl")} type="url" /></div>
            </FormSection>
          </>}
          <FormSection title="Dokumentasi" copy="File private Storage, JPEG/PNG/WebP, maksimal 4 MB per file dan 6 file total.">
            {visibleFiles.length ? <div className="grid gap-3 sm:grid-cols-2">{visibleFiles.map((file, index) => <div key={file.id} className="min-w-0 rounded-xl border border-[#e1e9f4] p-2"><img src={fileUrls[file.id] || fallbackImage} alt={`Dokumentasi tersimpan ${index + 1}`} className="aspect-[4/3] w-full rounded-lg object-contain" /><button type="button" onClick={() => setRemovedFileIds((current) => [...current, file.id])} className="mt-2 text-[11px] font-semibold text-[#d62929]">Hapus dari karya</button></div>)}</div> : <p className="text-[11px] text-muted">Belum ada file tersimpan.</p>}
            <label className="grid gap-2 text-[11px] font-medium text-ink"><span>Tambah dokumentasi · opsional</span><input type="file" multiple={project} accept="image/jpeg,image/png,image/webp" onChange={onFiles} className="text-[11px] text-muted" /><small className="text-[10px] text-muted">File baru akan diunggah setelah perubahan disimpan.</small></label>
            {uploads.length > 0 && <div className="grid gap-3 sm:grid-cols-2">{uploads.map((upload, index) => <div key={upload.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#d7e9f8] bg-[#f7fcff] p-3"><img src={upload.previewUrl} alt={`Pratinjau ${upload.file.name}`} className="size-16 shrink-0 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-[11px] text-muted">{upload.file.name}</p><p className="mt-1 text-[10px] text-primary">{upload.state === "ready" ? "Siap diunggah" : upload.state === "uploading" ? "Mengunggah..." : upload.state === "uploaded" ? "Berhasil diunggah" : "Gagal diunggah"}</p></div>{upload.state === "ready" && <div className="flex shrink-0 gap-1"><button type="button" disabled={index === 0} onClick={() => moveUpload(index, -1)} className="rounded border border-[#b9dafa] px-2 py-1 text-[10px] text-primary disabled:opacity-40" aria-label="Pindah ke atas">↑</button><button type="button" disabled={index === uploads.length - 1} onClick={() => moveUpload(index, 1)} className="rounded border border-[#b9dafa] px-2 py-1 text-[10px] text-primary disabled:opacity-40" aria-label="Pindah ke bawah">↓</button><button type="button" onClick={() => removeNew(upload.id)} className="text-[11px] font-semibold text-[#d62929]">Hapus</button></div>}</div>)}</div>}
          </FormSection>
          <div className="flex flex-wrap gap-3 border-t border-[#e7edf5] pt-5"><button type="submit" disabled={saving} className="min-h-10 rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Menyimpan..." : "Simpan perubahan"}</button><Link to="/dashboard/portfolio" className="inline-flex min-h-10 items-center rounded-xl border border-[#b9dafa] px-5 text-[12px] font-semibold text-primary">Batal</Link></div>
        </form>
      </div>
    </StudentPortalLayout>
  );
}

function FormSection({ title, copy, children }: { title: string; copy: string; children: ReactNode }) {
  return <section className="grid gap-4 border-b border-[#e7edf5] pb-6 last:border-0 last:pb-0"><div><h2 className="text-[15px] font-bold text-ink">{title}</h2><p className="mt-1 text-[11px] leading-5 text-muted">{copy}</p></div>{children}</section>;
}

function Field({ name, label, value, multiline = false, type = "text", required = false, helper }: { name: string; label: string; value: string; multiline?: boolean; type?: string; required?: boolean; helper?: string }) {
  return <label className="grid gap-2 text-[11px] font-medium text-ink"><span>{label}</span>{multiline ? <textarea name={name} defaultValue={value} className={`${inputClass} h-24 resize-y py-3`} required={required} /> : <input name={name} type={type} defaultValue={value} className={inputClass} required={required} />}{helper && <small className="text-[10px] text-muted">{helper}</small>}</label>;
}
