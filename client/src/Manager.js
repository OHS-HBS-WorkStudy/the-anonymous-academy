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
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<ThreadList />} />
        <Route path="/account/overview" element={<Account />} />
        <Route path="/account/activity" element={<Account />} />
        <Route path="/account/settings" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<SignUp />} />
        <Route path="/post" element={<NewThread />} />
        <Route path="/thread/:threadId" element={<Thread />} />
      </Routes>
    </>
  );
}
