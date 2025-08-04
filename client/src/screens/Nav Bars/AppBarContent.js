import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Button, useMediaQuery } from '@mui/material'; 
import { PersonAdd as PersonAddIcon, Login as LoginIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

export default function AppBarContent({ isSidebarOpen, handleToggleSidebar, nav, theme }) {
    return (
        <AppBar
            position="fixed"
            elevation={3}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
                bgcolor: theme.palette.glass.lavender,
                backdropFilter: 'blur(6px)',
                height: theme.spacing(8),
                boxShadow: theme.shadows[2],
            }}
        >
           <Toolbar
                disableGutters 
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pl: '9px',
                    pr: '20px',
                }}
            >
                <Box sx={{ ml: '0', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
                    <IconButton
                        aria-label={isSidebarOpen ? 'Close nav menu' : 'Open nav menu'}
                        onClick={handleToggleSidebar}
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography
                        variant="h5"
                        component="h1"
                        onClick={nav.goToHome}
                        sx={{
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: theme.palette.primary.main,
                            whiteSpace: 'nowrap',

                            [theme.breakpoints.down(470)]: {
                                display: 'none',
                            },
                        }}
                    >
                        Anonymous Academy
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        variant="text"
                        onClick={nav.goToLogin}
                        sx={{
                            color: nav.isActive('/login') ? theme.palette.primary.main : theme.palette.text.secondary,
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: theme.palette.action.hover,
                                color: theme.palette.primary.main,
                            },
                        }}
                        startIcon={<LoginIcon />}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Login
                        </Box>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={nav.goToSignUp}
                        sx={{
                            borderRadius: 2,
                            py: 0.8,
                            px: 2,
                            fontWeight: 700,
                            background: `linear-gradient(45deg, ${theme.palette.secondary.light} 30%, ${theme.palette.secondary.main} 90%)`,
                            boxShadow: `0 3px 10px ${theme.palette.secondary.light}40`,
                            '&:hover': {
                                background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.dark} 90%)`,
                                boxShadow: `0 5px 15px ${theme.palette.secondary.light}60`,
                            },
                        }}
                        startIcon={<PersonAddIcon />}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Sign Up
                        </Box>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}