import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#1e40af',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 0,
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700,
                mr: 4,
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              🏰 NIRD
            </Typography>

            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button
                color="inherit"
                component={Link}
                to="/village"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  backgroundColor: isActive('/village')
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                Village
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/solutions"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  backgroundColor: isActive('/solutions')
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                Solutions
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/forum"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  backgroundColor: isActive('/forum')
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                Forum
              </Button>
            </Box>

            {/* Auth Section */}
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/diagnostic"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Diagnostic
                </Button>

                {/* User Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {user?.name}
                  </Typography>
                  <IconButton
                    size="large"
                    onClick={handleMenu}
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1,
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate('/profile');
                      handleClose();
                    }}
                  >
                    Mon Profil
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate('/diagnostic');
                      handleClose();
                    }}
                  >
                    Mes Diagnostics
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    Déconnexion
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Connexion
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{
                    backgroundColor: '#10b981',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#059669',
                    },
                  }}
                >
                  S'inscrire
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;