import React, { useState, useEffect } from 'react';

export default function Settings({ loggedInUser, postType }) {

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
    
    return (
        <div className="my-settings">
            <p>Settings</p>

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
        </div>
    );
}