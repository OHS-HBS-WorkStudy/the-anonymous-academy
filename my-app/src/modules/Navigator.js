import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigator() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/thread/:threadId">Thread</Link></li>
        </ul>
      </nav>
    </>
  );
}