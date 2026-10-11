# Struktur Aset — SMKN 26 Jakarta

Semua aset publik ada di folder ini. Strukturnya dipisah **per halaman** dan
**per aset bersama**, supaya tidak ada file yang sama di-import berkali-kali.

## Kategori folder

| Folder | Isi | Contoh |
|---|---|---|
| `shared/` | Aset global yang dipakai di banyak halaman | logo, ikon, footer, badge, chatbot, news, partners, struktur, dekorasi |
| `home/` | Aset khusus halaman beranda (`/`) | hero, shortcuts, programs, achievements, major-cards, blud, school |
| `pages/<halaman>/` | Aset khusus **satu** halaman | `pages/bkk`, `pages/organisasi`, `pages/prestasi`, `pages/lsp/kgs`, `pages/blud/kgstudio`, `pages/majors/kgs`, `pages/tour` |
| `majors/<KODE>Assets/` | Aset yang dipakai bersama oleh halaman jurusan + BLUD + LSP jurusan yang sama | `majors/KGSAssets`, `majors/TEKAssets`, `majors/TITLAssets`, `majors/TFLMAssets`, `majors/TKRAssets`, `majors/SIJAAssets` |

> **Kenapa ada `majors/KGSAssets`?**
> Contoh: hero & ikon KGS dipakai di halaman Jurusan KGS, KGStudio (BLUD), dan
> LSP KGS. Daripada tiap halaman punya salinan sendiri, semua memakai file yang
> sama di `majors/KGSAssets/`. Halaman lain tinggal menunjuk ke file itu.

## Peta halaman → folder

| Route | Folder aset |
|---|---|
| `/` | `home/` + `shared/` |
| `/profile` | `pages/profile` |
| `/majors/kgs` … `/majors/sija` | `pages/majors/<kode>` + `majors/<KODE>Assets` |
| `/blud/kgstudio`, `/blud/e-man`, `/blud/uptechno` | `pages/blud/<unit>` + `majors/<KODE>Assets` |
| `/blud/manufaktur26`, `/blud/garage26`, `/blud/gadiz-vokasi` | `pages/blud/<unit>` + `majors/<KODE>Assets` |
| `/programs/lsp` + `/programs/lsp/<kode>` | `pages/lsp` + `pages/lsp/<kode>` + `majors/<KODE>Assets` |
| `/programs/bkk`, `/programs/ekstrakurikuler`, `/programs/organisasi` | `pages/bkk`, `pages/ekstrakurikuler`, `pages/organisasi` |
| `/achievements`, `/news`, `/partners`, `/information` | `pages/prestasi`, `shared/news`, `shared/partners`, `pages/portal-informasi` |
| `/guru*`, `/struktur-unit-kerja` | `pages/guru` + `shared/struktur` |
| `/mars` | `pages/mars` + `shared/profile` |
| `/tour` | `pages/tour` |

## Menambah aset baru

1. Aset untuk **satu halaman** → taruh di `pages/<halaman>/`.
2. Aset untuk **beranda** → taruh di `home/<bagian>/`.
3. Aset dipakai di **beberapa halaman berbeda** → taruh di `shared/<tema>/`.
4. Aset jurusan yang dipakai **lebih dari satu halaman jurusan/BLUD/LSP** →
   taruh di `majors/<KODE>Assets/`.
5. Jangan menyalin file yang sudah ada — tunjuk ke file yang sama.

## Catatan kode

- Registry terpusat: `frontend/src/assets/figmaAssets.ts`.
- Sebagian halaman memakai helper berikut untuk memetakan nama file lama ke
  lokasi baru, sehingga panggilan `asset("nama.png")` tetap valid:

  ```ts
  const ASSET_OVERRIDES: Record<string, string> = {
    "Hero Section.png": "/assets/majors/KGSAssets/kgs-hero.png",
  };
  const asset = (name: string) => ASSET_OVERRIDES[name] ?? `/assets/pages/majors/kgs/${name}`;
  ```

  Jika menambah aset baru ke halaman tersebut, cukup simpan di folder default
  dan panggil lewat `asset("nama.png")`.
