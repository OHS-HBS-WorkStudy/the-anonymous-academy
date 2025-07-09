import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import Home from './screens/Home/Home.js';
import Account from './screens/Account/Account.js';
import Login from './screens/Login/Login.js';
import SignUp from './screens/Sign Up/SignUp.js';
import Thread from './screens/Thread Viewer/Thread Viewer.js';
import ThreadList from './screens/Thread List/ThreadList.js';
import NewThread from './screens/Thread Creation/NewThread.js';
import Leaderboard from './screens/Leaderboard/Leaderboard.js';
import Achievements from './screens/Achievement/Achievements.js';

import Navigator from './screens/Nav Bars/Navigator.js';
import useNavigatorLogic from './screens/Nav Bars/useNavigatorLogic.js';

export default function Manager() {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
    const location = useLocation();

    const isAuth = location.pathname === '/login' || location.pathname === '/join';

    const {
        isSidebarOpen,
        setIsSidebarOpen,
        isHovered,
        setIsHovered,
        isAuthPage,
        isMobile,
        theme,
        currentSidebarWidth
    } = useNavigatorLogic();

    const TOP_BAR_HEIGHT = theme.spacing(8);

    useEffect(() => {
        document.title = "Anonymous Academy";
    }, []);

    useEffect(() => {
        if (foundUser?.pref?.darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [foundUser]);

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Navigator />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: isAuth ? '0' : '30px',
                    mt: TOP_BAR_HEIGHT,
                    minHeight: `calc(100vh - ${TOP_BAR_HEIGHT})`,
                    width: `calc(100% - ${currentSidebarWidth}px)`,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
                }}
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<ThreadList />} />
                    <Route path="/post" element={<NewThread />} />
                    <Route path="/thread/:threadId" element={<Thread />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/account/overview" element={<Account />} />
                    <Route path="/account/activity" element={<Account />} />
                    <Route path="/account/settings" element={<Account />} />
                </Routes>
            </Box>
        </Box>
    );
}
