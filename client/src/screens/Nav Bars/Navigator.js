import React from 'react';
import { useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Drawer } from '@mui/material';
import { motion } from 'framer-motion';

import defaultTheme from '../../theme';
import useNavigatorLogic from './useNavigatorLogic';
import AppBarContent from './AppBarContent';
import SidebarContent from './SidebarContent';

export default function Navigator() {
    const location = useLocation();

    const {
        isSidebarOpen,
        setIsSidebarOpen,
        isHovered,
        setIsHovered,
        isAuthPage,
        handleToggleSidebar,
        handleRightHoverEnter, 
        handleRightHoverLeave, 
        nav,
        isRecentActive,
        recent,
        handleRVClick,
        isMobile,
        theme,
        SIDEBAR_OPEN_WIDTH,
        SIDEBAR_CLOSED_WIDTH,
    } = useNavigatorLogic();

    const springTransition = {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
    };

    const sidebarVariants = {
        closed: { width: SIDEBAR_CLOSED_WIDTH, transition: springTransition },
        open: { width: SIDEBAR_OPEN_WIDTH, transition: springTransition },
    };

    const TOP_BAR_HEIGHT = theme.spacing(8);

    return (
        <React.Fragment>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <AppBarContent
                    isSidebarOpen={isSidebarOpen}
                    handleToggleSidebar={handleToggleSidebar}
                    nav={nav}
                    theme={theme}
                />
                <Box sx={{ mt: TOP_BAR_HEIGHT }}>
                    {isMobile || isAuthPage ? (
                        <Drawer
                            anchor="left"
                            open={isSidebarOpen}
                            onClose={handleToggleSidebar}
                            ModalProps={{
                                keepMounted: true,
                                disableScrollLock: true,
                            }}
                            PaperProps={{
                                sx: {
                                    width: 250,
                                    top: TOP_BAR_HEIGHT,
                                    boxShadow: theme.shadows[10],
                                    bgcolor: theme.palette.background.paper,
                                },
                            }}
                        >
                            <SidebarContent
                                nav={nav}
                                location={location}
                                isAuthPage={isAuthPage}
                                isSidebarOpen={isSidebarOpen}
                                isHovered={isHovered}
                                recent={recent}
                                isRecentActive={isRecentActive}
                                handleRVClick={handleRVClick}
                                setIsSidebarOpen={setIsSidebarOpen}
                                theme={theme}
                                isMobile={isMobile}
                            />
                        </Drawer>
                    ) : (
                        <motion.div
                            initial="closed"
                            animate={isSidebarOpen || isHovered ? "open" : "closed"}
                            variants={sidebarVariants}
                            onMouseEnter={handleRightHoverEnter}
                            onMouseLeave={handleRightHoverLeave}
                            style={{
                                position: 'fixed',
                                top: TOP_BAR_HEIGHT,
                                left: 0,
                                height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
                                zIndex: theme.zIndex.drawer,
                                backgroundColor: theme.palette.appbar.background,
                                display: 'flex',
                                flexDirection: 'column',
                                overflowX: 'hidden',
                                borderRight: `1px solid ${theme.palette.divider}`,
                                boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
                                pointerEvents: 'auto',
                            }}
                        >
                            <SidebarContent
                                nav={nav}
                                location={location}
                                isAuthPage={isAuthPage}
                                isSidebarOpen={isSidebarOpen}
                                isHovered={isHovered}
                                recent={recent}
                                isRecentActive={isRecentActive}
                                handleRVClick={handleRVClick}
                                setIsSidebarOpen={setIsSidebarOpen}
                                theme={theme}
                                isMobile={isMobile}
                            />
                        </motion.div>
                    )}
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}