import { useEffect, useState } from "react";
import { PortalLayout } from "../layouts/PortalLayout";
import { RequirePermission } from "../features/auth/RequireAuth";
import { api, getCachedApi } from "../lib/api";
import { ActionModal } from "../components/shared/ActionModal";
import { useToast } from "../components/shared/ToastProvider";

type Summary = {
  users: { active: number };
  activeRoles: number;
  verification: {
    portfolioPending: number;
    achievementPending: number;
    lostFoundOpen: number;
  };
  pkl: { activeVacancies: number };
  aspirations: {
    submitted: number;
    inReview: number;
    responded: number;
    resolved: number;
  };
  canteen: { todayOrders: number };
  knowledge: { draft: number; approved: number };
};
type User = {
  user_id: string;
  school_identifier: string;
  display_name: string;
  account_type: string;
  is_active: boolean;
  roles: {
    id: string;
    role_code: string;
    scope_type: string;
    scope_id?: string;
    is_active: boolean;
  }[];
};
type RoleAssignment = User["roles"][number];
type ScopeResource = {
  id: string;
  displayName: string;
  type?: string;
  isActive?: boolean;
  startsOn?: string;
  endsOn?: string;
};
type Audit = {
  id: string;
  actor_id?: string;
  action: string;
  module: string;
  entity_id?: string;
  metadata: Record<string, unknown>;
  created_at: string;
};
type Monitoring = Record<
  string,
  {
    id: string;
    status: string;
    title?: string;
    name?: string;
    order_number?: string;
    updated_at: string;
  }[]
