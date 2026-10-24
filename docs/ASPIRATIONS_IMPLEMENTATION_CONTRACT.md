# Aspirasi Kelas Implementation Contract

## Workflow
- A school admin opens an `OPEN` aspiration cycle with a submission window.
- A `CLASS_REP` submits one class-labelled aspiration batch per cycle.
- Statuses: `SUBMITTED -> IN_REVIEW -> RESPONDED -> RESOLVED` or `REJECTED`.
- MPK may add a response/update and move the status through the valid workflow.
- The submitting class representative can read the status and public MPK response history.

## Privacy and authorization
- `CLASS_REP` must have an active `CLASS`-scoped assignment matching the submitted class and be a member of that class.
- `MPK_OFFICER` may review class-labelled submissions, but never receives the representative's user ID or name.
- Audit rows retain actor identity and are restricted to administrators through RLS.
- The API validates scope and status transitions; client-side role visibility is not trusted.
