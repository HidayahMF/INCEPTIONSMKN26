# RBAC — Draft permission model

Status: proposed, requires school approval before handling real student data.

## Roles are additive assignments, not mutually exclusive account types
Base identity: STUDENT / TEACHER / STAFF, plus independent scoped assignments: CLASS_REP (class_id, academic_year, valid_from/to), MPK_OFFICER, BK_STAFF, SUBJECT_TEACHER (subject/class), ACHIEVEMENT_VERIFIER, BKK_OFFICER, HEAD_OF_DEPARTMENT (department_id), CANTEEN_VENDOR (vendor_id), COOP_OPERATOR, CONTENT_EDITOR, ADMIN. Do not assume every teacher is BK/BKK or every class rep is an MPK officer.

## Authorization invariants
- Public: published school pages, public school knowledge and panorama only.
- Student: view own grades, edit own portfolio, submit own achievements and PKL applications, view own orders; no other student's records.
- Teacher: grade edits only for assigned subject/class; approve achievements only if granted verifier capability; never approve own untrusted submissions blindly.
- BK: read/write item custody and claims within its remit; distinctive proof of ownership remains private.
- MPK: receive class-labelled aspiration, not representative names; restricted audit metadata only for designated admin.
- Class representative: submit for assigned class and active collection cycle only; server determines class from active assignment, not request body.
- Vendor/co-op: only own catalog, order and reporting; no cross-merchant records.
- Admin: explicitly audited administrative access; not automatic authorization to expose private records publicly.

## Data hygiene
Demo with synthetic student profiles and synthetic grades unless school permissions and secure data handling are confirmed. Do not use real NIS/NIP, real student grades, phone numbers, CVs or certificates in public GitHub or demo screenshots without authorization. Password reset and account creation procedures remain OPEN DECISIONS.

## Implemented permission map
The backend currently maps additive assignments to these protected capabilities: `ADMIN` -> `admin:manage`; `CONTENT_EDITOR` -> `content:manage`; `SUBJECT_TEACHER` -> `grades:manage`; `ACHIEVEMENT_VERIFIER` -> `achievements:verify`; `BK_STAFF` -> `lost_found:manage`; `BKK_OFFICER` and `HEAD_OF_DEPARTMENT` -> `pkl:manage`; `CLASS_REP` -> `aspirations:submit`; `MPK_OFFICER` -> `aspirations:review`; `CANTEEN_VENDOR` and `COOP_OPERATOR` -> `merchant:manage`. An assignment is effective only when active, within `valid_from`/`valid_until`, and either global or matching the requested scope. Account type alone never grants these capabilities.
