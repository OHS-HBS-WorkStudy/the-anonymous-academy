// Library declaration imports
import { useState, useEffect } from 'react';

import useNavigation from '../../modules/useNavigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faClock, faUserTag, faCheckCircle, faExclamationTriangle, faInfoCircle, faBell} from '@fortawesome/free-solid-svg-icons';
import MyNotifications from './MyNotifications';

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
    return foundUser?.pref?.accentColor || "default";
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

  function formatDateBeforeAt(dateTimeString) {
    if (!dateTimeString) {
      return 'Not Available';
    }
    const atIndex = dateTimeString.indexOf(' at ');
    if (atIndex !== -1) {
      return dateTimeString.substring(0, atIndex);
    } else {
      return dateTimeString; 
    }
  }


  
  return (
    <>
      <div className="stats">
            <div className="user-info-column">
                <div className="account-info">
                <div className="user-details">
                    {loggedInUser?.profilePicture && (
                        <img src={loggedInUser.profilePicture} alt="Profile" className="profile-avatar" />
                    )}
                    {!loggedInUser?.profilePicture && (
                        <div className="profile-avatar-placeholder">
                            {loggedInUser?.first_name?.charAt(0)}{loggedInUser?.last_name?.charAt(0)}
                        </div>
                    )}
                    {loggedInUser?.username && <h4>@{loggedInUser.username}</h4>}
                    <p><FontAwesomeIcon icon={faClock} className="icon" /> Joined on {formatDateBeforeAt(loggedInUser?.created)}</p>
                    {loggedInUser?.email && <p><FontAwesomeIcon icon={faEnvelope} className="icon" /> {loggedInUser.email.substring(0, 3)}***@{loggedInUser.email.split('@')[1]}</p>}
                    {loggedInUser?.location && <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> {loggedInUser.location}</p>}
                    {loggedInUser?.account_type && (
                        <p><FontAwesomeIcon icon={faUserTag} className="icon" /> {loggedInUser.account_type}</p>
                    )}
                    {loggedInUser?.bio && <p className="user-bio">{loggedInUser.bio.substring(0, 100)}...</p>} 

                    <div className="user-actions">
                        <button className="edit-profile-button">Edit Profile</button>
                        <button className="change-password-button">Change Password</button>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                </div>

                {/* <div className="site-customizations">
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
                </div> */}

                <div className="my-user-stats">
                    <div className="user-stats">
                        <h3>Answers</h3>
                        <div className="number">0</div>
                    </div>
                    <div className="user-stats">
                        <h3>Questions</h3>
                        <div className="number">0</div>
                    </div>
                    <div className="user-stats">
                        <h3>Views</h3>
                        <div className="number">0</div>
                    </div>
                    <div className="user-stats">
                        <h3>User Score</h3>
                        <div className="number">0</div>
                    </div>
                </div>
            </div>

            <div className="other-content">
                <div className="my-notifications">
                  <MyNotifications />
            </div>

                <div className="achievements">
                    <h2>Achievements</h2>
                    <div className="achievement-list"></div>
                </div>
            </div>
        </div>
    </>
  );
}
