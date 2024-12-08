import React, { useEffect, useState } from "react";
import useRoleStore from "../store/roleStore";
import {
  Button,
  Checkbox,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
} from "@mui/material";

function PermissionManagement() {
  const { roles, updateRolePermissions } = useRoleStore();
  const [selectedRole, setSelectedRole] = useState(null);

  const allPermissions = [
    {
      category: "User Management",
      permissions: ["create_user", "read_user", "update_user", "delete_user"],
    },
    {
      category: "Role Management",
      permissions: ["create_role", "read_role", "update_role", "delete_role"],
    },
    { category: "System", permissions: ["view_dashboard", "manage_settings"] },
  ];

  const handlePermissionChange = (permission) => {
    if (selectedRole) {
      const updatedPermissions = selectedRole.permissions.includes(permission)
        ? selectedRole.permissions.filter((perm) => perm !== permission)
        : [...selectedRole.permissions, permission];

      updateRolePermissions(selectedRole.id, updatedPermissions);

      setSelectedRole((prevRole) => ({
        ...prevRole,
        permissions: updatedPermissions,
      }));
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="container">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Permission Management
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side: Role List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Roles
              </Typography>
              <div>
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    variant="outlined"
                    fullWidth
                    onClick={() => setSelectedRole(role)}
                    sx={{
                      mb: 1,
                      textAlign: "left",
                      backgroundColor:
                        selectedRole?.id === role.id ? "#1976d2" : "inherit",
                      color: selectedRole?.id === role.id ? "white" : "inherit",
                      "&:hover": {
                        backgroundColor:
                          selectedRole?.id === role.id ? "#1565c0" : "#f0f0f0",
                      },
                    }}
                  >
                    {role.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Permissions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Permissions for{" "}
                {selectedRole ? selectedRole.name : "Select a Role"}
              </Typography>

              {selectedRole ? (
                allPermissions.map((category) => (
                  <div key={category.category}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ borderBottom: 1, pb: 1 }}
                    >
                      {category.category}
                    </Typography>

                    <Grid container spacing={2}>
                      {category.permissions.map((permission) => (
                        <Grid item xs={12} sm={6} key={permission}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedRole.permissions.includes(
                                  permission
                                )}
                                onChange={() =>
                                  handlePermissionChange(permission)
                                }
                                name={permission}
                              />
                            }
                            label={permission.replace("_", " ").toUpperCase()}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                ))
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ textAlign: "center", mt: 4 }}
                >
                  Select a role to manage its permissions.
                </Typography>
              )}

              {selectedRole && (
                <div style={{ marginTop: "24px", textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log("Save permissions for", selectedRole.name);
                    }}
                  >
                    Save Permissions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default PermissionManagement;
