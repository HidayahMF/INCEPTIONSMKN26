export const DEV_DEMO_ACCOUNTS = Object.freeze([
  { identifier: 'DEMO-ADMIN', label: 'Admin' },
  { identifier: 'DEMO-GURU', label: 'Guru' },
  { identifier: 'DEMO-BK', label: 'Guru BK' },
  { identifier: 'DEMO-KAJUR', label: 'Ketua Jurusan' },
  { identifier: 'DEMO-SISWA', label: 'Siswa' },
  { identifier: 'DEMO-KELAS', label: 'Ketua Kelas' },
  { identifier: 'DEMO-MPK', label: 'Pengurus MPK' },
  { identifier: 'DEMO-KANTIN', label: 'Pedagang Kantin' },
  { identifier: 'DEMO-KOPERASI', label: 'Koperasi' }
]);

const allowedIdentifiers = new Set(DEV_DEMO_ACCOUNTS.map((account) => account.identifier));

export function isDevQuickLoginEnabled() {
  return process.env.ENABLE_DEV_QUICK_LOGIN === 'true' && process.env.NODE_ENV !== 'production';
}

export function isAllowedDemoIdentifier(identifier) {
  return typeof identifier === 'string' && allowedIdentifiers.has(identifier.trim().toUpperCase());
}

export function getDemoPassword(identifier) {
  if (!isAllowedDemoIdentifier(identifier)) return undefined;
  const normalized = identifier.trim().toUpperCase();
  return process.env[`DEMO_PASSWORD_${normalized.replaceAll('-', '_')}`];
}

export function isLocalQuickLoginRequest(req) {
  const host = (req.hostname || '').toLowerCase();
  const origin = req.get('origin');
  const localHost = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  const localOrigin = origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173';
  const localSocket = req.socket?.remoteAddress === '127.0.0.1' || req.socket?.remoteAddress === '::1' || req.socket?.remoteAddress === '::ffff:127.0.0.1';
  return localHost && localSocket && localOrigin;
}
