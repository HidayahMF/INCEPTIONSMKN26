# Management Layer Implementation Contract

## API
- `GET /api/admin/management/summary`: real operational counts.
- `GET /api/admin/management/monitoring`: status queues without private payloads.
- `GET /api/admin/management/users`: bounded search/filter/pagination.
- `PATCH /api/admin/management/users/:id/status`: activate/deactivate user.
- `POST /api/admin/management/users/:id/roles`: assign validated role/scope.
- `PATCH /api/admin/management/roles/:id/status`: revoke/restore assignment.
- `GET /api/admin/management/audit`: admin-only paginated audit events.

## Security
- Every endpoint requires `admin:manage` server-side.
- Roles and scope IDs are validated against existing tables and role policy.
- The final active `ADMIN` assignment cannot be revoked or disabled.
- Audit metadata is allowlisted JSON and never accepts credentials, tokens, files, or arbitrary secrets.
- Monitoring is read-only; action routes remain in existing reviewer modules.
