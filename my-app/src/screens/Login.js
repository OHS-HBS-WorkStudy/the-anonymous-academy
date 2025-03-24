import { useState} from 'react';
import useNavigation from '../modules/useNavigation';
import loginpic from '../img/loginpic.png';

export default function Login() {

    const {goToSignUp} = useNavigation();

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


    return(
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
                        <button className="submit-button" type="submit">
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