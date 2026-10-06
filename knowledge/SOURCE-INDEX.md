---
title: Knowledge base source index
category: audit
school: SMKN 26 Jakarta
source_type: internal_index
source_url: https://inceptionsmkn-26.vercel.app/
last_verified: 2026-10-06
temporal: stable
priority: 1
---

# Source Index

| File | Topic | Source | Last Verified | Temporal |
| --- | --- | --- | --- | --- |
| `01-profil-sekolah/identitas.md` | Identitas, lokasi, kontak, statistik dasar | Direktorat SMK | 2026-10-06 | stable |
| `01-profil-sekolah/sejarah-visi-misi.md` | Sejarah dan motto | IASPEM26; website sekolah sebagai rujukan lanjutan | 2026-10-06 | stable |
| `02-jurusan/program-keahlian-dan-nomenklatur.md` | Program keahlian dan tingkat | Direktorat SMK | 2026-10-06 | semi-stable |
| `03-akademik/struktur-dan-statistik.md` | Siswa, rombel, guru, tenaga admin | Direktorat SMK | 2026-10-06 | dynamic |
| `03-akademik/pembelajaran-pkl-dudi.md` | PKL dan kerja sama DUDI | Direktorat SMK | 2026-10-06 | semi-stable |
| `04-kesiswaan/ekstrakurikuler-organisasi.md` | Ekstrakurikuler dan organisasi | Website sekolah | 2026-10-06 | semi-stable |
| `05-karier/bkk-dan-lowongan.md` | BKK dan lowongan | Website sekolah; perlu sumber lowongan individual | 2026-10-06 | dynamic |
| `06-lsp/lsp-bnsp.md` | Lisensi, skema, TUK, asesor | BNSP | 2026-10-06 | semi-stable |
| `07-fasilitas/sarana-prasarana.md` | Sarana dan peralatan | Direktorat SMK | 2026-10-06 | semi-stable |
| `08-layanan/sewa-ruang-dan-kontak.md` | Kontak dan sewa ruang | Website sekolah; Direktorat SMK | 2026-10-06 | dynamic |
| `09-ppdb/spmb.md` | SPMB | Dinas Pendidikan DKI Jakarta | 2026-10-06 | dynamic |
| `10-berita/status.md` | Berita dan prestasi | Website sekolah/deployment | 2026-10-06 | dynamic |
| `99-faq/faq-terverifikasi.md` | FAQ | Gabungan sumber terindeks | 2026-10-06 | mixed |
| `99-faq/qa-komprehensif-2026-10-06.md` | Q&A profil, sejarah, jurusan, TFLM, SIJA, akademik, LSP, ekskul, BKK, fasilitas, SPMB | Gabungan website sekolah, Direktorat SMK, BNSP, dataset tim | 2026-10-06 | mixed |
| `CHATBOT-POLICY.md` | Safety dan conflict resolution | Internal policy | 2026-10-06 | stable |
| `SOURCE-CONFLICTS.md` | Konflik statistik, jurusan, LSP, dan domain website | Internal audit | 2026-10-06 | mixed |

## Source notes

- `https://inceptionsmkn-26.vercel.app/` adalah deployment website baru; route UI yang belum memiliki sumber individual tidak diperlakukan sebagai fakta terverifikasi.
- `https://referensi.data.kemendikdasmen.go.id/snpmb/site/sekolah?npsn=20103787` menghasilkan HTTP 500 saat audit dan tidak dipakai sebagai source utama pada audit ini.
- URL `https://smkn26jkt.sch.id/` dapat dibaca sebagai website sekolah lama, tetapi repository menetapkan website lama sebagai provenance, bukan runtime dependency.
