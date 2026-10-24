# Lost & Found Implementation Contract

## Workflow
- Report: `PENDING -> VERIFIED -> CLAIMED`.
- Claim: `SUBMITTED -> APPROVED` or `REJECTED`.
- Only verified reports are publicly listed to authenticated students.
- A student can edit/delete only their own `PENDING` report.
- BK staff verifies reports, reviews claims, and records handover.

## Data
- `lost_found_items`: report metadata and owner.
- `lost_found_claims`: ownership claims, one active claim per student/item.
- `lost_found_custody_events`: immutable status/custody audit trail.
- `lost_found_handovers`: approved claim handover record.
- `lost_found_files`: private photo metadata.

## Security
- No reporter/claimant personal identity is returned to student list/detail APIs.
- Photos use private bucket `lost-found-private`, signed for 300 seconds after authorization.
- Images: `image/jpeg`, `image/png`, `image/webp`, maximum 5 MB.
- Server validates ownership, role, status transitions, MIME, size, and input limits.
