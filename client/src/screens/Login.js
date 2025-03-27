// Library declaration imports
import { useState} from 'react';

// Other modules components imports
import useNavigation from '../modules/useNavigation';
import loginpic from '../img/loginpic.png';

export default function Login() {
    const { goToSignUp, goToHome } = useNavigation();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 10 - 5;
        const y = (e.clientY / window.innerHeight) * 10 - 5;
        setPosition({ x, y });
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
                            className="split right"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
                        >
                            <div
                                className="content"
                                style={{
                                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <img src={loginpic} alt='Community' />
                            </div>
                        </div>

                        <div className="split left">
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