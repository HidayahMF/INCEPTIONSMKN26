# BKK & PKL Implementation Contract

## Scope
- `pkl_vacancies`: lowongan aktif yang dikelola role `pkl:manage`.
- `pkl_applications`: satu lamaran per siswa per lowongan.
- `pkl_application_files`: private CV file, maximum 5 MB, PDF only.

## Status
- Vacancy: `DRAFT`, `PUBLISHED`, `CLOSED`.
- Application: `SUBMITTED`, `REVIEWING`, `ACCEPTED`, `REJECTED`.
- Only `PUBLISHED` vacancies are visible to students.
- Students may apply only with an owned `VERIFIED` portfolio.

## Security
- Server validates ownership, active role, status transition, file MIME/size, and duplicate application.
- CV bucket: `cv-private`, private, signed URLs are short-lived and reviewer/student authorized only.
- Production migration and bucket creation require explicit operator action.