>;
const metric = (label: string, value: number) => (
  <div className="rounded-2xl border border-[#e1e9f4] bg-white p-5">
    <p className="text-[11px] font-medium uppercase tracking-[.08em] text-muted">
      {label}
    </p>
    <strong className="mt-3 block text-[28px] font-bold tracking-[-.03em] text-ink">
      {value.toLocaleString("id-ID")}
    </strong>
  </div>
);
const roleOptions = [
  ["ADMIN", "Administrator"],
  ["CLASS_REP", "Perwakilan Kelas"],
  ["MPK_OFFICER", "Pengurus MPK"],
  ["BK_STAFF", "Staf BK"],
  ["SUBJECT_TEACHER", "Guru Mata Pelajaran"],
  ["ACHIEVEMENT_VERIFIER", "Verifikator Prestasi"],
  ["BKK_OFFICER", "Petugas BKK"],
  ["HEAD_OF_DEPARTMENT", "Kepala Program Keahlian"],
  ["CANTEEN_VENDOR", "Pedagang Kantin"],
  ["COOP_OPERATOR", "Pengelola Koperasi"],
  ["CONTENT_EDITOR", "Editor Konten"],
] as const;
const scopeOptions = [
  ["GLOBAL", "Seluruh sekolah"],
  ["CLASS", "Kelas"],
  ["MERCHANT", "Merchant"],
  ["MAJOR", "Program keahlian"],
  ["SUBJECT", "Mata pelajaran"],
  ["ACADEMIC_YEAR", "Tahun ajaran"],
] as const;
const globalOnlyRoles = new Set([
  "ADMIN",
  "MPK_OFFICER",
  "BK_STAFF",
  "CONTENT_EDITOR",
  "ACHIEVEMENT_VERIFIER",
  "BKK_OFFICER",
]);
export function AdminManagementPage() {
  return (
    <RequirePermission permission="admin:manage">
      <Content />
    </RequirePermission>
  );
}
function Content() {
  const { addToast } = useToast();
  const [summary, setSummary] = useState<Summary | null>(() => getCachedApi<Summary>("/api/admin/management/summary") || null);
  const [monitor, setMonitor] = useState<Monitoring | null>(() => getCachedApi<Monitoring>("/api/admin/management/monitoring") || null);
  const [users, setUsers] = useState<User[]>(() => getCachedApi<{ items: User[] }>("/api/admin/management/users?pageSize=50")?.items || []);
  const [audits, setAudits] = useState<Audit[]>(() => getCachedApi<{ items: Audit[] }>("/api/admin/management/audit?pageSize=20")?.items || []);
  const [tab, setTab] = useState<"overview" | "users" | "audit">("overview");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [roleUser, setRoleUser] = useState<User | null>(null);
  const [roleForm, setRoleForm] = useState({
    roleCode: "CLASS_REP",
    scopeType: "GLOBAL",
    scopeId: "",
  });
  const [scopeSearch, setScopeSearch] = useState("");
  const [scopeResources, setScopeResources] = useState<ScopeResource[]>([]);
  const [selectedScopeResource, setSelectedScopeResource] = useState<ScopeResource | null>(null);
  const [scopeLoading, setScopeLoading] = useState(false);
  const [scopeError, setScopeError] = useState("");
  const [pendingRole, setPendingRole] = useState<{
    action: "assign" | "status";
    user?: User;
    role?: RoleAssignment;
    active?: boolean;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      const [nextSummary, nextMonitor, nextUsers, nextAudit] =
        await Promise.all([
          api<Summary>("/api/admin/management/summary"),
          api<Monitoring>("/api/admin/management/monitoring"),
          api<{ items: User[] }>("/api/admin/management/users?pageSize=50"),
          api<{ items: Audit[] }>("/api/admin/management/audit?pageSize=20"),
        ]);
      setSummary(nextSummary);
      setMonitor(nextMonitor);
      setUsers(nextUsers.items);
      setAudits(nextAudit.items);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Management data gagal dimuat.",
      );
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function toggle(user: User) {
    setBusy(true);
    try {
      await api(`/api/admin/management/users/${user.user_id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ active: !user.is_active }),
      });
      setPendingUser(null);
      addToast({ variant: "success", title: "Status akun berhasil diperbarui", description: `${user.display_name} sekarang ${user.is_active ? "nonaktif" : "aktif"}.` });
      await load();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Status akun gagal diubah.";
      setPendingUser(null);
      addToast({ variant: "error", title: "Status akun gagal diubah", description: message, duration: null });
      setError(
        message,
      );
    } finally {
      setBusy(false);
      setPendingUser(null);
    }
  }
  function openRoleForm(user: User) {
    setRoleUser(user);
    setRoleForm({ roleCode: "CLASS_REP", scopeType: "CLASS", scopeId: "" });
    setScopeSearch("");
    setScopeResources([]);
    setSelectedScopeResource(null);
    setScopeError("");
    setError("");
  }
  useEffect(() => {
    if (!roleUser || roleForm.scopeType === "GLOBAL") {
      setScopeResources([]);
      setScopeLoading(false);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(() => {
      setScopeLoading(true);
      setScopeError("");
      void api<{ items: ScopeResource[] }>(
        `/api/admin/management/scope-resources?scopeType=${encodeURIComponent(roleForm.scopeType)}&search=${encodeURIComponent(scopeSearch)}&pageSize=20`,
      )
        .then((result) => {
          if (!cancelled) setScopeResources(result.items);
        })
        .catch((reason) => {
          if (!cancelled) {
            setScopeResources([]);
            setScopeError(
              reason instanceof Error ? reason.message : "Resource scope gagal dimuat.",
            );
          }
        })
        .finally(() => {
          if (!cancelled) setScopeLoading(false);
        });
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [roleUser, roleForm.scopeType, scopeSearch]);
  function requestAssignRole() {
    if (!roleUser) return;
    if (globalOnlyRoles.has(roleForm.roleCode) && roleForm.scopeType !== "GLOBAL") {
      setError("Role ini hanya dapat diberikan dengan scope seluruh sekolah.");
      return;
    }
    if (roleForm.scopeType !== "GLOBAL" && !roleForm.scopeId.trim()) {
      setError("Scope ID wajib diisi untuk role berscope.");
      return;
    }
    setPendingRole({ action: "assign", user: roleUser });
  }
  function requestRoleStatus(user: User, role: RoleAssignment) {
    setPendingRole({ action: "status", user, role, active: !role.is_active });
  }
  async function mutateRole() {
    if (!pendingRole?.user) return;
    setBusy(true);
    try {
      if (pendingRole.action === "assign") {
        await api(
          `/api/admin/management/users/${pendingRole.user.user_id}/roles`,
          {
            method: "POST",
            body: JSON.stringify({
              roleCode: roleForm.roleCode,
              scopeType: roleForm.scopeType,
              scopeId:
                roleForm.scopeType === "GLOBAL"
                  ? undefined
                  : roleForm.scopeId.trim(),
            }),
          },
        );
        setNotice(
          `Role ${roleForm.roleCode} berhasil ditambahkan atau dipulihkan.`,
        );
        setPendingRole(null);
        addToast({ variant: "success", title: "Role berhasil ditambahkan", description: `${roleForm.roleCode} telah diberikan kepada ${pendingRole.user.display_name}.` });
      } else if (pendingRole.role) {
        await api(`/api/admin/management/roles/${pendingRole.role.id}/status`, {
          method: "PATCH",
          body: JSON.stringify({ active: pendingRole.active }),
        });
        setNotice(
          `Role ${pendingRole.role.role_code} berhasil ${pendingRole.active ? "dipulihkan" : "dicabut"}.`,
        );
        setPendingRole(null);
        addToast({ variant: "success", title: pendingRole.active ? "Role berhasil dipulihkan" : "Role berhasil dicabut", description: pendingRole.role.role_code });
      }
      await load();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Perubahan role gagal disimpan.";
      setPendingRole(null);
      addToast({ variant: "error", title: "Perubahan role gagal disimpan", description: message, duration: null });
      setError(
        message,
      );
    } finally {
      setBusy(false);
      setPendingRole(null);
      setRoleUser(null);
    }
  }
  const filteredUsers = users.filter((user) =>
    `${user.display_name} ${user.school_identifier} ${user.account_type}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const availableScopes = globalOnlyRoles.has(roleForm.roleCode)
    ? scopeOptions.filter(([value]) => value === "GLOBAL")
    : scopeOptions;
  return (
    <PortalLayout breadcrumb="Admin Dashboard">
      <div className="grid min-w-0 gap-7">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
              Ruang kendali operasional
            </p>
            <h1 className="mt-2 text-[30px] font-bold tracking-[-.03em] text-ink">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">
              Pantau layanan sekolah, kelola akses terotorisasi, dan telusuri
              perubahan penting dari satu tempat.
            </p>
          </div>
          <span className="rounded-full bg-[#e8f5ff] px-3 py-1.5 text-[10px] font-semibold text-primary">
            Data Supabase
          </span>
        </header>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]"
          >
            {error}
          </p>
        )}
        {notice && (
          <p
            role="status"
            className="rounded-xl border border-[#bce8cf] bg-[#f2fbf5] p-4 text-[12px] text-[#147a42]"
          >
            {notice}
          </p>
        )}
        <nav className="flex min-w-0 overflow-x-auto rounded-2xl border border-[#e1e9f4] bg-white">
          <button
            onClick={() => setTab("overview")}
            className={`min-h-12 shrink-0 px-5 text-[12px] font-semibold ${tab === "overview" ? "border-b-2 border-primary text-primary" : "text-muted"}`}
          >
            Ringkasan
          </button>
          <button
            onClick={() => setTab("users")}
            className={`min-h-12 shrink-0 px-5 text-[12px] font-semibold ${tab === "users" ? "border-b-2 border-primary text-primary" : "text-muted"}`}
          >
            Pengguna &amp; Role
          </button>
          <button
            onClick={() => setTab("audit")}
            className={`min-h-12 shrink-0 px-5 text-[12px] font-semibold ${tab === "audit" ? "border-b-2 border-primary text-primary" : "text-muted"}`}
          >
            Audit Log
          </button>
        </nav>
        {tab === "overview" && summary && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metric("Pengguna aktif", summary.users.active)}
              {metric("Role aktif", summary.activeRoles)}
              {metric("Lowongan PKL aktif", summary.pkl.activeVacancies)}
              {metric("Pesanan kantin hari ini", summary.canteen.todayOrders)}
            </section>
            <section className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#e1e9f4] bg-white p-5">
                <h2 className="text-[17px] font-bold text-ink">
                  Menunggu tindak lanjut
                </h2>
                <div className="mt-4 grid gap-3 text-[12px]">
                  {[
                    ["Portfolio", summary.verification.portfolioPending],
                    ["Prestasi", summary.verification.achievementPending],
                    ["Lost & Found", summary.verification.lostFoundOpen],
                    ["Aspirasi baru", summary.aspirations.submitted],
                  ].map(([label, value]) => (
                    <div
                      className="flex items-center justify-between border-b border-[#edf1f6] pb-3 last:border-0"
                      key={label as string}
                    >
                      <span className="text-muted">{label}</span>
                      <strong className="text-primary">{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#e1e9f4] bg-white p-5">
                <h2 className="text-[17px] font-bold text-ink">
                  Status layanan
                </h2>
                <div className="mt-4 grid gap-3 text-[12px]">
                  {[
                    ["Aspirasi ditinjau", summary.aspirations.inReview],
                    ["Aspirasi ditanggapi", summary.aspirations.responded],
                    ["Aspirasi selesai", summary.aspirations.resolved],
                    ["Knowledge Base draft", summary.knowledge.draft],
                    ["Knowledge Base approved", summary.knowledge.approved],
                  ].map(([label, value]) => (
                    <div
                      className="flex items-center justify-between border-b border-[#edf1f6] pb-3 last:border-0"
                      key={label as string}
                    >
                      <span className="text-muted">{label}</span>
                      <strong className="text-ink">{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="rounded-2xl border border-[#e1e9f4] bg-white p-5">
              <h2 className="text-[17px] font-bold text-ink">
                Monitoring verifikasi
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {Object.entries(monitor || {}).map(([module, rows]) => (
                  <div className="rounded-xl bg-[#f7faff] p-4" key={module}>
                    <div className="flex justify-between gap-3">
                      <strong className="text-[12px] capitalize text-ink">
                        {module}
                      </strong>
                      <span className="text-[11px] font-semibold text-primary">
                        {rows.length} antrean
                      </span>
                    </div>
                    {rows.slice(0, 3).map((row) => (
                      <p
                        className="mt-2 truncate text-[11px] text-muted"
                        key={row.id}
                      >
                        {row.title || row.name || row.order_number || row.id} ·{" "}
                        {row.status}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
        {tab === "users" && (
          <section className="rounded-2xl border border-[#e1e9f4] bg-white p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-bold text-ink">
                  Pengguna &amp; Role
                </h2>
                <p className="mt-1 text-[12px] text-muted">
                  Perubahan akses dicatat ke audit log dan divalidasi
                  server-side.
                </p>
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama atau identifier"
                className="h-10 w-full rounded-xl border border-[#cbd9ea] px-3 text-[12px] sm:w-64"
              />
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-[12px]">
                <thead className="bg-[#f3f7fd] text-[10px] uppercase text-muted">
                  <tr>
                    <th className="px-3 py-3">Pengguna</th>
                    <th className="px-3 py-3">Tipe</th>
                    <th className="px-3 py-3">Role</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      className="border-b border-[#edf1f6]"
                      key={user.user_id}
                    >
                      <td className="px-3 py-3">
                        <strong className="block text-ink">
                          {user.display_name}
                        </strong>
                        <span className="text-[11px] text-muted">
                          {user.school_identifier}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {user.account_type}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {user.roles.map((role) => (
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-semibold ${role.is_active ? "bg-[#edf6ff] text-primary" : "bg-[#f1f5f9] text-[#8492aa] line-through"}`}
                              key={role.id}
                            >
                              {role.role_code} · {role.scope_type}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={
                            user.is_active ? "text-[#16834a]" : "text-[#b42332]"
                          }
                        >
                          {user.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => setPendingUser(user)}
                          className="rounded-lg border border-[#cbd9ea] px-3 py-2 text-[11px] font-semibold text-primary"
                        >
                          {user.is_active ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                        <button
                          type="button"
                          onClick={() => openRoleForm(user)}
                          className="ml-2 rounded-lg border border-[#b9dafa] px-3 py-2 text-[11px] font-semibold text-primary"
                        >
                          Kelola role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {roleUser && (
              <div className="mt-5 rounded-2xl border border-[#b9dafa] bg-[#f7fbff] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[15px] font-bold text-ink">
                      Kelola role: {roleUser.display_name}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted">
                      Role dan scope akan divalidasi server-side. Role nonaktif
                      dapat dipulihkan dari daftar di bawah.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRoleUser(null)}
                    className="text-[12px] font-semibold text-muted"
                  >
                    Tutup
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <label className="grid gap-1.5 text-[11px] font-semibold text-ink">
                    Role
                    <select
                      value={roleForm.roleCode}
                      onChange={(event) =>
                        setRoleForm({
                          ...roleForm,
                          roleCode: event.target.value,
                          scopeType: globalOnlyRoles.has(event.target.value)
                            ? "GLOBAL"
                            : roleForm.scopeType,
                          scopeId: globalOnlyRoles.has(event.target.value)
                            ? ""
                            : roleForm.scopeId,
                        })
                      }
                      className="h-10 rounded-xl border border-[#cbd9ea] bg-white px-3 text-[12px]"
                    >
                      {roleOptions.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-[11px] font-semibold text-ink">
                    Scope
                    <select
                      value={roleForm.scopeType}
                      onChange={(event) => {
                        setRoleForm({
                          ...roleForm,
                          scopeType: event.target.value,
                          scopeId: "",
                        });
                        setSelectedScopeResource(null);
                        setScopeSearch("");
                        setScopeError("");
                      }}
                      className="h-10 rounded-xl border border-[#cbd9ea] bg-white px-3 text-[12px]"
                    >
                      {availableScopes.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-[11px] font-semibold text-ink">
                    Resource scope
                    <input
                      value={
                        roleForm.scopeType === "GLOBAL"
                          ? "Tidak diperlukan"
                          : scopeSearch || scopeResources.find((item) => item.id === roleForm.scopeId)?.displayName || ""
                      }
                      disabled={roleForm.scopeType === "GLOBAL"}
                      onChange={(event) => {
                        setScopeSearch(event.target.value);
                        setRoleForm({ ...roleForm, scopeId: "" });
                      }}
                      placeholder={roleForm.scopeType === "GLOBAL" ? "Tidak diperlukan" : "Cari resource..."}
                      className="h-10 rounded-xl border border-[#cbd9ea] bg-white px-3 text-[12px] disabled:bg-[#eef2f7]"
                    />
                    {roleForm.scopeType !== "GLOBAL" && (
                      <div className="grid gap-1 rounded-xl border border-[#dce8f5] bg-white p-1 shadow-sm">
                        {scopeLoading && <p className="px-3 py-2 text-[11px] font-normal text-muted">Resource sedang dimuat...</p>}
                        {!scopeLoading && scopeError && <p className="px-3 py-2 text-[11px] font-normal text-[#b42332]">{scopeError}</p>}
                        {!scopeLoading && !scopeError && !scopeResources.length && <p className="px-3 py-2 text-[11px] font-normal text-muted">Resource tidak ditemukan.</p>}
                        {!scopeLoading && !scopeError && scopeResources.map((resource) => (
                          <button
                            type="button"
                            key={resource.id}
                            onClick={() => {
                              setRoleForm({ ...roleForm, scopeId: resource.id });
                              setSelectedScopeResource(resource);
                              setScopeSearch("");
                            }}
                            className={`rounded-lg px-3 py-2 text-left text-[11px] font-normal hover:bg-[#f3f7fd] ${resource.isActive === false ? "text-muted" : "text-ink"}`}
                          >
                            {resource.displayName}{resource.isActive === false ? " · Nonaktif" : ""}
                          </button>
                        ))}
                      </div>
                    )}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={requestAssignRole}
                  className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-white"
                >
                  Tambahkan / Pulihkan Role
                </button>
                <p className="mt-2 text-[11px] leading-5 text-muted">
                  Resource dimuat dari database melalui endpoint admin
                  read-only. Pilih resource yang tersedia; server tetap
                  memvalidasi scope saat assignment.
                </p>
                <div className="mt-5 grid gap-2">
                  <h4 className="text-[12px] font-bold text-ink">
                    Assignment role pengguna
                  </h4>
                  {roleUser.roles.length ? (
                    roleUser.roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e1e9f4] bg-white p-3"
                      >
                        <span
                          className={`text-[11px] font-semibold ${role.is_active ? "text-ink" : "text-muted"}`}
                        >
                          {role.role_code} · {role.scope_type}
                          {role.scope_id ? ` · ${role.scope_id}` : ""} ·{" "}
                          {role.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                        <button
                          type="button"
                          onClick={() => requestRoleStatus(roleUser, role)}
                          className={`rounded-lg border px-3 py-2 text-[11px] font-semibold ${role.is_active ? "border-[#f1c1c7] text-[#b42332]" : "border-[#b9dafa] text-primary"}`}
                        >
                          {role.is_active ? "Cabut role" : "Pulihkan role"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-muted">
                      Belum ada assignment role.
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
        {tab === "audit" && (
          <section className="rounded-2xl border border-[#e1e9f4] bg-white p-5">
            <h2 className="text-[18px] font-bold text-ink">Audit Log</h2>
            <p className="mt-1 text-[12px] text-muted">
              Event administratif append-only dari perubahan akun dan role.
            </p>
            <div className="mt-5 grid gap-3">
              {audits.map((event) => (
                <div
                  className="grid gap-1 border-b border-[#edf1f6] pb-3 text-[12px] sm:grid-cols-[160px_140px_minmax(0,1fr)]"
                  key={event.id}
                >
                  <span className="text-muted">
                    {new Date(event.created_at).toLocaleString("id-ID")}
                  </span>
                  <strong className="text-primary">{event.action}</strong>
                  <span className="text-ink">
                    {event.module} · {event.entity_id || "system"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <ActionModal
        open={Boolean(pendingUser)}
        variant="warning"
        title={pendingUser?.is_active ? "Nonaktifkan akun?" : "Aktifkan akun?"}
        description={
          pendingUser
            ? `${pendingUser.display_name} akan ${pendingUser.is_active ? "dinonaktifkan" : "diaktifkan"}. Perubahan akses akan dicatat ke audit log.`
            : ""
        }
        confirmLabel={pendingUser?.is_active ? "Nonaktifkan" : "Aktifkan"}
        busy={busy}
        onClose={() => {
          if (!busy) setPendingUser(null);
        }}
        onConfirm={() => (pendingUser ? toggle(pendingUser) : undefined)}
      />
      <ActionModal
        open={Boolean(pendingRole)}
        variant={pendingRole?.action === "assign" ? "save" : "warning"}
        title={
          pendingRole?.action === "assign"
            ? "Tambahkan role?"
            : pendingRole?.active
              ? "Pulihkan role?"
              : "Cabut role?"
        }
        description={
          pendingRole?.action === "assign"
             ? `${pendingRole.user?.display_name || "Pengguna"} akan menerima role ${roleForm.roleCode} dengan scope ${roleForm.scopeType}${selectedScopeResource ? ` · ${selectedScopeResource.displayName}` : ""}.`
            : `${pendingRole?.role?.role_code || "Role"} akan ${pendingRole?.active ? "dipulihkan" : "dinonaktifkan"} untuk ${pendingRole?.user?.display_name || "pengguna"}. Perubahan dicatat ke audit log.`
        }
        confirmLabel={
          pendingRole?.action === "assign"
            ? "Tambahkan Role"
            : pendingRole?.active
              ? "Pulihkan Role"
              : "Cabut Role"
        }
        busy={busy}
        onClose={() => {
          if (!busy) setPendingRole(null);
        }}
        onConfirm={mutateRole}
      />
    </PortalLayout>
  );
}
