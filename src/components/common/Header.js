import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("logout called");
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        {/* Left Side: User Profile */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <User size={24} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Admin User
          </Typography>
        </div>

        {/* Right Side: Logout Button */}
        <div style={{ marginLeft: "auto" }}>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{
              color: "red",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <LogOut size={20} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Logout
            </Typography>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
