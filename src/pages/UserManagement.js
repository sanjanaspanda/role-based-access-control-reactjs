import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Plus, Edit, Trash2 } from "lucide-react";
import useUserStore from "../store/userStore";
import useRoleStore from "../store/roleStore";
import useAuthStore from "../store/authStore";

function UserManagement() {
  const { users, addUser, updateUser, deleteUser, fetchUsers } = useUserStore();
  const { roles, fetchRoles } = useRoleStore();
  const { user, permissions } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (!user) {
      alert("You do not have permission to access user management.");
      window.location.href = "/";
    }
    console.log(user);
  }, [user]);

  const hasPermission = (permission) => permissions?.includes(permission);

  const handleAddEditUser = (userData) => {
    if (selectedUser) {
      if (!hasPermission("update_user")) {
        alert("You do not have permission to edit users.");
        return;
      }
      updateUser({ ...selectedUser, ...userData });
    } else {
      if (!hasPermission("create_user")) {
        alert("You do not have permission to add users.");
        return;
      }
      addUser({
        id: Date.now().toString(),
        ...userData,
      });
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const UserModal = () => (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleAddEditUser(Object.fromEntries(formData));
          }}
        >
          <TextField
            name="name"
            label="Full Name"
            defaultValue={selectedUser?.name || ""}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            defaultValue={selectedUser?.email || ""}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            defaultValue={selectedUser?.password || ""}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              defaultValue={selectedUser?.role || ""}
              label="Role"
              required
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => {
            const formData = new FormData(document.querySelector("form"));
            handleAddEditUser(Object.fromEntries(formData));
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          User Management
        </Typography>

        {hasPermission("create_user") && (
          <Button
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            variant="contained"
            color="primary"
            startIcon={<Plus />}
          >
            Add User
          </Button>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              {hasPermission("update_user") || hasPermission("delete_user") ? (
                <TableCell align="right">Actions</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                {hasPermission("update_user") ||
                hasPermission("delete_user") ? (
                  <TableCell align="right">
                    {hasPermission("update_user") && (
                      <Button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        color="primary"
                        size="small"
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    )}
                    {hasPermission("delete_user") && (
                      <Button
                        onClick={() => deleteUser(user.id)}
                        color="secondary"
                        size="small"
                        startIcon={<Trash2 />}
                        sx={{ ml: 2 }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && <UserModal />}
    </div>
  );
}

export default UserManagement;
