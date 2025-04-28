import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faListAlt, faCog, faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';

import Activity from "./sub-screens/Activity";
import Stats from "./sub-screens/Stats";
import Settings from './sub-screens/Settings'
import DataList from "./sub-screens/DataList";
import useNavigation from '../modules/useNavigation';

const DropdownItem = ({ children, onClick }) => (
    <li onClick={onClick} className="dropdown-item">{children}</li>
);

const Dropdown = ({ isOpen, onClose, items, label, activeItem }) => {
    return (
        <div className="dropdown-wrapper">
            <div className="dropdown-label" onClick={onClose}>
                {activeItem || label} <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {items.map((item) => (
                        <DropdownItem key={item.value} onClick={() => onClose(item.value)}>
                            {item.label}
                        </DropdownItem>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function Account() {
    const { goToAcct, goToacctSettings, goToacctActivity, goToLogin, goToSignUp } = useNavigation();
    const [activeSection, setActiveSection] = useState('overview');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
    const [activePostType, setActivePostType] = useState('posts'); 

    useEffect(() => {
        const foundUserGet = sessionStorage.getItem("foundUser");
        if (foundUserGet) {
            try {
                const parsedUser = JSON.parse(foundUserGet);
                if (parsedUser) {
                    setLoggedInUser(parsedUser);
                } else {
                    setLoggedInUser(null);
                }
            } catch (error) {
                console.error("Error parsing foundUser:", error);
                setLoggedInUser(null);
            }
        } else {
            setLoggedInUser(null);
        }

        const path = location.pathname;
        if (path.endsWith('/activity')) {
            setActiveSection('activity');
        } else if (path.endsWith('/stats')) {
            setActiveSection('overview'); 
        } else if (path.startsWith('/posts')) {
            setActiveSection('posts');
        } else if (path.endsWith('/settings')) {
            setActiveSection('settings');
        } else {
            setActiveSection('overview');
        }
    }, [location.pathname]);

    const handleSectionClick = (section) => {
        setActiveSection(section);
        if (section === 'overview') {
            navigate('/account/overview'); 
        } else if (section === 'activity') {
            navigate('/account/activity');
        } else if (section === 'settings') {
            navigate('/account/settings'); 
        }
    };

    const handlePostsDropdownToggle = () => {
        setIsPostsDropdownOpen(!isPostsDropdownOpen);
    };

    const handlePostsDropdownSelect = (postType) => {
        setActivePostType(postType);
        setIsPostsDropdownOpen(false);
        navigate(`/account/posts/${postType.toLowerCase().replace(' ', '-')}`);
    };

    const postsDropdownItems = [
        { label: 'My Posts', value: 'posts' },
        { label: 'My Answers', value: 'answers' },
        { label: 'My Questions', value: 'questions' },
    ];

    if (!loggedInUser || loggedInUser === null) {
        return (
            <div className="overlay">
                <div className="box-holder">
                    <div className="overlay-box">
                        <div className="box-content">
                            <div className="box-top">
                                <h2>Please sign up or log in to access the account page!</h2>
                            </div>
                            <div className="box-bottom">
                                <p className="text">
                                    You need to be logged in to access this page.
                                </p>
                                <p className="text">
                                    Please {' '}
                                    <span className="underline" onClick={goToSignUp}>Sign up</span>
                                    {' '}
                                    or
                                    {' '}
                                    <span className="underline" onClick={goToLogin}>Log in</span>
                                    {' '} to continue.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="offset">
                <div className="account-page-modern">
                    <div className="account-header">
                        <div className="user-profile">
                            <FontAwesomeIcon icon={faUser} className="user-icon" />
                            <h1 className="user-name">{loggedInUser?.first_name} {loggedInUser?.last_name}</h1>
                        </div>
                        <nav className="account-navigation">
                            <button
                                className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('overview')}
                            >
                                <FontAwesomeIcon icon={faChartBar} className="nav-icon" />
                                Overview
                            </button>
                            {/* <div className="nav-item posts-dropdown" onClick={handlePostsDropdownToggle}>
                                <FontAwesomeIcon icon={faListAlt} className="nav-icon" />
                                Posts <FontAwesomeIcon icon={faCaretDown} />
                                {isPostsDropdownOpen && (
                                    <ul className="dropdown-menu">
                                        {postsDropdownItems.map((item) => (
                                            <li
                                                key={item.value}
                                                onClick={() => handlePostsDropdownSelect(item.value)}
                                                className={activePostType === item.value ? 'active' : ''}
                                            >
                                                {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div> */}
                            <button
                                className={`nav-item ${activeSection === 'activity' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('activity')}
                            >
                                <FontAwesomeIcon icon={faListAlt} className="nav-icon" />
                                Activity
                            </button>
                            <button
                                className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
                                onClick={() => handleSectionClick('settings')}
                            >
                                <FontAwesomeIcon icon={faCog} className="nav-icon" />
                                Settings
                            </button>
                        </nav>
                    </div>

                    <div className="account-content-area">
                        {activeSection === 'overview' && (
                            <Stats loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                        )}
                        {activeSection === 'activity' && (
                            <Activity loggedInUser={loggedInUser} />
                        )}
                        {activeSection === 'posts' && (
                            <DataList loggedInUser={loggedInUser} postType={activePostType} />
                        )}
                        {activeSection === 'settings' && (
                           <Settings loggedInUser={loggedInUser} postType={activePostType} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}