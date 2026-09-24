import { getRoles } from '../modules/auth/auth.service.js';

const rolePermissions = {
  ADMIN: ['admin:manage'], CLASS_REP: ['aspirations:submit'], MPK_OFFICER: ['aspirations:review'], BK_STAFF: ['lost_found:manage'], SUBJECT_TEACHER: ['grades:manage'], ACHIEVEMENT_VERIFIER: ['achievements:verify'], BKK_OFFICER: ['pkl:manage'], HEAD_OF_DEPARTMENT: ['pkl:manage'], CANTEEN_VENDOR: ['merchant:manage'], COOP_OPERATOR: ['merchant:manage'], CONTENT_EDITOR: ['content:manage']
};

export function authorize(permission, scope = null) {
  return async (req, res, next) => {
    try {
      const roles = await getRoles(req.auth.userId);
      const allowed = roles.some((role) => rolePermissions[role.role_code]?.includes(permission) && (role.scope_type === 'GLOBAL' || role.scope_id === scope));
      if (!allowed) return res.status(403).json({ data: null, error: { message: 'Anda tidak memiliki izin untuk mengakses fitur ini.' } });
      req.auth.roles = roles;
      return next();
    } catch (error) { return next(error); }
  };
}

export { rolePermissions };
