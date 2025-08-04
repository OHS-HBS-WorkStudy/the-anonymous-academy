import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { useMediaQuery, useTheme } from '@mui/material';
import useNavigation from './useNavigation';
import defaultTheme from '../../theme';

export default function useNavigatorLogic() {
    const nav = useNavigation();
    const location = useLocation();
    const theme = useTheme(defaultTheme);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isAuthPage = location.pathname === '/login' || location.pathname === '/join';
    const [hasHovered, setHasHovered] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (isMobile || isAuthPage) return false;
        return localStorage.getItem('isExpanded') === 'true';
    });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isMobile || isAuthPage) {
            setIsSidebarOpen(false);
            setIsHovered(false);
        } else {
            setIsSidebarOpen(localStorage.getItem('isExpanded') === 'true');
            setIsHovered(false);
        }
    }, [isMobile, isAuthPage]);

    const handleToggleSidebar = () => {
        const next = !isSidebarOpen;
        setIsSidebarOpen(next);
        if (!isMobile && !isAuthPage) {
            localStorage.setItem('isExpanded', String(next));
        }
    };

    const handleRightHoverEnter = () => {
        if (!isMobile && !isAuthPage && !isSidebarOpen) {
            setIsHovered(true);
            setHasHovered(true);
        }
    };

    const handleRightHoverLeave = () => {
        if (!isMobile && !isAuthPage) { 
            setIsHovered(false);
            setHasHovered(false);
        }
    };

    let recent = JSON.parse(sessionStorage.getItem("recentlyViewed")) || [];
    const isRecentActive = recent.some(t => location.pathname === `/thread/${t.id}`);

    const handleRVClick = thread => {
        recent = recent.filter(item => item.id !== thread.id);
        recent.unshift(thread);
        sessionStorage.setItem("recentlyViewed", JSON.stringify(recent));
        nav.goToThread(thread.id);
        if (isMobile || isAuthPage || isSidebarOpen) setIsSidebarOpen(false);
    };

    const SIDEBAR_OPEN_WIDTH = 240;
    const SIDEBAR_CLOSED_WIDTH = theme.spacing(7);

    const currentSidebarWidth = isAuthPage || isMobile
        ? 0
        : (isSidebarOpen || isHovered ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH);

    return {
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
        currentSidebarWidth,
        SIDEBAR_OPEN_WIDTH,
        SIDEBAR_CLOSED_WIDTH,
        hasHovered,
    };
}