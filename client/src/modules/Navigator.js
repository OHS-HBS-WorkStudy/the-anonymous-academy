import React, {useRef, useState} from 'react';
import useNavigation from './useNavigation.js';
import { useLocation } from "react-router-dom";

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
  faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons';

export default function Navigator() {
  const { goToHome, goToAcct, goToLogin, goToThreadList, goToSignUp, goToNewThread, goToThread, isActive } = useNavigation();
  const timeoutRef = useRef(null); 
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(() => {
    return localStorage.getItem('isExpanded') === 'true';
  });

  const location = useLocation();


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  React.useEffect(() => {
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

            {(screenWidth >= 347) ? (
               <h1 className="title" onClick={goToHome}>
               Anonymous Academy
             </h1>
            ): (
              <h1 className="title" onClick={goToHome}>
              A.A.
             </h1>
            )}

            {/* <SearchBar /> */}
          </div>
        </div>

        {(isExpanded && screenWidth <= 768) && (
          <div className="mobile-overlay" onClick={(e) => {
            e.stopPropagation();
            switchToggle();
          }}></div>
        )}


      <div className={`navigator ${isHovered || isExpanded ? 'menu-open' : ''}`} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <nav className='sidebar'>
          <div className="menu-items">
          <div className={`sidebar-link ${isActive('join') ? 'active-link' : ''}`} 
                    onClick={goToSignUp}>
                  <button 
                    className={`sidebar-btn ${isActive('/join') ? 'active-link' : ''}`}
                    aria-label="Go to join page"
                  >
                    <div className="icon-container">
                    <i><FontAwesomeIcon icon={faUserPlus}  className="fa-icon" /></i>
                      </div>
                      {(isHovered || isExpanded) && (<h1>Join</h1>)}
                  </button>
            </div> 
            <div className={`sidebar-link ${isActive('login') ? 'active-link' : ''}`} 
                    onClick={goToLogin}>
                  <button 
                    className={`sidebar-btn ${isActive('/login') ? 'active-link' : ''}`}
                    aria-label="Go to login page"
                  >
                    <div className="icon-container">
                    <i><FontAwesomeIcon icon={faRightToBracket}  className="fa-icon" /></i>
                      </div>
                      {(isHovered || isExpanded) && (<h1>Login</h1>)}
                  </button>
            </div> 
              
              <div className={`sidebar-link ${isActive('/home') ? 'active-link' : ''}`} 
                    onClick={goToHome}>
                  <button 
                    className={`sidebar-btn ${isActive('/home') ? 'active-link' : ''}`} 
                    aria-label="Go to home page"
                  >
                    <div className="icon-container">
                        <i><FontAwesomeIcon icon={faHouse}  className="fa-icon" /></i>
                      </div>
                      {(isHovered || isExpanded) && (<h1>Home</h1>)}
                  </button>
                </div>
                <div className={`sidebar-link ${isActive('/') ? 'active-link' : ''}`} 
                    onClick={goToThreadList}>
                  <button 
                    className={`sidebar-btn ${isActive('/') ? 'active-link' : ''}`}
                    aria-label="Go to thread list"
                  >
                      <div className="icon-container">
                        <i><FontAwesomeIcon icon={faListUl}  className="fa-icon" /></i>
                      </div>
                      {(isHovered || isExpanded) && (<h1>Threads</h1>)}
                  </button>
              </div>
                <div className={`sidebar-link ${isActive('/post') ? 'active-link' : ''}`} 
                    onClick={goToNewThread}>
                  <button 
                    className={`sidebar-btn ${isActive(`/post`) ? 'active-link' : ''}`} 
                    aria-label="Go to create a new thread post"
                  >
                    <div className="icon-container">
                        <i><FontAwesomeIcon icon={faPenToSquare} className="fa-icon" /></i>
                      </div>
                      {(isHovered || isExpanded) && (<h1>Post</h1>)}
                  </button>
                </div>
                <div className={`sidebar-link ${isActive('/account/overview') || isActive('/account/activity')  || isActive('/account/settings')  ? 'active-link' : ''}`} 
                    onClick={goToAcct}>
                  <button 
                    className={`sidebar-btn ${isActive('/account/overview') || isActive('/account/activity')  || isActive('/account/settings')  ? 'active-link' : ''}`}
                    aria-label="Go to account page"
                  >
                    <div className="icon-container">
                        <i><FontAwesomeIcon icon={faUserGear}  className="fa-icon"/></i>
                      </div>
                      {(isHovered || isExpanded) && (<h1>Account</h1>)}
                  </button>
                </div>
            </div>

            <div className="recentThreadsContainer">

            {!isHovered && !isExpanded && (
              <div className='sidebar-link'>
                <FontAwesomeIcon icon={faClockRotateLeft} className={`fa-icon ${isRecentActive ? 'active-link' : ''}`} />
            </div>
            )}

            {(isHovered || isExpanded) && (
              <div className="recentThreadsExpanded">
                <h2 className="recentThreadsTitle"><FontAwesomeIcon icon={faClockRotateLeft} className={`fa-icon ${isRecentActive ? 'active-link' : ''}`} /> Recently Viewed</h2>
                <ul>
                  {recent.map(thread => (
                    <li key={thread.id} className={`recentThreadItem ${isActive('/thread/${thread.id}`') ? 'active-link' : ''}`} onClick={() => handleRVClick(thread)}>
                      {thread.title}
                    </li>
                  ))}
                  {recent.length === 0 && (
                    <li className="recentThreadEmpty">No Recently Viewed</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
// Navigator.js