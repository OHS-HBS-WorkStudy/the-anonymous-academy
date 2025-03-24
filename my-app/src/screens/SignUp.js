import { useState} from 'react';
import useNavigation from '../modules/useNavigation';

export default function SignUp() {
    const {toGoLogin} = useNavigation();
    const [activeButton, setActiveButton] = useState("student");
    const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

    return(
        <div className="offset">
             <div className="Sign">
                <div className="container">
                    <div class="split right">
                            <div className="center">
                            <div className='content'>
                            {/* <img src={signpic} alt="signpic" className="signpic"/> */}
                            </div>  
                        </div>
                    </div>

                <div className="split left">
                        <div className="center">
                        
                            <div className="page-title">
                                <h2>Join the Community!</h2>
                            </div>


                            <div className="inputbox">
                                <input id="fname" type="text" placeholder="Enter your first name" />
                                <input id="lname" type="text" placeholder="Enter your last name"/>
                                <input type="text" id="email" className="email" placeholder="Email"/>
                                
                                <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className="password"
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
                            
                            <div class="button-group-container">
                            <div class="button-group">
                            <button
                                            className={`button-group-btn ${
                                            activeButton === "student" ? "active" : ""
                                            }`}
                                            onClick={() => handleButtonClick("student")}
                                        >
                                            Student
                                        </button>
                                        <button
                                            className={`button-group-btn ${
                                            activeButton === "parent" ? "active" : ""
                                            }`}
                                            onClick={() => handleButtonClick("parent")}
                                        >
                                            Parent
                                        </button>
                                        <button
                                            className={`button-group-btn ${
                                            activeButton === "teacher" ? "active" : ""
                                            }`}
                                            onClick={() => handleButtonClick("teacher")}
                                        >
                                            Teacher
                                        </button>
                            </div>
                        </div>

                            <button className="buttonn" >Sign Up</button>
                            <div className="border-line">
                            <span>Or</span>
                        </div>

                            
                        <div className="login-container">
                        <p className="login-text">Have an account? </p>
                        <p className="smalltext" onClick={toGoLogin}>Login here</p>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
