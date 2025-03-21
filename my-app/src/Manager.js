import React from 'react';
import { Route, Routes} from 'react-router-dom';

import Home from './screens/Home.js';
import Account from './screens/Account.js';
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import Thread from './screens/Thread.js';
import Navigator from './modules/Navigator.js';

export default function Manager() {
  return (
    <>
    <Navigator />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route path="/thread/:threadId" element={<Thread />} />
    </Routes>
    </>
  );
}
