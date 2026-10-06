---
title: Audit route website SMKN 26 Jakarta
category: audit
school: SMKN 26 Jakarta
source_type: deployed_website_and_repository
source_url: https://inceptionsmkn-26.vercel.app/
last_verified: 2026-10-06
temporal: dynamic
priority: 1
---

## Route yang diaudit dari aplikasi

- `/`: landing page, hero, shortcut, profil ringkas, keunggulan, mitra, jurusan, program, BLUD, prestasi, berita, dan CTA chatbot.
- `/profile`, `/organization`, `/struktur-unit-kerja`, `/mars`: profil, organisasi, dan identitas sekolah.
- `/majors` serta `/majors/kgs`, `/majors/tek`, `/majors/titl`, `/majors/tflm`, `/majors/tkr`, `/majors/sija`: jurusan.
- `/programs/lsp` dan `/programs/lsp/*`: LSP dan skema sertifikasi.
- `/programs/bkk`: BKK.
- `/programs/ekstrakurikuler`: ekstrakurikuler.
- `/programs/organisasi`, `/programs/organisasi/osis`, `/programs/organisasi/mpk`: organisasi siswa.
- `/blud` dan unit-unit `/blud/*`: BLUD/unit layanan.
- `/achievements`, `/news`, `/news/:slug`, `/partners`, `/partners/:slug`: prestasi, berita, dan mitra.
- `/tour`, `/tour/*`, `/information`, dan `/contact`: school tour, portal, dan kontak.

## Hasil audit

Deployment dapat diakses, tetapi konten React tidak seluruhnya tersedia sebagai HTML server-side pada fetch sederhana. Kartu visual atau copy UI tanpa source individual tidak dimasukkan sebagai fakta resmi. Route dipakai untuk cakupan audit; fakta sekolah diambil dari sumber sekolah/pemerintah yang dapat ditelusuri.
