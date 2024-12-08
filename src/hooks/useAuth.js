import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { login, logout } from "../utils/auth";
import useRoleStore from "../store/roleStore";

function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuthStore();
  const { checkRolePermission, roles, fetchRoles } = useRoleStore();

  const handleLogin = async (email, password) => {
    try {
      setError(null);
      await login(email, password);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const checkPermission = (requiredPermission) => {
    console.log("User:", user);
    console.log("Required Permission:", requiredPermission);
    console.log("Roles:", roles);
    if (roles.length == 0) {
      fetchRoles();
    }
    if (!user || !user.role) return false;

    const hasPermission = checkRolePermission(user.role, requiredPermission);

    console.log("Has Permission:", hasPermission);
    return hasPermission;
  };

  return {
    user,
    token,
    error,
    login: handleLogin,
    logout: handleLogout,
    checkPermission,
  };
}

export default useAuth;
