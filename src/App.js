import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import PermissionManagement from "./pages/PermissionManagement";
import PERMISSIONS from "./utils/permissions";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import Unauthorized from "./pages/Unauthorized";
import useUserStore from "./store/userStore";
import useRoleStore from "./store/roleStore";
function App() {
  const { fetchUsers } = useUserStore();
  const { fetchRoles } = useRoleStore();
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchUsers]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SYSTEM.DASHBOARD}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.USER.READ}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.ROLE.READ}>
              <RoleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/permissions"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SYSTEM.SETTINGS}>
              <PermissionManagement />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
