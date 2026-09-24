import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeIdentifier } from '../src/modules/auth/auth.service.js';
import { rolePermissions } from '../src/middleware/authorize.js';

test('normalizes school identifiers without exposing credentials', () => {
  assert.equal(normalizeIdentifier('  demo-siswa '), 'DEMO-SISWA');
  assert.equal(normalizeIdentifier(null), '');
});

test('role permissions are additive and distinct', () => {
  assert.deepEqual(rolePermissions.BK_STAFF, ['lost_found:manage']);
  assert.notDeepEqual(rolePermissions.SUBJECT_TEACHER, rolePermissions.BK_STAFF);
});
