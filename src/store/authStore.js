import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      permissions: [],

      login: (userData, token, userPermissions) => {
        set({ user: userData, token, permissions: userPermissions });
      },

      logout: () => set({ user: null, token: null, permissions: [] }),

      isAuthenticated: () => !!get().token,

      hasPermission: (permission) => {
        const state = get();
        return state.permissions.includes(permission);
      },

      setPermissions: (userPermissions) => {
        set({ permissions: userPermissions });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
