// Library declaration imports
import { useState, useEffect, useRef} from 'react';

// Other modules components imports
import useNavigation from '../modules/useNavigation';
import loginpic from '../img/loginpic.png';

export default function Login() {
    const { goToSignUp, goToHome } = useNavigation();
    const [loaded, setLoaded] = useState(false);

    const leftSplitRef = useRef(null);
    const rightSplitRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (rightSplitRef.current) {
            const rect = rightSplitRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 20; 
            const moveY = (y - centerY) / 20; 
            const rotateX = (centerY - y) / 15; 
            const rotateY = (x - centerX) / 15; 

            setMousePosition({ moveX, moveY, rotateX, rotateY });
        }
    };

    const handleMouseLeave = () => {
        setMousePosition({ moveX: 0, moveY: 0, rotateX: 0, rotateY: 0 });
    };

    function loginUser() {
        let usersGet = sessionStorage.getItem("user");
        let users = usersGet ? JSON.parse(usersGet) : [];
    
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        let foundUser = null;
        for (let i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                foundUser = users[i];
                users[i].login = true;
                sessionStorage.setItem("user", JSON.stringify(users));
                break;
            }
        }
    
        if (foundUser) {
            sessionStorage.setItem("foundUser", JSON.stringify(foundUser));
            localStorage.setItem("userPreferences", JSON.stringify(foundUser.pref));
            goToHome();
        } else {
            alert("Login Unsuccessful");
        }
    }

    return (
        <div className="offset">
            <div className="Login">
                <div className="parent-container">
                    <div className="split">
                        <div
                            ref={rightSplitRef}
                            className={`split right Login-page ${loaded ? 'animate-right' : ''}`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="content"
                                style={{
                                    transform: `translate3d(${mousePosition.moveX}px, ${mousePosition.moveY}px, 0) perspective(500px) rotateX(${mousePosition.rotateX}deg) rotateY(${mousePosition.rotateY}deg)`,
                                }}
                            >
                                <img src={loginpic} alt='Community' />
                            </div>
                        </div>

                        <div ref={leftSplitRef}
                            className={`split left Login-page ${loaded ? 'animate-left' : ''}`
                        }>
                            <div className='center'>
                                <div className="page-title">
                                    <h2>Welcome Back!</h2>
                                </div>
                                <div className="inputbox">
                                    <input type="text" id="email" name="email" placeholder="Email" />
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <button className="submit-button" type="submit" onClick={loginUser}>
                                    Login
                                </button>
                                <div className="border-line">
                                    <span>Or</span>
                                </div>
                                <div className="login-container">
                                    <p className="login-text">Don't have an account? </p>
                                    <p className="smalltext" onClick={goToSignUp}>Sign Up here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}