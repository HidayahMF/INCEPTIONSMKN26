import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import type { LostFoundType } from "../components/student/lostfound/lostfound.types";
import { createLostFoundItem } from "../components/student/lostfound/lostfound.api";
import { ActionModal } from "../components/shared/ActionModal";
import { useToast } from "../components/shared/ToastProvider";

type ReportValues = {
  type: LostFoundType;
  name: string;
  category: string;
  description: string;
  location: string;
  date: string;
  photo: File | null;
  additional: string;
};

type ReportErrors = Partial<Record<keyof ReportValues | "photo", string>>;

const categories = [
  "Dompet & tas",
  "Kartu & dokumen",
  "Perlengkapan minum",
  "Alat tulis",
  "Aksesori",
  "Elektronik",
  "Pakaian",
  "Lainnya",
];
const locations = [
  "Perpustakaan",
  "Kantin sekolah",
  "Lapangan upacara",
  "Lab SIJA",
  "Aula sekolah",
  "Ruang kelas",
  "Lokasi lainnya",
];
const inputClass =
  "h-11 w-full rounded-xl border border-[#cbd9ea] bg-white px-3 text-[12px] text-ink outline-none transition placeholder:text-[#9aaac2] focus:border-primary focus:ring-2 focus:ring-[#d7edff]";
const todayValue = new Date().toISOString().slice(0, 10);

function initialValues(): ReportValues {
  return {
    type: "LOST",
    name: "",
    category: "Dompet & tas",
    description: "",
    location: "",
    date: "",
    photo: null,
    additional: "",
  };
}

export function StudentLostFoundReportPage() {
  const { me } = useAuth();
  const isStudent = me?.profile.account_type === "STUDENT";
  return (
    <RequireAuth>
      {isStudent ? (
        <StudentLostFoundReportContent />
      ) : (
        <main className="min-h-screen bg-school-bg p-8 text-muted">
          Halaman ini hanya tersedia untuk akun siswa.
        </main>
      )}
    </RequireAuth>
  );
}

