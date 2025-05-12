import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './screens/Home.js';
import Account from './screens/Account.js';
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import Thread from './screens/Thread.js';
import ThreadList from './screens/ThreadList.js';
import NewThread from './screens/NewThread.js';
import Navigator from './modules/Navigator.js';
import Leaderboard from './screens/Leaderboard.js';

export default function Manager() {
  const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

  useEffect(() => {
    document.title = "Anonymous Academy";
  }, []);

  if (foundUser && foundUser.pref && foundUser.pref.darkMode === true) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <>
      <Navigator />
      
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Join */}
        <Route path="/join" element={<SignUp />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Thread List */}
        <Route path="/" element={<ThreadList />} />

        {/* Post */}
        <Route path="/post" element={<NewThread />} />

        {/* Thread */}
        <Route path="/thread/:threadId" element={<Thread />} />

        {/* Leaderboard */}
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* Account */}
        <Route path="/account/overview" element={<Account />} />
        <Route path="/account/activity" element={<Account />} />
        <Route path="/account/settings" element={<Account />} />
      </Routes>
    </>
  );
}
