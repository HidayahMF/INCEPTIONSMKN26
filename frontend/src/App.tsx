import { useEffect, useState, type FormEvent } from 'react';

type Profile = { user_id: string; school_identifier: string; display_name: string; account_type: string };
type Role = { id: string; role_code: string; scope_type: string; scope_id: string | null };
type Me = { profile: Profile; roles: Role[] };

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...options, credentials: 'include' });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message || 'Permintaan gagal.');
  return body.data as T;
}

function Login({ onLogin }: { onLogin: (me: Me) => void }) {
  const [identifier, setIdentifier] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); if (identifier.trim().length < 3 || password.length < 8) { setError('Masukkan identifier dan password yang valid.'); return; } setBusy(true); try { const data = await api<{ profile: Profile }>('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ identifier, password }) }); onLogin({ profile: data.profile, roles: [] }); } catch (e) { setError(e instanceof Error ? e.message : 'Login gagal.'); } finally { setBusy(false); } }
  return <main className="auth-page"><section className="auth-card"><a className="logo" href="/">SMK NEGERI 26 JAKARTA</a><h1>Masuk ke Portal</h1><p className="lead">Gunakan NIS, NIP, atau identifier demo yang diberikan administrator.</p><form onSubmit={submit}><label htmlFor="identifier">NIS / NIP / Identifier</label><input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} autoComplete="username" required /><label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /><button className="button" disabled={busy}>{busy ? 'Memeriksa...' : 'Masuk'}</button>{error && <p className="form-error" role="alert">{error}</p>}</form><a href="/" className="back-link">Kembali ke website publik</a></section></main>;
}

function Dashboard({ me, onLogout }: { me: Me; onLogout: () => void }) {
  const roles = me.roles.length ? me.roles.map((role) => role.role_code).join(', ') : 'Belum ada role tambahan';
  return <main className="portal-page"><header className="container portal-header"><div><a className="logo" href="/">SMK NEGERI 26 JAKARTA</a><p className="note">Portal internal</p></div><button className="button outline" onClick={onLogout}>Keluar</button></header><section className="container portal-content"><div className="pill">{me.profile.account_type}</div><h1>Selamat datang, {me.profile.display_name}</h1><p className="lead">Identifier sekolah: {me.profile.school_identifier}</p><article className="card"><h2>Akses Anda</h2><p>{roles}</p><p className="note">Permission selalu diverifikasi oleh backend berdasarkan assignment aktif dan cakupannya.</p></article></section></main>;
}

function PublicHome() {
  const [open, setOpen] = useState(false); const [question, setQuestion] = useState(''); const [answer, setAnswer] = useState(''); const [busy, setBusy] = useState(false);
  async function ask(event: FormEvent) { event.preventDefault(); if (!question.trim() || busy) return; setBusy(true); setAnswer(''); try { const data = await api<{ answer?: string }>('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question }) }); setAnswer(data.answer || 'Layanan belum tersedia.'); } catch (e) { setAnswer(e instanceof Error ? e.message : 'Backend belum terhubung.'); } finally { setBusy(false); } }
  return <div className="page"><header className="container nav"><a className="logo" href="#beranda">SMK NEGERI 26 JAKARTA</a><nav className="links" aria-label="Navigasi utama"><a href="#beranda">Beranda</a><a href="#tentang">Tentang Kami</a><a href="#jurusan">Jurusan</a><a href="#informasi">Portal Informasi</a></nav><a className="button" href="/login">Masuk Portal</a></header><main id="beranda"><section className="hero"><div className="container"><div className="pill">SMK Negeri 26 Jakarta</div><h1>Belajar. Bekerja. <span>Membangun!</span></h1><p className="lead">Selamat datang di rancangan awal website SMK Negeri 26 Jakarta. Informasi resmi dan aset visual akan ditambahkan setelah diverifikasi oleh tim sekolah.</p><div className="actions"><a className="button" href="#tentang">Jelajahi sekolah</a><button className="button outline" onClick={() => setOpen(true)}>Tanya AI tentang sekolah</button></div></div></section><section className="section container" id="tentang"><h2>Lebih dari Sekadar <span style={{ color: 'var(--primary-dark)' }}>Sekolah Vokasi</span></h2><p className="lead">Konten profil sekolah, jumlah warga sekolah, foto dan prestasi menunggu data resmi dari tim. Tidak ada statistik rekaan dalam versi awal ini.</p></section><section className="section subtle" id="jurusan"><div className="container"><h2>Jelajahi SMKN 26</h2><div className="cards">{['Profil Sekolah', 'Jurusan', 'Tur Sekolah'].map((title) => <article className="card" key={title}><h3>{title}</h3><p>Informasi resmi akan ditampilkan setelah diverifikasi oleh tim sekolah.</p></article>)}</div></div></section><section className="section container" id="informasi"><h2>Portal Informasi</h2><p className="lead">Tautan portal sekolah akan ditampilkan setelah alamat dan izin publikasinya dikonfirmasi.</p></section></main><footer><div className="container">SMK Negeri 26 Jakarta · Website tahap pengembangan untuk INCEPTION 2026</div></footer>{open && <aside className="chat" aria-label="Chatbot informasi sekolah"><div className="chat-title"><strong>Tanya AI</strong><button onClick={() => setOpen(false)} aria-label="Tutup">×</button></div><output>{answer || 'Tanyakan informasi resmi tentang sekolah.'}</output><form onSubmit={ask}><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Tulis pertanyaan" aria-label="Pertanyaan" /><button className="button" disabled={busy}>{busy ? '...' : 'Kirim'}</button></form></aside>}</div>;
}

export function App() {
  const path = window.location.pathname; const [me, setMe] = useState<Me | null>(null); const [loading, setLoading] = useState(path === '/dashboard');
  useEffect(() => { if (path === '/dashboard') api<Me>('/api/me').then(setMe).catch(() => { window.location.href = '/login'; }).finally(() => setLoading(false)); }, [path]);
  if (path === '/login') return <Login onLogin={() => { window.location.href = '/dashboard'; }} />;
  if (path === '/403') return <main className="auth-page"><section className="auth-card"><h1>Akses Ditolak</h1><p className="lead">Anda tidak memiliki permission untuk halaman ini.</p><a className="button" href="/dashboard">Kembali ke dashboard</a></section></main>;
  if (path === '/dashboard') { if (loading) return <main className="auth-page"><p>Memulihkan sesi...</p></main>; return me ? <Dashboard me={me} onLogout={async () => { await api('/api/auth/logout', { method: 'POST' }); window.location.href = '/'; }} /> : null; }
  return <PublicHome />;
}
