import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import useNavigation from '../modules/useNavigation';
import loginpic from '../img/loginpic.png';

import {
    containerVariants,
    splitRightVariants,
    loginContainerVariants,
    imageVariants,
    titleVariants,
    inputVariants,
    orLineVariants,
    submitButtonVariants,
    togglePasswordVariants,
    linkVariants
} from '../modules/Animations/SignAnimations';

export default function Login() {
    const { goToSignUp, goToHome } = useNavigation();
    const [loaded, setLoaded] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    function validateInputs(email, password) {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        return newErrors;
    }

    function loginUser() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const newErrors = validateInputs(email, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const usersGet = sessionStorage.getItem("user");
        const users = usersGet ? JSON.parse(usersGet) : [];

        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            foundUser.login = true;
            sessionStorage.setItem("user", JSON.stringify(users));
            sessionStorage.setItem("foundUser", JSON.stringify(foundUser));
            localStorage.setItem("userPreferences", JSON.stringify(foundUser.pref));
            goToHome();
        } else {
            setErrors({ login: "Login unsuccessful. Check your credentials." });
        }
    }

    const renderInput = (id, type, placeholder, icon) => (
        <motion.div className="input-with-icon">
            <FontAwesomeIcon icon={icon} className="input-icon" />
            <motion.input
                variants={inputVariants}
                id={id}
                type={type}
                placeholder={placeholder}
                className={errors[id] ? "input-error" : "input-default"}
            />
            <AnimatePresence>
                {errors[id] && (
                    <motion.div
                        className="error-tooltip"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                    >
                        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                        <span>{errors[id]}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return (
        <motion.div className="offset" variants={containerVariants} initial="initial" animate="animate" exit="exit">
            <div className="Login">
                <div className="parent-container">
                    <motion.div className="split">
                        <motion.div
                            className="split right Login-page"
                            variants={splitRightVariants}
                            animate={loaded ? "animate" : "initial"}
                        >
                            <motion.div className="content" variants={imageVariants}>
                                <img src={loginpic} alt="Login visual" className="loginpic" />
                            </motion.div>
                        </motion.div>

                        <motion.div className="split left Login-page">
                            <div className="center">
                                {screenWidth <= 825 && (
                                    <motion.div className="content" variants={imageVariants}>
                                        <img src={loginpic} alt="Login" className="loginpic" />
                                    </motion.div>
                                )}

                                <motion.div className="page-title" variants={titleVariants}>
                                    <h2>Welcome Back!</h2>
                                </motion.div>

                                <div className="inputbox">
                                    {renderInput("email", "text", "Email", faEnvelope)}

                                    <motion.div className="input-with-icon">
                                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                                        <motion.input
                                            variants={inputVariants}
                                            type={passwordVisible ? "text" : "password"}
                                            id="password"
                                            placeholder="Password"
                                            className={errors.password ? "input-error" : "input-default"}
                                        />
                                        <motion.button
                                            variants={togglePasswordVariants}
                                            className="toggle-password"
                                            onClick={togglePasswordVisibility}
                                            type="button"
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            {passwordVisible ? "Hide" : "Show"}
                                        </motion.button>

                                        <AnimatePresence>
                                            {errors.password && (
                                                <motion.div
                                                    className="error-tooltip"
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                >
                                                    <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                                                    <span>{errors.password}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <AnimatePresence>
                                        {errors.login && (
                                            <motion.div
                                                className="error-tooltip"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                style={{ marginTop: "-10px", marginBottom: "10px", paddingLeft: "2px" }}
                                            >
                                                <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                                                <span>{errors.login}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.button
                                    variants={submitButtonVariants}
                                    className="submit-button"
                                    type="submit"
                                    onClick={loginUser}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Login
                                </motion.button>

                                <motion.div className="border-line" variants={orLineVariants}>
                                    <span>Or</span>
                                </motion.div>

                                <motion.div className="login-container" variants={loginContainerVariants}>
                                    <p className="login-text">Don't have an account?</p>
                                    <motion.p
                                        className="smalltext"
                                        onClick={goToSignUp}
                                        variants={linkVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        Sign Up here
                                    </motion.p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
