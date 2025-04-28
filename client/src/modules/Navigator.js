import React, {useRef, useState} from 'react';
import useNavigation from './useNavigation.js';

export default function Navigator() {
  const { goToHome, goToAcct, goToLogin, goToThreadList, goToSignUp, goToNewThread, goToThread, isActive } = useNavigation();
  const timeoutRef = useRef(null); 
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(() => {
    return localStorage.getItem('isExpanded') === 'true';
  });

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

  return (
    <>
      <div className="top-nav">
          <div className="top-nav-content">
            <button 
            aria-label={isExpanded ? 'Close navigation menu' : 'Open navigation menu'}
                    className={`nav-toggle ${isExpanded ? 'menu-open' : ''}`}
                    onClick={switchToggle}>
                      
                <div className="nav-toggle-open">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                  </svg>
                </div>
                <div className="nav-toggle-close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </div>
              </button>

              {/* <img className="appLogo" src={AppLogo} alt='Community' onClick={goToHome} /> */}

            <h1 className="title" onClick={goToHome}>
              Anonymous Academy
            </h1>
            {/* <SearchBar /> */}

            <div className="top-nav-container">

              <button className="top-nav-btn sign-up" onClick={goToSignUp}>
                  <h1>Sign Up</h1>
              </button>
            </div>
          </div>
        </div>

        {(isExpanded && screenWidth <= 786) && (
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
        <div className={`sidebar-link ${isActive('login') ? 'active-link' : ''}`} 
                onClick={goToLogin}>
              <button 
                className={`sidebar-btn ${isActive('/login') ? 'active-link' : ''}`}
                 aria-label="Go to login page"
              >
                <div className="icon-container">
                <i><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
                                </svg></i>
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
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="icon-home">
                      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                      </svg>
                    </i>
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
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
                      </svg>
                    </i>
                  </div>
                  {(isHovered || isExpanded) && (<h1>Thread List</h1>)}
              </button>
          </div>
            <div className={`sidebar-link ${isActive('/newthread') ? 'active-link' : ''}`} 
                onClick={goToNewThread}>
              <button 
                className={`sidebar-btn ${isActive(`/newthread`) ? 'active-link' : ''}`} 
                aria-label="Go to create a new thread"
              >
                <div className="icon-container">
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="icon-pencil">
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                      </svg>
                    </i>
                  </div>
                  {(isHovered || isExpanded) && (<h1>New Thread</h1>)}
              </button>
            </div>
            <div className={`sidebar-link ${isActive('/account/overview') || isActive('/account/activity')  || isActive('/account/settings')  ? 'active-link' : ''}`} 
                onClick={goToAcct}>
              <button 
                className={`sidebar-btn ${isActive('/account/overview') || isActive('/account/activity')  || isActive('/account/settings')  ? 'active-link' : ''}`}
                 aria-label="Go to account page"
              >
                <div className="icon-container">
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368" className="icon-gear">
                      <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                      </svg>
                    </i>
                  </div>
                  {(isHovered || isExpanded) && (<h1>Account</h1>)}
              </button>
            </div>
        </div>

          <div className="recentThreadsContainer">

        {!isHovered && !isExpanded && (
          <div className='sidebar-link'>
       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M610-760q-21 0-35.5-14.5T560-810q0-21 14.5-35.5T610-860q21 0 35.5 14.5T660-810q0 21-14.5 35.5T610-760Zm0 660q-21 0-35.5-14.5T560-150q0-21 14.5-35.5T610-200q21 0 35.5 14.5T660-150q0 21-14.5 35.5T610-100Zm160-520q-21 0-35.5-14.5T720-670q0-21 14.5-35.5T770-720q21 0 35.5 14.5T820-670q0 21-14.5 35.5T770-620Zm0 380q-21 0-35.5-14.5T720-290q0-21 14.5-35.5T770-340q21 0 35.5 14.5T820-290q0 21-14.5 35.5T770-240Zm60-190q-21 0-35.5-14.5T780-480q0-21 14.5-35.5T830-530q21 0 35.5 14.5T880-480q0 21-14.5 35.5T830-430ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880v80q-134 0-227 93t-93 227q0 134 93 227t227 93v80Zm132-212L440-464v-216h80v184l148 148-56 56Z"/>
       </svg>
       </div>
        )}
        {(isHovered || isExpanded) && (
          <div className="recentThreadsExpanded">
            <h2 className="recentThreadsTitle">Recent Viewed</h2>
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