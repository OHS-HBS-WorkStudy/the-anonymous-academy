// Library declaration imports
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, faEnvelope, faLock, faExclamationCircle, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

import useNavigation from '../modules/useNavigation';
import signuppic from '../img/signpic.png';
import {
    containerVariants,
    splitRightVariants,
    loginContainerVariants,
    imageVariants,
    titleVariants,
    inputVariants,
    iconVariants,
    orLineVariants,
    fadeVariants,
    buttonGroupVariants,
    submitButtonVariants,
} from '../modules/Animations/SignAnimations';

export default function SignUp() {
    const { goToLogin } = useNavigation();
    const [activeButton, setActiveButton] = useState("Student");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const validateFields = () => {
        const fname = document.getElementById("fname")?.value.trim();
        const lname = document.getElementById("lname")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value;
        const reenteredPassword = document.getElementById("reenteredpassword")?.value;

        const newErrors = {};
        let users = JSON.parse(sessionStorage.getItem("user")) || [];

        if (!fname) newErrors.fname = "First name is required.";
        if (!lname) newErrors.lname = "Last name is required.";
        if (!email) newErrors.email = "Email is required.";
        else if (users.some(u => u.email === email)) newErrors.email = "Email already exists.";

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Must contain at least one number.";
        } else if (!/[!@#$%^&*]/.test(password)) {
            newErrors.password = "Must contain at least one special character.";
        } else if (password.length > 20) {
            newErrors.password = "Must not exceed 20 characters.";
        } else if (password.includes(" ")) {
            newErrors.password = "Must not contain spaces.";
        }

        if (!reenteredPassword) {
            newErrors.reenteredPassword = "Please re-enter your password.";
        } else if (password !== reenteredPassword) {
            newErrors.reenteredPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createUser = () => {
        if (!validateFields()) return;

        const users = JSON.parse(sessionStorage.getItem("user")) || [];
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const now = new Date();
        const formattedTime = now.toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: 'numeric', hour12: true
        });

        users.push({
            first_name: fname,
            last_name: lname,
            email,
            password,
            account_type: activeButton,
            created: formattedTime,
            login: false,
            pref: { ruleAgreement: false },
        });

        sessionStorage.setItem("user", JSON.stringify(users));
        goToLogin();
        setActiveButton("Student");
    };

    const renderInput = (id, type, placeholder, icon) => {
        const isPasswordToggle = id === "reenteredpassword";
        const inputType = isPasswordToggle ? (passwordVisible ? "text" : "password") : type;

        return (
            <div className="input-container" style={{ position: 'relative' }}>
                <motion.div className="input-with-icon">
                    <motion.span
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <FontAwesomeIcon icon={icon} className="input-icon" />
                    </motion.span>

                    <motion.input
                        variants={inputVariants}
                        id={id}
                        type={inputType}
                        placeholder={placeholder}
                        className={`${errors[id] ? 'input-error' : 'input-default'}`}
                    />
                </motion.div>

                {isPasswordToggle && (
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
                )}

                <AnimatePresence>
                    {errors[id] && (
                        <motion.div
                            className="error-tooltip"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                            <span>{errors[id]}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

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
                        <motion.div className="split right" variants={splitRightVariants}>
                            <motion.div className="center">
                                <motion.div className='content' variants={imageVariants}>
                                    <img src={signuppic} alt="signpic" className="signpic" />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div className="split left">
                            <motion.div className="center">
                                {screenWidth <= 825 && (
                                    <motion.div className='content' variants={imageVariants}>
                                        <img src={signuppic} alt="signpic" className="signpic" />
                                    </motion.div>
                                )}
                                <motion.div className="page-title" variants={titleVariants}>
                                    <h2>Join the Community!</h2>
                                </motion.div>

                                <motion.div className="inputbox">
                                    {renderInput("fname", "text", "First Name", faUser)}
                                    {renderInput("lname", "text", "Last Name", faUser)}
                                    {renderInput("email", "text", "Email", faEnvelope)}
                                    {renderInput("password", "password", "Password", faLock)}
                                    {renderInput("reenteredpassword", "password", "Re-enter Password", faLock)}
                                </motion.div>

                                <motion.div className="button-group-container" variants={buttonGroupVariants}>
                                    <motion.div className="button-group">
                                        {["Student", "Parent", "Teacher"].map((role) => (
                                            <motion.button
                                                key={role}
                                                className={`button-group-btn ${activeButton === role ? "active" : ""}`}
                                                onClick={() => handleButtonClick(role)}
                                            >
                                                {role}
                                            </motion.button>
                                        ))}
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
                                    <p className="login-text">Have an account?</p>
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
