import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

interface User {
  name: string; // Ensure this property exists in the user object
}

interface NavBarProps {
  user?: User | null; // User object or null
  onLogout?: () => void; // Callback for logout
  title: string; // Title of the navbar
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogout, title }) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget); // Opens the menu
  };

  const handleMenuClose = () => {
    setMenuAnchor(null); // Closes the menu
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="menu"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            {["Home", "Profile", "Send & Receive", "Statements", "Balance", "Add Card", "Admin"].map(
              (route) => (
                <MenuItem onClick={handleMenuClose} key={route}>
                  <Link
                    to={`/${route.toLowerCase().replace(/ & /g, "-").replace(" ", "-")}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {route}
                  </Link>
                </MenuItem>
              )
            )}
          </Menu>
          <Typography variant="h6">{title}</Typography>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>
            {user ? `Hello, ${user.name}` : "Hello, Guest"}
          </Typography>
          {onLogout && (
            <IconButton onClick={onLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;