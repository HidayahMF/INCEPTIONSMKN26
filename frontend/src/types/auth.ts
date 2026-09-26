export type Profile = {
  user_id: string;
  school_identifier: string;
  display_name: string;
  account_type: string;
};

export type Role = {
  id: string;
  role_code: string;
  scope_type: string;
  scope_id: string | null;
};

export type Me = { profile: Profile; roles: Role[] };