function StudentLostFoundReportContent() {
  const { addToast } = useToast();
  const { me } = useAuth();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const [values, setValues] = useState<ReportValues>(initialValues);
  const [errors, setErrors] = useState<ReportErrors>({});
  const [notice, setNotice] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!values.photo) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(values.photo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [values.photo]);

  const update = <K extends keyof ReportValues>(
    key: K,
    value: ReportValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setNotice("");
  };

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (!file) return;
    if (!/image\/(jpeg|png)/i.test(file.type)) {
      setErrors((current) => ({
        ...current,
        photo: "Foto harus berformat JPG, JPEG, atau PNG.",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        photo: "Ukuran foto maksimal 5 MB.",
      }));
      return;
    }
    update("photo", file);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ReportErrors = {};
    if (!values.name.trim()) nextErrors.name = "Nama barang wajib diisi.";
    if (!values.category) nextErrors.category = "Kategori wajib dipilih.";
    if (!values.description.trim())
      nextErrors.description = "Deskripsi barang wajib diisi.";
    if (!values.location) nextErrors.location = "Lokasi wajib dipilih.";
    if (!values.date) nextErrors.date = "Tanggal kejadian wajib diisi.";
    if (values.date && values.date > todayValue)
      nextErrors.date = "Tanggal kejadian tidak boleh melewati hari ini.";
    if (errors.photo) nextErrors.photo = errors.photo;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice("");
      return;
    }
    if (!values.photo) {
      setErrors((current) => ({
        ...current,
        photo: "Foto barang wajib diunggah.",
      }));
      return;
    }
    setConfirmOpen(true);
  }
  async function confirmSubmit() {
    if (!values.photo) return;
    setBusy(true);
    try {
      await createLostFoundItem({
        type: values.type,
        name: values.name,
        category: values.category,
        description: values.description,
        location: values.location,
        date: values.date,
        additional: values.additional,
        photo: values.photo,
      });
      setNotice("Laporan berhasil dikirim dan menunggu verifikasi petugas.");
      setConfirmOpen(false);
      addToast({ variant: "success", title: "Laporan barang berhasil dibuat", description: "Laporan menunggu verifikasi petugas." });
      setValues(initialValues());
      setConfirmOpen(false);
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Laporan gagal dikirim.";
      setConfirmOpen(false);
      addToast({ variant: "error", title: "Laporan barang gagal dibuat", description: message, duration: null });
      setNotice(
        message,
      );
    } finally {
      setBusy(false);
    }
  }

  const dateLabel = useMemo(
    () =>
      values.date
        ? new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(`${values.date}T00:00:00`))
        : "",
    [values.date],
  );

  return (
    <StudentPortalLayout breadcrumb="Lost & Found / Laporkan Barang">
      <div className="grid min-w-0 gap-5">
        <Link
          to="/dashboard/lost-found"
          className="inline-flex w-fit items-center gap-2 text-[12px] font-medium text-primary transition hover:text-primary-dark focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ←
          </span>{" "}
          Kembali ke Lost &amp; Found
        </Link>
        <header>
          <h1 className="text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
            Laporkan Barang Hilang atau Ditemukan
          </h1>
          <p className="mt-2 text-[13px] text-[#607296]">
            Sampaikan informasi barang agar proses pencarian dan pengembalian
            dapat dilakukan dengan lebih mudah.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <form
            onSubmit={submit}
            noValidate
            className="min-w-0 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[16px] font-bold text-ink">
                FORM INFORMASI BARANG
              </h2>
              {isDemo && (
                <span className="text-[10px] font-medium uppercase text-primary">
                  Draf contoh
                </span>
              )}
            </div>
            <p className="mt-7 text-[12px] font-medium text-ink">
              Jenis laporan <span className="text-[#e33b3b]">*</span>
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ReportType
                value="LOST"
                selected={values.type === "LOST"}
                title="Barang Hilang"
                description="Saya ingin melaporkan barang yang hilang."
                onChange={(value) => update("type", value)}
              />
              <ReportType
                value="FOUND"
                selected={values.type === "FOUND"}
                title="Barang Ditemukan"
                description="Saya menemukan barang milik seseorang"
                onChange={(value) => update("type", value)}
              />
            </div>
            <p className="mt-5 text-[11px] text-[#607296]">
              * Wajib diisi · Seluruh isian di bawah adalah contoh
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="report-name" label="Nama Barang" error={errors.name}>
                <input
                  id="report-name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputClass}
                  placeholder="Contoh: Dompet cokelat"
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>
              <Field
                id="report-category"
                label="Kategori"
                error={errors.category}
              >
                <Select
                  id="report-category"
                  value={values.category}
                  onChange={(value) => update("category", value)}
                  options={categories}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field
                  id="report-description"
                  label="Deskripsi dan Ciri Khusus"
                  error={errors.description}
                >
                  <textarea
                    id="report-description"
                    value={values.description}
                    onChange={(event) =>
                      update("description", event.target.value)
                    }
                    className={`${inputClass} h-24 resize-y py-3`}
                    placeholder="Jelaskan warna, bentuk, merek, ukuran, atau ciri lain yang mudah dikenali."
                    aria-invalid={Boolean(errors.description)}
                  />
                  <small className="text-[10px] font-normal text-[#607296]">
                    Jelaskan warna, bentuk, merek, ukuran, atau ciri lain yang
                    mudah dikenali.
                  </small>
                </Field>
              </div>
              <Field
                id="report-location"
                label="Lokasi Kehilangan atau Penemuan"
                error={errors.location}
              >
                <Select
                  id="report-location"
                  value={values.location}
                  onChange={(value) => update("location", value)}
                  options={locations}
                  placeholder="Pilih lokasi di lingkungan SMKN 26 Jakarta"
                  icon="pin"
                />
              </Field>
              <Field
                id="report-date"
                label="Tanggal Kejadian"
                error={errors.date}
              >
                <div className="relative">
                  <input
                    id="report-date"
                    type="date"
                    max={todayValue}
                    value={values.date}
                    onChange={(event) => update("date", event.target.value)}
                    className={`${inputClass} pr-10 ${!values.date ? "text-[#9aaac2]" : "text-ink"}`}
                    placeholder="Pilih tanggal kejadian"
                    aria-invalid={Boolean(errors.date)}
                  />
                  <CalendarIcon />
                </div>
                {dateLabel && <small className="sr-only">{dateLabel}</small>}
              </Field>
              <div className="sm:col-span-2">
                <Field
                  id="report-photo"
                  label="Foto Barang (Opsional)"
                  error={errors.photo}
                >
                  <PhotoUpload
                    photo={values.photo}
                    previewUrl={previewUrl}
                    onChange={choosePhoto}
                    onRemove={() => update("photo", null)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field
                  id="report-additional"
                  label="Keterangan Tambahan (Opsional)"
                >
                  <textarea
                    id="report-additional"
                    value={values.additional}
                    onChange={(event) =>
                      update("additional", event.target.value)
                    }
                    className={`${inputClass} h-24 resize-y py-3`}
                    placeholder="Tambahkan informasi yang membantu proses pencarian, seperti waktu kejadian atau ciri khusus lainnya."
                  />
                </Field>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-[#e7edf5] pt-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-[11px] leading-5 text-[#607296]">
                Pastikan informasi yang kamu masukkan sudah benar sebelum
                mengirim laporan.
              </p>
              <div className="flex shrink-0 items-center justify-end gap-5">
                <Link
                  to="/dashboard/lost-found"
                  className="text-[13px] font-semibold text-primary transition hover:text-primary-dark"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  className="min-h-11 rounded-xl border border-transparent bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-[13px] font-semibold text-white transition-[transform,background-color,background-image,color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:bg-white hover:bg-none hover:text-primary hover:shadow-[0_8px_18px_rgba(0,124,233,.14)] focus-visible:border-primary focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Kirim Laporan
                </button>
              </div>
            </div>
            {notice && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-[#ffe5a5] bg-[#fffaf0] px-4 py-3 text-[12px] leading-5 text-[#896400]"
              >
                {notice}
              </p>
            )}
          </form>

          <aside className="grid gap-5">
            <InfoPanel title="Bantu Kami Mengenali Barangmu" icon="clipboard">
              <p>
                Deskripsikan barang secara jelas, mulai dari warna, bentuk,
                merek, hingga ciri khusus yang membedakannya dari barang lain.
              </p>
              <p>
                Cantumkan lokasi dan tanggal kejadian agar proses pencarian
                lebih terarah.
              </p>
              <p>
                Tambahkan foto jika ada. Hindari informasi pribadi yang terlihat
                jelas.
              </p>
            </InfoPanel>
            <InfoPanel title="Bagaimana Prosesnya?" tone="blue">
              <p>
                Setiap laporan akan ditinjau oleh petugas sekolah sebelum
                ditampilkan pada daftar Lost &amp; Found.
              </p>
              <p>
                Jika barang ditemukan atau pemiliknya telah teridentifikasi,
                petugas akan membantu proses konfirmasi dan pengembalian barang.
              </p>
            </InfoPanel>
          </aside>
        </div>
        <footer className="pb-1 text-[11px] text-muted">
          SMK Negeri 26 Jakarta · Portal Internal Siswa
        </footer>
      </div>
      <ActionModal
        open={confirmOpen}
        variant="save"
        title="Kirim laporan barang?"
        description={`Laporan ${values.name || "barang"} akan dikirim untuk verifikasi petugas sekolah.`}
        confirmLabel="Kirim Laporan"
        busy={busy}
        onClose={() => {
          if (!busy) setConfirmOpen(false);
        }}
        onConfirm={confirmSubmit}
      />
    </StudentPortalLayout>
  );
}

function ReportType({
  value,
  selected,
  title,
  description,
  onChange,
}: {
  value: LostFoundType;
  selected: boolean;
  title: string;
  description: string;
  onChange: (value: LostFoundType) => void;
}) {
  return (
    <label
      className={`flex min-h-[72px] cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition ${selected ? "border-primary bg-[#f2f9ff]" : "border-[#dce6f2] bg-white hover:border-[#a9d7fb]"}`}
    >
      <input
        type="radio"
        name="report-type"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="mt-1 size-4 accent-[#0092ff]"
      />
      <span>
        <strong className="block text-[12px] font-semibold text-ink">
          {title}
        </strong>
        <span className="mt-1 block text-[10px] leading-4 text-[#607296]">
          {description}
        </span>
      </span>
    </label>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="grid gap-2 text-[11px] font-medium text-ink">
      <span>
        {label}
        {label !== "Foto Barang (Opsional)" &&
          label !== "Keterangan Tambahan (Opsional)" && (
            <span className="text-[#e33b3b]"> *</span>
          )}
      </span>
      {children}
      {error && (
        <small role="alert" className="text-[10px] font-medium text-[#d62929]">
          {error}
        </small>
      )}
    </label>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  icon,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  icon?: "pin";
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} appearance-none pr-10 ${!value ? "text-[#9aaac2]" : ""}`}
      >
        <option value="">{placeholder || "Pilih kategori"}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {icon === "pin" ? <PinIcon /> : <ChevronIcon />}
    </div>
  );
}

function PhotoUpload({
  photo,
  previewUrl,
  onChange,
  onRemove,
}: {
  photo: File | null;
  previewUrl: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  if (photo && previewUrl)
    return (
      <div className="relative overflow-hidden rounded-xl border border-[#b9dafa] bg-[#f3faff] p-3">
        <img
          src={previewUrl}
          alt="Pratinjau barang"
          className="h-36 w-full rounded-lg object-cover"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-[11px] text-[#607296]">
            {photo.name}
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 text-[11px] font-semibold text-[#d62929] hover:underline"
          >
            Hapus foto
          </button>
        </div>
      </div>
    );
  return (
    <label
      htmlFor="report-photo"
      className="flex min-h-[142px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c5dced] bg-[#f5fbff] px-4 text-center transition hover:border-primary hover:bg-[#f0f9ff] focus-within:ring-2 focus-within:ring-[#d7edff]"
    >
      <UploadImageIcon />
      <strong className="mt-2 text-[12px] font-semibold text-primary">
        Unggah foto barang
      </strong>
      <span className="mt-1 text-[10px] text-[#607296]">
        JPG atau PNG · Maksimal 5 MB
      </span>
      <span className="mt-3 text-[10px] text-[#607296]">
        Hindari menampilkan informasi pribadi yang sensitif.
      </span>
      <input
        id="report-photo"
        type="file"
        accept="image/jpeg,image/png"
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}

function InfoPanel({
  title,
  icon,
  tone,
  children,
}: {
  title: string;
  icon?: "clipboard";
  tone?: "blue";
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border p-5 ${tone === "blue" ? "border-[#d7e9f8] bg-[#f7fcff]" : "border-[#dce8f5] bg-white"}`}
    >
      {icon === "clipboard" && <ClipboardIcon />}
      <h2 className="mt-4 text-[15px] font-bold leading-6 text-ink">{title}</h2>
      <div className="mt-3 grid gap-4 text-[12px] leading-5 text-[#607296]">
        {children}
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#52658a]"
    >
      <svg viewBox="0 0 20 20" fill="none" className="size-4">
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
function PinIcon() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#52658a]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="9" r="2.2" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  );
}
function CalendarIcon() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#52658a]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M7 2h2v3h6V2h2v3h3v17H4V5h3V2Zm11 9H6v8h12v-8Z" />
      </svg>
    </span>
  );
}
function UploadImageIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-7 text-primary"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="8" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m5 18 4.5-4.5 3 3 2.5-2.5L19 18M17 2v5m-2.5-2.5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-7 text-primary"
    >
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 4.5V3h6v1.5M8 12l2.3 2.3L16 8.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
