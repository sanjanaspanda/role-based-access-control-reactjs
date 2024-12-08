import { create } from "zustand";
import PERMISSIONS from "../utils/permissions";

const getRolesFromLocalStorage = () => {
  const storedRoles = localStorage.getItem("roles");
  return storedRoles ? JSON.parse(storedRoles) : [];
};

const saveRolesToLocalStorage = (roles) => {
  localStorage.setItem("roles", JSON.stringify(roles));
};

const useRoleStore = create((set) => ({
  roles: getRolesFromLocalStorage(),

  addRole: (role) => {
    set((state) => {
      const updatedRoles = [...state.roles, role];
      saveRolesToLocalStorage(updatedRoles);
      return { roles: updatedRoles };
    });
  },

  updateRole: (updatedRole) => {
    set((state) => {
      const updatedRoles = state.roles.map((role) =>
        role.id === updatedRole.id ? updatedRole : role
      );
      saveRolesToLocalStorage(updatedRoles);
      return { roles: updatedRoles };
    });
  },

  deleteRole: (roleId) => {
    set((state) => {
      const updatedRoles = state.roles.filter((role) => role.id !== roleId);
      saveRolesToLocalStorage(updatedRoles);
      return { roles: updatedRoles };
    });
  },

  updateRolePermissions: (roleId, updatedPermissions) => {
    set((state) => {
      const updatedRoles = state.roles.map((role) =>
        role.id === roleId ? { ...role, permissions: updatedPermissions } : role
      );
      saveRolesToLocalStorage(updatedRoles);
      return { roles: updatedRoles };
    });
  },

  fetchRoles: async () => {
    const rolesFromLocalStorage = getRolesFromLocalStorage();
    if (rolesFromLocalStorage.length === 0) {
      const mockRoles = [
        {
          id: "1",
          name: "Admin",
          permissions: [
            PERMISSIONS.ROLE.CREATE,
            PERMISSIONS.ROLE.UPDATE,
            PERMISSIONS.ROLE.DELETE,
            PERMISSIONS.ROLE.READ,
            PERMISSIONS.SYSTEM.DASHBOARD,
            PERMISSIONS.SYSTEM.SETTINGS,
            PERMISSIONS.USER.CREATE,
            PERMISSIONS.USER.UPDATE,
            PERMISSIONS.USER.DELETE,
            PERMISSIONS.USER.READ,
          ],
        },
        {
          id: "2",
          name: "Editor",
          permissions: ["read", "update"],
        },
        {
          id: "3",
          name: "Viewer",
          permissions: ["read"],
        },
      ];
      set({ roles: mockRoles });
      saveRolesToLocalStorage(mockRoles);
    } else {
      set({ roles: rolesFromLocalStorage });
    }
  },

  checkRolePermission: (roleName, requiredPermission) => {
    const role = getRolesFromLocalStorage().find(
      (role) => role.name === roleName
    );
    if (!role) return false;
    return role.permissions.includes(requiredPermission);
  },
}));

export default useRoleStore;
