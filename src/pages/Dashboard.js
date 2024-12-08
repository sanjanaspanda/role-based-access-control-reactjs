import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import { Users, Shield, Lock } from "lucide-react";
import useUserStore from "../store/userStore";
import useRoleStore from "../store/roleStore";

function Dashboard() {
  const { users, fetchUsers } = useUserStore();
  const { roles, fetchRoles } = useRoleStore();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const statsCards = [
    {
      title: "Total Users",
      value: users.length,
      icon: <Users size={40} color="#1E88E5" />,
      bgColor: "#E3F2FD",
    },
    {
      title: "Total Roles",
      value: roles.length,
      icon: <Shield size={40} color="#43A047" />,
      bgColor: "#E8F5E9",
    },
    {
      title: "Total Permissions",
      value: roles.reduce((total, role) => total + role.permissions.length, 0),
      icon: <Lock size={40} color="#8E24AA" />,
      bgColor: "#F3E5F5",
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} marginBottom={3}>
        {statsCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card sx={{ backgroundColor: card.bgColor }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: 2 }}>{card.icon}</Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="h4">{card.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Users */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Users
              </Typography>
              <List>
                {users.slice(0, 5).map((user) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <Avatar>{user.name[0]}</Avatar>
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                        sx={{ marginLeft: 2 }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Roles Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Roles Overview
              </Typography>
              <List>
                {roles.map((role) => (
                  <React.Fragment key={role.id}>
                    <ListItem>
                      <ListItemText
                        primary={role.name}
                        secondary={`${role.permissions.length} Permissions`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
