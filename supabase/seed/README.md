# Synthetic demo provisioning

Demo users must be created with `backend/scripts/provision-demo-accounts.js` using a local administrator environment. Passwords are supplied through environment variables or an interactive secret manager and are never committed here. The script is idempotent by login identifier and uses the same Supabase Auth, profile, mapping, and role-assignment tables as real provisioned accounts.

The seed data is intentionally not automatically applied: real school onboarding and approved demo credentials remain an operational decision.
