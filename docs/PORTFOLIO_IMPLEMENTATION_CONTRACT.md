# Portfolio & Achievement Implementation Contract

## Scope

Authenticated student CRUD and teacher/reviewer verification for portfolio projects and digital achievements. Public pages may only read records that are `VERIFIED` and explicitly `is_public`.

## Storage

- Private Supabase buckets: `portfolio-private` and `achievement-private`.
- Allowed images: `image/jpeg`, `image/png`, `image/webp`.
- Maximum upload size: 4 MiB per file for the Vercel-compatible internal portal. This leaves multipart request overhead below Vercel's approximately 4.5 MB Function request limit.
- Storage keys are generated server-side from record UUIDs.
- Frontend receives short-lived signed URLs only after ownership or reviewer authorization.

## States

- Student: `DRAFT -> SUBMITTED`.
- Reviewer: `SUBMITTED -> VERIFIED | REJECTED`.
- Student: `REJECTED -> DRAFT` when editing/resubmitting.
- Students cannot verify their own records.
- Reject requires a non-empty reviewer note.

## Permissions

- Student ownership is enforced by `user_id` in every read/write query.
- `portfolio:review` is granted to `ADMIN`, `ACHIEVEMENT_VERIFIER`, and `SUBJECT_TEACHER`.
- Reviewers can only review submitted records and can read their private evidence through the server.

## API

- `GET /api/student/portfolio`
- `POST /api/student/portfolio`
- `PUT /api/student/portfolio/:id`
- `DELETE /api/student/portfolio/:id`
- `POST /api/student/portfolio/:id/submit`
- `GET /api/student/achievements`
- `POST /api/student/achievements`
- `PUT /api/student/achievements/:id`
- `DELETE /api/student/achievements/:id`
- `POST /api/student/achievements/:id/submit`
- `GET /api/reviewer/portfolio`
- `POST /api/reviewer/portfolio/:id/review`
- `GET /api/reviewer/achievements`
- `POST /api/reviewer/achievements/:id/review`
- `POST /api/student/files/:kind` for owned draft uploads
- `GET /api/files/:kind/:id` for authorized signed download URLs

All responses use `{ data, error }`. Mutations validate fields, ownership, state transitions, and file type/size server-side.
