import { useState, useEffect, useRef } from 'react';
import useNavigation from './useNavigation.js';
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faRightToBracket,
  faHouse,
  faListUl,
  faPenToSquare,
  faUserGear,
  faBars,
  faXmark,
  faRankingStar,
  faClockRotateLeft,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

// Animation variants
const sidebarVariants = {
  open: {
    width: 250,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    width: 80,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const menuItemVariants = {
  open: {
    x: 0,
    
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  closed: {
    x: 0,
    justifyContent: "left",
    transition: {
      duration: 0.1,
    },
  },
};

const iconContainerVariants = {
  open: {
    justifyContent: "",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    align: "start",
    justifyContent: "start",
    width: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const submenuVariants = {
    open: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
            staggerChildren: 0.1, 
        }
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    }
};

const submenuItemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
};

const recentThreadsVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const Navigator = () => {
  const { goToHome, goToAcct, goToLogin, goToacctActivity, goToacctSettings, goToThreadList, goToSignUp, goToNewThread, goToThread, goToLeaderboard, goToAchievements, isActive } = useNavigation();
  const timeoutRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(() => {
    return localStorage.getItem('isExpanded') === 'true';
  });
  const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!foundUser);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAccountHovered, setIsAccountHovered] = useState(false);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(sessionStorage.getItem("foundUser")));
  }, []);

  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let recent = JSON.parse(sessionStorage.getItem("recentlyViewed")) || [];

  const switchToggle = () => {
    setIsExpanded(prev => {
      const state = !prev;
      localStorage.setItem('isExpanded', state);
      return state;
    });
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsHovered(true), 250);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    if (isHovered) {
      setIsHovered(false);
    }
  };

  const handleAccountMouseEnter = () => {
    setIsAccountHovered(true);
  };

  const handleAccountMouseLeave = () => {
    setIsAccountHovered(false);
  };

  function handleRVClick(thread) {
    recent = recent.filter(item => item.id !== thread.id);
    recent.unshift(thread);
    sessionStorage.setItem("recentlyViewed", JSON.stringify(recent));
    goToThread(thread.id);
  }

  const isRecentActive = recent.some(thread => location.pathname === `/thread/${thread.id}`);

  return (
    <>
      <div className="top-nav">
       <div className="top-nav-content">
  <button
    aria-label={isExpanded ? 'Close navigation menu' : 'Open navigation menu'}
    className={`nav-toggle ${isExpanded ? 'menu-open' : ''}`}
    onClick={switchToggle}
  >
    <div className="nav-toggle-open">
      <FontAwesomeIcon icon={faBars} className="fa-icon" />
    </div>
    <div className="nav-toggle-close">
      <FontAwesomeIcon icon={faXmark} className="fa-icon" />
    </div>
  </button>

  <h1 className="title" onClick={goToHome}>
    {screenWidth >= 347 ? 'Anonymous Academy' : 'A.A.'}
  </h1>

  <div className="nav-spacer" /> {/* This keeps space between title and auth */}

  { !isLoggedIn && (
    <div className="auth-buttons">
      <motion.div 
        className="auth-button-group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          className="auth-btn signup-side" 
          onClick={goToSignUp}
          aria-label="Sign up"
        >
          <FontAwesomeIcon icon={faUserPlus} /> Join
        </button>
        <button 
          className="auth-btn login-side" 
          onClick={goToLogin}
          aria-label="Login"
        >
          <FontAwesomeIcon icon={faRightToBracket} /> Login
        </button>
      </motion.div>
    </div>
  )}
</div>
      </div>

      {(isExpanded && screenWidth <= 768) && (
        <div className="mobile-overlay" onClick={(e) => {
          e.stopPropagation();
          switchToggle();
        }}></div>
      )}

      <motion.div
        className={`navigator ${isHovered || isExpanded ? 'menu-open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variants={sidebarVariants}
        animate={isExpanded ? "open" : "closed"}
      >
        <nav className='sidebar'>
          <div className="menu-items">

            <motion.div
              className={`sidebar-link ${isActive('/home') ? 'active-link' : ''}`}
              onClick={goToHome}
              variants={menuItemVariants}
              initial="closed"
              animate={isExpanded ? "open" : "closed"}
            >
              <button
                className={`sidebar-btn ${isActive('/home') ? 'active-link' : ''}`}
                aria-label="Go to home page"
              >
                <motion.div
                  className={`icon-container ${isActive('/home') ? 'active-link' : ''}`}
                  variants={iconContainerVariants}
                  initial="closed"
                  animate={isExpanded || isHovered ? "open" : "closed"}
                >
                  <i><FontAwesomeIcon icon={faHouse} className={`fa-icon ${isActive('/home') ? 'active-link' : ''}`} /></i>
                </motion.div>
                {(isHovered || isExpanded) && (<h1>Home</h1>)}
              </button>
            </motion.div>
             <motion.div
              className={`sidebar-link ${isActive('/') ? 'active-link' : ''}`}
              onClick={goToThreadList}
              variants={menuItemVariants}
              initial="closed"
              animate={isExpanded ? "open" : "closed"}
            >
              <button
                className={`sidebar-btn ${isActive('/') ? 'active-link' : ''}`}
                aria-label="Go to thread list"
              >
                <motion.div
                  className={`icon-container ${isActive('/') ? 'active-link' : ''}`}
                  variants={iconContainerVariants}
                  initial="closed"
                  animate={isExpanded || isHovered ? "open" : "closed"}
                >
                  <i><FontAwesomeIcon icon={faListUl} className={`fa-icon ${isActive('/') ? 'active-link' : ''}`} /></i>
                </motion.div>
                {(isHovered || isExpanded) && (<h1>Threads</h1>)}
              </button>
            </motion.div>
            <motion.div
              className={`sidebar-link ${isActive('/post') ? 'active-link' : ''}`}
              onClick={goToNewThread}
              variants={menuItemVariants}
              initial="closed"
              animate={isExpanded ? "open" : "closed"}
            >
              <button
                className={`sidebar-btn ${isActive(`/post`) ? 'active-link' : ''}`}
                aria-label="Go to create a new thread post"
              >
                <motion.div
                  className={`icon-container ${isActive('/post') ? 'active-link' : ''}`}
                  variants={iconContainerVariants}
                  initial="closed"
                  animate={isExpanded || isHovered ? "open" : "closed"}
                >
                  <i><FontAwesomeIcon icon={faPenToSquare} className={`fa-icon ${isActive('/post') ? 'active-link' : ''}`} /></i>
                </motion.div>
                {(isHovered || isExpanded) && (<h1>Post</h1>)}
              </button>
            </motion.div>
            {isLoggedIn && (
              <motion.div
                className={`sidebar-link ${isActive('/account/overview') || isActive('/account/activity') || isActive('/account/settings') ? 'active-link' : ''}`}
                onMouseEnter={handleAccountMouseEnter}
                onMouseLeave={handleAccountMouseLeave}
                variants={menuItemVariants}
                initial="closed"
                animate={isExpanded ? "open" : "closed"}
              >
                <button
                  className={`sidebar-btn ${isActive('/account/overview') || isActive('/account/activity') || isActive('/account/settings') ? 'active-link' : ''}`}
                  aria-label="Go to account overview and toggle submenu"
                >
                  <motion.div
                    className={`icon-container ${isActive('/account/overview') || isActive('/account/activity') || isActive('/account/settings') ? 'active-link' : ''}`}
                    variants={iconContainerVariants}
                    initial="closed"
                    animate={isExpanded || isHovered ? "open" : "closed"}
                  >
                    <i><FontAwesomeIcon icon={faUserGear} className={`fa-icon ${isActive('/account/overview') || isActive('/account/activity') || isActive('/account/settings') ? 'active-link' : ''}`} /></i>
                  </motion.div>
                  {(isHovered || isExpanded) && (<h1>Account</h1>)}
                </button>

                <AnimatePresence>
                {(isHovered || isExpanded) && (isAccountHovered || isAccountMenuOpen) && (
                  <motion.div
                    className="submenu"
                    variants={submenuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <motion.button
                      onClick={goToAcct}
                      className={`submenu-item ${isActive('/account/overview') ? 'active-link' : ''}`}
                      variants={submenuItemVariants}
                    >
                      Overview
                    </motion.button>
                    <motion.button
                      onClick={goToacctActivity}
                      className={`submenu-item ${isActive('/account/activity') ? 'active-link' : ''}`}
                      variants={submenuItemVariants}
                    >
                      Activity
                    </motion.button>
                    <motion.button
                      onClick={goToacctSettings}
                      className={`submenu-item ${isActive('/account/settings') ? 'active-link' : ''}`}
                      variants={submenuItemVariants}
                    >
                      Settings
                    </motion.button>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            )}
            <motion.div
              className={`sidebar-link ${isActive('/leaderboard') ? 'active-link' : ''}`}
              onClick={goToLeaderboard}
              variants={menuItemVariants}
              initial="closed"
              animate={isExpanded ? "open" : "closed"}
            >
              <button
                className={`sidebar-btn ${isActive(`/leaderboard`) ? 'active-link' : ''}`}
                aria-label="Go to view leaderboard"
              >
                <motion.div
                  className={`icon-container ${isActive('/leaderboard') ? 'active-link' : ''}`}
                  variants={iconContainerVariants}
                  initial="closed"
                  animate={isExpanded || isHovered ? "open" : "closed"}
                >
                  <i><FontAwesomeIcon icon={faRankingStar} className={`fa-icon ${isActive('/leaderboard') ? 'active-link' : ''}`} /></i>
                </motion.div>
                {(isHovered || isExpanded) && (<h1>Leaderboard</h1>)}
              </button>
            </motion.div>
            <motion.div
              className={`sidebar-link ${isActive('/achievements') ? 'active-link' : ''}`}
              onClick={goToAchievements}
              variants={menuItemVariants}
              initial="closed"
              animate={isExpanded ? "open" : "closed"}
            >
              <button
                className={`sidebar-btn ${isActive(`/achievements`) ? 'active-link' : ''}`}
                aria-label="Go to view achievements"
              >
                <motion.div
                  className={`icon-container ${isActive('/achievements') ? 'active-link' : ''}`}
                  variants={iconContainerVariants}
                  initial="closed"
                  animate={isExpanded || isHovered ? "open" : "closed"}
                >
                  <i><FontAwesomeIcon icon={faTrophy} className={`fa-icon ${isActive('/achievements') ? 'active-link' : ''}`} /></i>
                </motion.div>
                {(isHovered || isExpanded) && (<h1>Achievements</h1>)}
              </button>
            </motion.div>
          </div>

          <motion.div
            className="recentThreadsContainer"
            variants={recentThreadsVariants}
            initial="closed"
            animate={isExpanded || isHovered ? "open" : "closed"}
          >
            <div className="recentThreadsExpanded">
              <h2 className="recentThreadsTitle">
                <FontAwesomeIcon icon={faClockRotateLeft} className={`fa-icon ${isRecentActive ? 'active-link' : ''}`} /> 
                Recently Viewed
              </h2>
                <ul>
                  {recent.map(thread => (
                    <li key={thread.id} className={`recentThreadItem ${isActive(`/thread/${thread.id}`) ? 'active-link' : ''}`} onClick={() => handleRVClick(thread)}>
                      {thread.title}
                    </li>
                  ))}
                  {recent.length === 0 && (
                    <li className="recentThreadEmpty">No Recently Viewed</li>
                  )}
                </ul>
              </div>
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
};

export default Navigator;
