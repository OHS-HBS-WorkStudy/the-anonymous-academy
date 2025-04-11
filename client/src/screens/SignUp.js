// Library declaration imports
import { useState} from 'react';

// Other modules components imports
import useNavigation from '../modules/useNavigation';
import signuppic from '../img/signpic.png';

export default function SignUp() {
    const { goToLogin } = useNavigation();
    const [activeButton, setActiveButton] = useState("Student");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    function createUser() {
        let usersGet = sessionStorage.getItem("user");
        let users = usersGet ? JSON.parse(usersGet) : [];
    
        if (!Array.isArray(users)) {
            users = [];
        }
    
        const firstName = document.getElementById("fname")?.value;
        const lastName = document.getElementById("lname")?.value;
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        const reenteredPassword = document.getElementById("reenteredpassword").value;

        if (firstName === "" || lastName === "" || email === "" || password === "" || reenteredPassword === "") {
            alert("Please fill in all fields!");
            return;
        } else if (users.some(user => user.email === email)) {
            alert("Email already exists!");
            return;
        } else if (password.length < 4) {
            alert("Password must be at least 4 characters long!");
            return;
        }  else if (password !== reenteredPassword) {
            alert("Passwords do not match!");
            return;
        }


        const now = new Date();
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedTime = now.toLocaleDateString('en-US', options);
    
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            account_type: activeButton,
            created: formattedTime,
            login: false,
            pref: { ruleAgreement: false }, 
        };
        
        users.push(data);
        sessionStorage.setItem("user", JSON.stringify(users));
        goToLogin();
        setActiveButton("Student");
    }

    return (
        <div className="offset">
            <div className="Sign-page">
                <div className='parent-container'>
                    <div className="split">
                        <div className="split right">
                            <div className="center">
                                <div className='content'>
                                    <img src={signuppic} alt="signpic" className="signpic" />
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
                                    <input id="lname" type="text" placeholder="Enter your last name" />
                                    <input type="text" id="email" className="email" placeholder="Email" />

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

                                    <input
                                        type='password'
                                        id="reenteredpassword"
                                        className="reenteredpassword"
                                        placeholder="Re-Enter Password"
                                    />
                                    
                                </div>

                                <div className="button-group-container">
                                    <div className="button-group">
                                        <button
                                            className={`button-group-btn ${activeButton === "Student" ? "active" : ""}`}
                                            onClick={() => handleButtonClick("Student")}
                                        >
                                            Student
                                        </button>
                                        <button
                                            className={`button-group-btn ${activeButton === "Parent" ? "active" : ""}`}
                                            onClick={() => handleButtonClick("Parent")}
                                        >
                                            Parent
                                        </button>
                                        <button
                                            className={`button-group-btn ${activeButton === "Teacher" ? "active" : ""}`}
                                            onClick={() => handleButtonClick("Teacher")}
                                        >
                                            Teacher
                                        </button>
                                    </div>
                                </div>

                                <button className="submit-button" type="submit" onClick={createUser}>Sign Up</button>
                                <div className="border-line">
                                    <span>Or</span>
                                </div>

                                <div className="login-container">
                                    <p className="login-text">Have an account? </p>
                                    <p className="smalltext" onClick={goToLogin}>Login here</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
