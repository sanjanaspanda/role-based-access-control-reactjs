import useAuthStore from "../store/authStore";
import useRoleStore from "../store/roleStore";
import useUserStore from "../store/userStore";

export const login = async (email, password) => {
  try {
    const { users } = useUserStore.getState();
    const { roles } = useRoleStore.getState();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }
    const role = roles.find((r) => r.name === user.role);

    const token = "mock_token_" + user.id;

    useAuthStore.getState().login(user, token, role.permissions);
    console.log(role.permissions);

    return user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = () => {
  useAuthStore.getState().logout();
};

export const isAuthenticated = () => {
  return useAuthStore.getState().isAuthenticated();
};
