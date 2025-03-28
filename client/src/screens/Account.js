// Library declaration imports
import { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';

// Other modules components imports
import Activity from "./sub-screens/Activity";
import Stats from "./sub-screens/Stats";
import useNavigation from '../modules/useNavigation';

export default function Account() {
    const {goToacctStats, goToacctActivity, goToLogin, goToSignUp} = useNavigation();
    const [activeSection, setActiveSection] = useState('stats');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const foundUserGet = sessionStorage.getItem("foundUser");
        if (foundUserGet) {
            setLoggedInUser(JSON.parse(foundUserGet));
        }

        const path = location.pathname;
        if (path.endsWith('/activity')) {
            setActiveSection('activity');
        } else {
            setActiveSection('stats');
        }
    }, [location.pathname]);

    const handleSectionClick = (section) => {
        setActiveSection(section);
        if (section === 'stats') {
            goToacctStats();
        } else {
            goToacctActivity();
        }
    };


    if (loggedInUser) {
        return (
            <div className="offset">
                <div className="account-page">
                    <div className="account-top">
                        <h1 className="userName">{loggedInUser.first_name} {loggedInUser.last_name}</h1>
                        <div className="account-pages">
                            <h3
                                className={activeSection === 'stats' ? 'active' : ''}
                                onClick={() => handleSectionClick('stats')}
                            >
                                Stats
                            </h3>
                            <h3
                                className={activeSection === 'activity' ? 'active' : ''}
                                onClick={() => handleSectionClick('activity')}
                            >
                                Activity
                            </h3>
                        </div>
                    </div>

                    {activeSection === 'stats' && (
                        <Stats loggedInUser={loggedInUser} />
                    )}
                    {activeSection === 'activity' && (
                        <Activity loggedInUser={loggedInUser} />
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="overlay">
                    <div className="box-holder">
                        <div className="overlay-box">
                            <div className="box-content">
                                <div className="box-top">
                                    <h2>Please sign up or log in access the account page!</h2>
                                </div>
                                <div className="box-bottom">
                                    <p className="text">
                                        You need to be logged in to access this page.
                                    </p>
                                    <p className="text">
                                        Please
                                        <span className="underline" onClick={goToSignUp}>Sign up</span>
                                        or
                                        <span className="underline" onClick={goToLogin}>Log in</span>
                                        to continue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}