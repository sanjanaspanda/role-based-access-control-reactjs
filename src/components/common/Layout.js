import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box, CssBaseline, Toolbar, AppBar } from "@mui/material";

function Layout() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Header */}
        <AppBar
          position="sticky"
          sx={{
            width: "100%",
            zIndex: 1201,
          }}
        >
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 3,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
