import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useRoleStore from "../store/roleStore";
import PERMISSIONS from "../utils/permissions";
import useAuthStore from "../store/authStore";

function RoleManagement() {
  const {
    roles,
    addRole,
    updateRole,
    deleteRole,
    fetchRoles,
    updateRolePermissions,
  } = useRoleStore();

  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { hasPermission } = useAuthStore();

  const allPermissions = Object.values(PERMISSIONS).flatMap((perm) =>
    typeof perm === "object" ? Object.values(perm) : perm
  );

  useEffect(() => {
    if (roles.length === 0) fetchRoles();
  }, [fetchRoles, roles.length]);

  const handleSubmitRole = (roleData) => {
    if (selectedRole) {
      updateRole({
        ...selectedRole,
        ...roleData,
      });
    } else {
      addRole({
        id: Date.now().toString(),
        ...roleData,
      });
    }
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  const handlePermissionChange = (roleId, permission) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;

    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((perm) => perm !== permission)
      : [...role.permissions, permission];

    updateRolePermissions(roleId, updatedPermissions);

    const { user, setPermissions } = useAuthStore.getState();

    setPermissions(updatedPermissions);
  };

  const RoleModal = () => (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{selectedRole ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const permissions = allPermissions.filter(
              (perm) => formData.get(perm) === "on"
            );
            handleSubmitRole({
              name: formData.get("name"),
              permissions,
            });
          }}
        >
          <TextField
            name="name"
            label="Role Name"
            defaultValue={selectedRole?.name || ""}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            const formData = new FormData(document.querySelector("form"));
            handleSubmitRole(Object.fromEntries(formData));
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
          Role Management
        </Typography>
        {hasPermission(PERMISSIONS.ROLE.CREATE) && (
          <Button
            onClick={() => {
              setSelectedRole(null);
              setIsModalOpen(true);
            }}
            variant="contained"
            color="primary"
            startIcon={<Plus />}
          >
            Add Role
          </Button>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <Grid container spacing={1}>
                    {allPermissions.map((perm) => (
                      <Grid item key={perm}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={role.permissions.includes(perm)}
                              onChange={() =>
                                handlePermissionChange(role.id, perm)
                              }
                              disabled={!hasPermission(PERMISSIONS.ROLE.UPDATE)}
                            />
                          }
                          label={perm.replace("_", " ").toUpperCase()}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </TableCell>
                <TableCell align="right">
                  {hasPermission(PERMISSIONS.ROLE.UPDATE) && (
                    <Button
                      onClick={() => {
                        setSelectedRole(role);
                        setIsModalOpen(true);
                      }}
                      color="primary"
                      size="small"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                  )}
                  {hasPermission(PERMISSIONS.ROLE.DELETE) && (
                    <Button
                      onClick={() => deleteRole(role.id)}
                      color="secondary"
                      size="small"
                      startIcon={<Trash2 />}
                      sx={{ ml: 2 }}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && <RoleModal />}
    </div>
  );
}

export default RoleManagement;
