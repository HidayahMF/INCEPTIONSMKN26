import type { Me, Role } from '../../types/auth';

export type RolePresentation = {
  roleCode: string;
  displayLabel: string;
  description: string;
  assetPath: string;
  portalContextLabel: string;
};

const assets = '/assets/pages/LoginPage/';

const presentations: Record<string, RolePresentation> = {
  STUDENT: { roleCode: 'STUDENT', displayLabel: 'Siswa', description: 'Akses portal siswa', assetPath: `${assets}rolesiswa.png`, portalContextLabel: 'Portal Siswa' },
  ADMIN: { roleCode: 'ADMIN', displayLabel: 'Administrator', description: 'Kelola platform sekolah', assetPath: `${assets}roleadmin.png`, portalContextLabel: 'Portal Administrator' },
  HEAD_OF_DEPARTMENT: { roleCode: 'HEAD_OF_DEPARTMENT', displayLabel: 'Kepala Jurusan', description: 'Kelola layanan jurusan', assetPath: `${assets}rolekajur.png`, portalContextLabel: 'Portal Kepala Jurusan' },
  SUBJECT_TEACHER: { roleCode: 'SUBJECT_TEACHER', displayLabel: 'Guru', description: 'Kelola pembelajaran dan penilaian', assetPath: `${assets}roleguru.png`, portalContextLabel: 'Portal Guru' },
  TEACHER: { roleCode: 'TEACHER', displayLabel: 'Guru', description: 'Akses portal guru', assetPath: `${assets}roleguru.png`, portalContextLabel: 'Portal Guru' },
  CLASS_REP: { roleCode: 'CLASS_REP', displayLabel: 'Ketua Kelas', description: 'Akses layanan perwakilan kelas', assetPath: `${assets}roleketuakelas.png`, portalContextLabel: 'Portal Ketua Kelas' },
  MPK_OFFICER: { roleCode: 'MPK_OFFICER', displayLabel: 'Petugas MPK', description: 'Tinjau aspirasi siswa', assetPath: `${assets}rolempk.png`, portalContextLabel: 'Portal MPK' },
  BKK_OFFICER: { roleCode: 'BKK_OFFICER', displayLabel: 'Petugas BKK', description: 'Kelola layanan BKK dan PKL', assetPath: `${assets}rolebkk.png`, portalContextLabel: 'Portal BKK' },
  BK_STAFF: { roleCode: 'BK_STAFF', displayLabel: 'Petugas BK', description: 'Kelola layanan bimbingan konseling', assetPath: `${assets}rolebk.png`, portalContextLabel: 'Portal BK' },
  CANTEEN_VENDOR: { roleCode: 'CANTEEN_VENDOR', displayLabel: 'Pedagang Kantin', description: 'Kelola pesanan kantin', assetPath: `${assets}rolekantin.png`, portalContextLabel: 'Portal Kantin' },
  COOP_OPERATOR: { roleCode: 'COOP_OPERATOR', displayLabel: 'Operator Koperasi', description: 'Kelola operasional koperasi', assetPath: `${assets}rolekoperasi.png`, portalContextLabel: 'Portal Koperasi' },
  ACHIEVEMENT_VERIFIER: { roleCode: 'ACHIEVEMENT_VERIFIER', displayLabel: 'Verifikator Prestasi', description: 'Verifikasi prestasi siswa', assetPath: `${assets}roleguru.png`, portalContextLabel: 'Portal Verifikator' },
  CONTENT_EDITOR: { roleCode: 'CONTENT_EDITOR', displayLabel: 'Pengelola Konten', description: 'Kelola konten publik', assetPath: `${assets}roleadmin.png`, portalContextLabel: 'Portal Konten' },
};

const demoRoleByIdentifier: Record<string, string> = {
  'DEMO-ADMIN': 'ADMIN',
  'DEMO-GURU': 'SUBJECT_TEACHER',
  'DEMO-BK': 'BK_STAFF',
  'DEMO-KAJUR': 'HEAD_OF_DEPARTMENT',
  'DEMO-KELAS': 'CLASS_REP',
  'DEMO-MPK': 'MPK_OFFICER',
  'DEMO-KANTIN': 'CANTEEN_VENDOR',
  'DEMO-KOPERASI': 'COOP_OPERATOR',
};

const rolePriority = ['ADMIN', 'HEAD_OF_DEPARTMENT', 'BKK_OFFICER', 'BK_STAFF', 'CANTEEN_VENDOR', 'COOP_OPERATOR', 'MPK_OFFICER', 'CLASS_REP', 'ACHIEVEMENT_VERIFIER', 'CONTENT_EDITOR', 'SUBJECT_TEACHER', 'TEACHER'];

export function getRolePresentation(roleCode: string | null | undefined = undefined, accountType = ''): RolePresentation {
  if (roleCode && presentations[roleCode]) return presentations[roleCode];
  if (accountType === 'STUDENT') return presentations.STUDENT;
  if (accountType === 'TEACHER') return presentations.TEACHER;
  return { roleCode: accountType || 'ACCOUNT', displayLabel: accountType || 'Akun Portal', description: 'Akses portal sekolah', assetPath: `${assets}roleadmin.png`, portalContextLabel: 'Portal Internal' };
}

export function getActiveRolePresentation(me: Me | null, contextRole?: string): RolePresentation {
  if (!me) return getRolePresentation();
  const activeRoles = (me.roles || []).filter(isValidAssignedRole);
  const assignedCodes = new Set(activeRoles.map((role) => role.role_code));
  const requestedContext = contextRole?.toUpperCase();
  if (requestedContext && assignedCodes.has(requestedContext) && presentations[requestedContext]) return presentations[requestedContext];
  const demoRole = demoRoleByIdentifier[me.profile.school_identifier?.toUpperCase() || ''];
  if (demoRole && assignedCodes.has(demoRole)) return presentations[demoRole];
  const selected = rolePriority.find((roleCode) => assignedCodes.has(roleCode));
  return getRolePresentation(selected, me.profile.account_type);
}

export function getRoleLabels(me: Me | null): string[] {
  if (!me) return [];
  const labels = me.roles.filter(isValidAssignedRole).map((role) => presentations[role.role_code]?.displayLabel).filter((label): label is string => Boolean(label));
  return [...new Set(labels)];
}

function isValidAssignedRole(role: Role) {
  if (role.is_active === false || !presentations[role.role_code]) return false;
  const now = Date.now();
  const validFrom = parseDate(role.valid_from);
  const validUntil = parseDate(role.valid_until);
  return (!role.valid_from || validFrom !== null && validFrom <= now) && (!role.valid_until || validUntil !== null && validUntil > now);
}

function parseDate(value: string | null | undefined) {
  if (!value) return null;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}
