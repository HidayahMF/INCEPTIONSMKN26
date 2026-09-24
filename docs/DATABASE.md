# DATABASE — PostgreSQL planning map

Status: schema proposal, not applied migration. Implement via reviewed SQL migrations and access tests. Use UUID primary keys, `created_at`/`updated_at` where appropriate, foreign keys, constraints and indexes.

## Core
- `profiles(user_id auth UUID, school_identifier, identifier_type, display_name, account_type, active)` — NIS/NIP unique *within applicable identifier type*, private.
- `academic_years`, `classes`, `class_memberships(student_id, class_id, year_id)`, `role_assignments(user_id, role, scope_type, scope_id, starts_at, ends_at)`.
- `public_pages`, `majors`, `facilities`, `panorama_scenes`, `panorama_hotspots`, `news`, `public_achievements`, `partners` — published state and source/rights metadata.
- `knowledge_documents(source_type, source_ref, original_storage_key, visibility, status, version)`, `knowledge_chunks(document_id, content, embedding?, source_page?, source_url?)` — PUBLIC approved subset only for guest chatbot.

## Internal features
- Academics: `subjects`, `learning_topics`, `assessments`, `student_topic_scores`, `learning_resources`, `practice_attempts`.
- Portfolio/PKL: `student_portfolios`, `achievement_submissions`, `achievement_reviews`, `cv_files`, `pkl_vacancies`, `pkl_applications` (unique vacancy/student), `application_exports` (audit).
- Lost and found: `found_items`, `item_custody_events`, `item_claims`, `item_handover_events`.
- Canteen/co-op: `merchants`, `products`, `inventory`, `pickup_slots`, `orders`, `order_items`, `payment_attempts`, `payment_events` (unique provider event/transaction), `reviews`.
- MPK: `aspiration_cycles`, `class_aspirations`, `aspiration_updates`, `aspiration_audit` (restricted); unique class/cycle active submission.

## Boundaries
No raw secrets or plaintext passwords in PostgreSQL profile tables. Sensitive file keys private; generate short-lived signed URLs after authorization. Server-side checks required even when RLS is also enabled; test both access patterns. Never use service-role credentials in frontend code. Use `ON DELETE` rules and retention periods deliberately, especially for minors' data. Do not seed actual school data until verified.

## Official content import
`public_pages` and knowledge tables are populated by the idempotent importer from `data/smkn26-official-content.json`. Imported records retain source URL and retrieval metadata and remain `DRAFT` until reviewed. Migration `202609240002_public_content_knowledge.sql` does not seed fictional school data.

Source URLs in `public_pages.metadata` and `knowledge_sources.source_url` are audit provenance only. They are not runtime retrieval dependencies. Public retrieval uses `knowledge_chunks.content` and public citations use new-application routes.
