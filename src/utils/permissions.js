const PERMISSIONS = {
  USER: {
    CREATE: "create_user",
    READ: "read_user",
    UPDATE: "update_user",
    DELETE: "delete_user",
  },
  ROLE: {
    CREATE: "create_role",
    READ: "read_role",
    UPDATE: "update_role",
    DELETE: "delete_role",
  },
  SYSTEM: {
    DASHBOARD: "view_dashboard",
    SETTINGS: "manage_settings",
  },
};

export const hasPermission = (userPermissions, requiredPermission) => {
  return userPermissions.includes(requiredPermission);
};

export const filterAccessibleRoutes = (userPermissions) => {
  const accessibleRoutes = [];

  if (hasPermission(userPermissions, PERMISSIONS.SYSTEM.DASHBOARD)) {
    accessibleRoutes.push("/dashboard");
  }

  if (hasPermission(userPermissions, PERMISSIONS.USER.READ)) {
    accessibleRoutes.push("/users");
  }

  if (hasPermission(userPermissions, PERMISSIONS.ROLE.READ)) {
    accessibleRoutes.push("/roles");
  }

  return accessibleRoutes;
};

export default PERMISSIONS;
