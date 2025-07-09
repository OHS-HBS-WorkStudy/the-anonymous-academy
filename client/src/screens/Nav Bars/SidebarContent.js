import React from 'react';
import { Box, List, Divider, Typography, IconButton, ListItemButton, ListItemText } from '@mui/material';
import {
    Home as HomeIcon,
    ListAlt as ListAltIcon,
    Create as CreateIcon,
    Settings as SettingsIcon,
    History as HistoryIcon,
} from '@mui/icons-material';

import NavItem from './NavItem';

export default function SidebarContent({
    nav,
    location,
    isAuthPage,
    isSidebarOpen,
    isHovered,
    recent,
    isRecentActive,
    handleRVClick,
    setIsSidebarOpen,
    theme,
    isMobile
}) {
    const expanded = isAuthPage ? isSidebarOpen : (isHovered || isSidebarOpen);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.background.paper,
                py: 1.5,
            }}
        >
            <List>
                <NavItem
                    icon={HomeIcon}
                    label="Home"
                    activePath="/home"
                    onClick={nav.goToHome}
                    isActive={nav.isActive}
                    expanded={expanded}
                    isMobile={isMobile}
                    isAuthPage={isAuthPage}
                    setIsSidebarOpen={setIsSidebarOpen}
                    theme={theme}
                />
                <NavItem
                    icon={ListAltIcon}
                    label="Threads"
                    activePath="/"
                    onClick={nav.goToThreadList}
                    isActive={(path) => location.pathname === path}
                    expanded={expanded}
                    isMobile={isMobile}
                    isAuthPage={isAuthPage}
                    setIsSidebarOpen={setIsSidebarOpen}
                    theme={theme}
                />
                <NavItem
                    icon={CreateIcon}
                    label="New Thread"
                    activePath="/post"
                    onClick={nav.goToNewThread}
                    isActive={nav.isActive}
                    expanded={expanded}
                    isMobile={isMobile}
                    isAuthPage={isAuthPage}
                    setIsSidebarOpen={setIsSidebarOpen}
                    theme={theme}
                />
                <NavItem
                    icon={SettingsIcon}
                    label="Account"
                    activePath="/account/overview"
                    onClick={nav.goToAcct}
                    isActive={p =>
                        nav.isActive('/account/overview') ||
                        nav.isActive('/account/activity') ||
                        nav.isActive('/account/settings')
                    }
                    expanded={expanded}
                    isMobile={isMobile}
                    isAuthPage={isAuthPage}
                    setIsSidebarOpen={setIsSidebarOpen}
                    theme={theme}
                />
            </List>

            {/* Recently Viewed Section - Moved here, directly after the main navigation list */}
            <Divider sx={{ my: 1, mx: 2 }} />

            <Box
                sx={{
                    pb: 2, 
                    pt: 1, 
                    px: expanded ? 2 : 0,
                    textAlign: expanded ? 'left' : 'center',
                }}
            >
                {!expanded ? (
                    <IconButton
                        aria-label="Recently Viewed Threads"
                        sx={{
                            color: isRecentActive ? theme.palette.primary.main : theme.palette.text.secondary,
                            p: 1.5,
                        }}
                    >
                       <HistoryIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                ) : (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.text.primary,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <HistoryIcon sx={{ color: isRecentActive ? theme.palette.primary.main : theme.palette.text.secondary }} />
                            Recently Viewed
                        </Typography>
                        <List dense disablePadding>
                            {recent.length ? recent.map(thread => (
                                <ListItemButton
                                    key={thread.id}
                                    onClick={() => handleRVClick(thread)}
                                    selected={nav.isActive(`/thread/${thread.id}`)}
                                    sx={{
                                        borderRadius: theme.shape.borderRadius,
                                        py: 0.5,
                                        pl: 1,
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.primary.light,
                                            color: theme.palette.primary.contrastText,
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: nav.isActive(`/thread/${thread.id}`)
                                                        ? theme.palette.primary.contrastText
                                                        : theme.palette.text.primary,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',  
                                                    textOverflow: 'ellipsis', 
                                                }}
                                            >
                                                {thread.title}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            )) : (
                                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                                    No recently viewed
                                </Typography>
                            )}
                        </List>
                    </Box>
                )}
            </Box>
        </Box>
    );
}