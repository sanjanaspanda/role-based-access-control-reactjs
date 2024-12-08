import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Shield, Lock } from "lucide-react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Box,
} from "@mui/material";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: Users,
      path: "/users",
    },
    {
      name: "Roles",
      icon: Shield,
      path: "/roles",
    },
    {
      name: "Permissions",
      icon: Lock,
      path: "/permissions",
    },
  ];

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ padding: 2, borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6" component="h1" fontWeight="bold">
          RBAC Manager
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <ListItemIcon>
              <item.icon size={20} />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
