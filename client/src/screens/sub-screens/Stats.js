// Library declaration imports
import { useState, useEffect } from 'react';

import useNavigation from '../../modules/useNavigation';

export default function Stats({ loggedInUser, setLoggedInUser }) {
  const { goToLogin } = useNavigation();

  const [darkMode, setDarkMode] = useState(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
    return foundUser && foundUser.pref && foundUser.pref.darkMode !== undefined
      ? foundUser.pref.darkMode
      : false;
  });

  const [accentColor, setAccentColor] = useState(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
    return foundUser && foundUser.pref && foundUser.pref.accentColor
      ? foundUser.pref.accentColor
      : "default";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.setAttribute("data-accent-color", accentColor);

    const foundUser = JSON.parse(sessionStorage.getItem("foundUser")) || { pref: {} };

    if (foundUser && foundUser.pref) {
      foundUser.pref.darkMode = darkMode;
      foundUser.pref.accentColor = accentColor;
      sessionStorage.setItem("foundUser", JSON.stringify(foundUser));
    }
  }, [darkMode, accentColor]);

  

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleAccentColorChange = (event) => {
    setAccentColor(event.target.value);
  };

  const handleLogout = () => {
    document.body.classList.remove("dark");
    document.body.removeAttribute("data-accent-color");
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
              <h4>Joined on {loggedInUser?.created}</h4>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="achievements">
            <h2>Achievements</h2>
            <div className="achievement-list"></div>
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
            <div className="accent-color-options">
              {["default", "blue", "green", "red", "brown"].map((color) => (
                <div
                  key={color}
                  className={`color-card ${color === accentColor ? "selected" : ""}`}
                  style={{
                    border: color === accentColor ? "2px solid black" : "1px solid gray",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    backgroundColor: color === "default" ? "purple" : color,
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => setAccentColor(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="my-user-stats">
            <h2>User Stats</h2>
            <div className="user-stats">
              <h3>Answers</h3>
              <div className="number">0</div>
            </div>
            <div className="user-stats">
              <h3>Questions</h3>
              <div className="number">0</div>
            </div>
            <div className="user-stats">
              <h3>User Score</h3>
              <div className="number">0</div>
            </div>
            <div className="user-stats">
              <h3>Viewed</h3>
              <div className="number">0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
