import { create } from "zustand";
import PERMISSIONS from "../utils/permissions";

const getUsersFromLocalStorage = () => {
  const storedUsers = localStorage.getItem("users");
  console.log("Saved users: " + storedUsers);

  return storedUsers ? JSON.parse(storedUsers) : [];
};

const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const useUserStore = create((set) => ({
  users: getUsersFromLocalStorage(),

  addUser: (user) => {
    set((state) => {
      const updatedUsers = [...state.users, user];
      saveUsersToLocalStorage(updatedUsers);
      return { users: updatedUsers };
    });
  },

  updateUser: (updatedUser) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      saveUsersToLocalStorage(updatedUsers);
      return { users: updatedUsers };
    });
  },

  deleteUser: (userId) => {
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      saveUsersToLocalStorage(updatedUsers);
      return { users: updatedUsers };
    });
  },

  fetchUsers: async () => {
    const usersFromLocalStorage = getUsersFromLocalStorage();
    if (usersFromLocalStorage.length === 0) {
      const mockUsers = [
        {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123",
          role: "Admin",
        },
        {
          id: "2",
          name: "Editor User",
          email: "editor@example.com",
          password: "editor456",
          role: "Editor",
        },
        {
          id: "3",
          name: "Viewer User",
          email: "viewer@example.com",
          password: "viewer789",
          role: "Viewer",
        },
        {
          id: "4",
          name: "Viewer User",
          email: "viewer@example.com",
          password: "viewer789",
          role: "Viewer",
        },
      ];
      set({ users: mockUsers });
      saveUsersToLocalStorage(mockUsers);
    } else {
      set({ users: usersFromLocalStorage });
    }
  },
}));

export default useUserStore;
