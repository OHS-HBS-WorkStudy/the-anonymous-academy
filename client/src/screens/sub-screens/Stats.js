// Library declaration imports
import { useState, useEffect} from 'react';

import useNavigation from '../../modules/useNavigation';

export default function Stats({loggedInUser, setLoggedInUser}) {

  const { goToLogin } = useNavigation();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark-mode") === "enabled";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("foundUser");
    setLoggedInUser(null);
    goToLogin();
};


    return (
        <>
        <div className="stats">
          <div className="account-content">
            <div className="account-info">
            <h2>Account Info</h2>
            <div className="user-details">
              <h4>Joined on {loggedInUser.created}</h4>
              <h4></h4>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
            </div>
            
            <div className="achievements">
            <h2>Achievements</h2>
            <div className="achievement-list">
            </div>
            </div>

            <div className="my-notifications">
            <h2>My Notifications</h2>
            </div>

            <div className="site-customizations">
            <h2>Theme Switch</h2>
            <div className="theme-switch">
              <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
              </label>
            </div>
            </div>

            <div className="my-user-stats">
            <h2>User Stats</h2>

              <div className="user-stats"><h3>Answers</h3><div className="number">0</div></div>
              <div className="user-stats"><h3>Questions</h3><div className="number">0</div></div>
              <div className="user-stats"><h3>User Score</h3><div className="number">0</div></div>
              <div className="user-stats"><h3>Viewed</h3><div className="number">0</div></div>

            </div>
          </div>
          </div>
        </>
    );
}