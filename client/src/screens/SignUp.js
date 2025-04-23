// Library declaration imports
import { useState} from 'react';
import { motion } from 'framer-motion';

// Other modules components imports
import useNavigation from '../modules/useNavigation';
import signuppic from '../img/signpic.png';
import {
    containerVariants,
    splitRightVariants,
    loginContainerVariants,
    imageVariants,
    titleVariants,
    inputVariants,
    buttonVariants,
    orLineVariants,
    fadeVariants,
    buttonGroupVariants,
    submitButtonVariants,
} from '../modules/Animations/SignAnimations';

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
        <motion.div
            className="offset"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div className="Sign-page">
                <motion.div className='parent-container'>
                    <motion.div className="split">
                        <motion.div
                            className="split right"
                            variants={splitRightVariants}
                        >
                            <motion.div className="center">
                                <motion.div className='content' variants={imageVariants}>
                                    <img src={signuppic} alt="signpic" className="signpic" />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="split left"
                        >
                            <motion.div className="center">

                                <motion.div className="page-title" variants={titleVariants}>
                                    <h2>Join the Community!</h2>
                                </motion.div>

                                <motion.div className="inputbox">
                                    <motion.input variants={inputVariants} id="fname" type="text" placeholder="Enter your first name" />
                                    <motion.input variants={inputVariants} id="lname" type="text" placeholder="Enter your last name" />
                                    <motion.input variants={inputVariants} type="text" id="email" className="email" placeholder="Email" />

                                        <motion.input
                                            variants={inputVariants}
                                            type="password"
                                            id="password"
                                            className="password"
                                            placeholder="Password"
                                        />

                                    <motion.div style={{ position: 'relative' }}>
                                        <motion.input
                                            variants={inputVariants}
                                            type={passwordVisible ? "text" : "password"}
                                            id="reenteredpassword"
                                            className="reenteredpassword"
                                            placeholder="Re-Enter Password"
                                        />

                                        <motion.button
                                            whileHover="hover"
                                            whileTap="tap"
                                            type="button"
                                            className="toggle-password"
                                            onClick={togglePasswordVisibility}
                                            variants={fadeVariants}
                                            initial="initial"
                                            animate="animate"
                                        >
                                            {passwordVisible ? "Hide" : "Show"}
                                        </motion.button>
                                    </motion.div>
                                </motion.div>

                                <motion.div className="button-group-container" variants={buttonGroupVariants}>
                                    <motion.div className="button-group">
                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className={`button-group-btn ${activeButton === "Student" ? "active" : ""}`}
                                            onClick={() => handleButtonClick("Student")}
                                        >
                                            Student
                                        </motion.button>
                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className={`button-group-btn ${activeButton === "Parent" ? "active" : ""}`}
                                            onClick={() => handleButtonClick("Parent")}
                                        >
                                            Parent
                                        </motion.button>
                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className={`button-group-btn ${activeButton === "Teacher" ? "active" : ""}`}
                                            onClick={() => handleButtonClick("Teacher")}
                                        >
                                            Teacher
                                        </motion.button>
                                    </motion.div>
                                </motion.div>

                                <motion.button
                                    variants={submitButtonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="submit-button"
                                    type="submit"
                                    onClick={createUser}
                                >
                                    Sign Up
                                </motion.button>
                                <motion.div className="border-line" variants={orLineVariants}>
                                    <span>Or</span>
                                </motion.div>

                                <motion.div className="login-container" variants={loginContainerVariants}>
                                    <p className="login-text">Have an account? </p>
                                    <p className="smalltext" onClick={goToLogin}>Login here</p>
                                </motion.div>

                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}