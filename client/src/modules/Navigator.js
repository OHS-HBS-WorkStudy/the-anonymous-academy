import React, {useRef, useState} from 'react';
import useNavigation from './useNavigation.js';

// import AppLogo from '../img/AppLogo.png';

export default function Navigator() {
  const { goToHome, goToacctStats, goToLogin, goToSignUp, goToNewThread, isActive } = useNavigation();
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

  return (
    <>
      <div className="top-nav">
          <div className="top-nav-content">
            <button className={`nav-toggle ${isExpanded ? 'menu-open' : ''}`}
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
          </div>
        </div>

        {(isExpanded && screenWidth <= 480) && (
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

  
        <div className={`sidebar-link ${isActive('/signup') ? 'active-link' : ''}`} 
                onClick={goToSignUp}>
              <button 
                className={`sidebar-btn ${isActive('/signup') ? 'active-link' : ''}`}
              >
                  <div className="icon-container">
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                      </svg>
                    </i>
                  </div>
                  {(isHovered || isExpanded) && (<h1>Sign Up</h1>)}
              </button>
          </div>
          <div className={`sidebar-link ${isActive('/login') ? 'active-link' : ''}`} 
                onClick={goToLogin}>
              <button 
                className={`sidebar-btn ${isActive('/login') ? 'active-link' : ''}`}  
              >
                  <div className="icon-container">
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
                      </svg>
                    </i>
                  </div>
                  {(isHovered || isExpanded) && (<h1>Login</h1>)}
              </button>
          </div>
          <div className={`sidebar-link ${isActive('/') ? 'active-link' : ''}`} 
                onClick={goToHome}>
              <button 
                className={`sidebar-btn ${isActive('/') ? 'active-link' : ''}`} 
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
            <div className={`sidebar-link ${isActive('/newthread') ? 'active-link' : ''}`} 
                onClick={goToNewThread}>
              <button 
                className={`sidebar-btn ${isActive(`/newthread`) ? 'active-link' : ''}`} 
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
            <div className={`sidebar-link ${isActive('/account/stats') ? 'active-link' : ''}`} 
                onClick={goToacctStats}>
              <button 
                className={`sidebar-btn ${isActive('/account/stats') ? 'active-link' : ''}`}
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
      </nav>
    </div>
    </>
  );
}