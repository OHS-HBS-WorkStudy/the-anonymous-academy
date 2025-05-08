// Library declaration imports
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Other modules/components imports
import useNavigation from '../modules/useNavigation';
import loginpic from '../img/loginpic.png';
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
    submitButtonVariants,
    togglePasswordVariants,
    linkVariants
} from '../modules/Animations/SignAnimations';


export default function Login() {
    const { goToSignUp, goToHome } = useNavigation();
    const [loaded, setLoaded] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const leftSplitRef = useRef(null);
    const rightSplitRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const[screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    // Remove mouse tracking motion values and effects
    // const mouseX = useMotionValue(0);
    // const mouseY = useMotionValue(0);

    // const bgX = useTransform(mouseX, [-100, 100], ["-30%", "30%"]);
    // const bgY = useTransform(mouseY, [-100, 100], ["-15%", "15%"]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 500); // Slight delay for animation

        return () => clearTimeout(timer);
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Remove mouse move and leave handlers
    // const handleMouseMove = (e) => {
    //     if (rightSplitRef.current) {
    //         const rect = rightSplitRef.current.getBoundingClientRect();
    //         const x = e.clientX - rect.left;
    //         const y = e.clientY - rect.top;
    //         const centerX = rect.width / 2;
    //         const centerY = rect.height / 2;
    //         const moveX = (x - centerX) / 15;
    //         const moveY = (y - centerY) / 15;
    //         const rotateX = (centerY - y) / 10;
    //         const rotateY = (x - centerX) / 10;

    //         setMousePosition({ moveX, moveY, rotateX, rotateY });
    //         mouseX.set(x - centerX);
    //         mouseY.set(y - centerY);
    //     }
    // };

    // const handleMouseLeave = () => {
    //     setMousePosition({ moveX: 0, moveY: 0, rotateX: 0, rotateY: 0 });
    //     mouseX.set(0);
    //     mouseY.set(0);
    // };

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
        <motion.div
            className="offset"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="Login">
                <div className="parent-container">
                    <motion.div className="split">
                        {/* Right Split with Image */}
                        <motion.div
                            ref={rightSplitRef}
                            className="split right Login-page"
                            variants={splitRightVariants}
                            initial="initial"
                            animate={loaded ? "animate" : "initial"}
                            exit="exit"
                            // Remove mouse event handlers and style
                            // onMouseMove={handleMouseMove}
                            // onMouseLeave={handleMouseLeave}
                            // style={{ perspective: 600 }}
                        >
                            <motion.div
                                className="content"
                                variants={imageVariants}
                                initial="initial"
                                animate={loaded ? "animate" : "initial"}
                                exit="exit"
                                // Remove transform style
                                // style={{
                                //     transform: `translate3d(${mousePosition.moveX}px, ${mousePosition.moveY}px, 0) perspective(600px) rotateX(${mousePosition.rotateX}deg) rotateY(${mousePosition.rotateY}deg)`,
                                // }}
                                whileHover="hover"
                            >
                                <img src={loginpic} alt="Community" className="loginpic" />
                            </motion.div>
                        </motion.div>

                        {/* Left Split with Form */}
                        <motion.div
                            ref={leftSplitRef}
                            className="split left Login-page"
                            initial="initial"
                            animate={loaded ? "animate" : "initial"}
                            exit="exit"
                        >
                            <div className="center">

                                {screenWidth <= 825 && (
                                    <motion.div className='content' variants={imageVariants}>
                                        <img src={loginpic} alt="Community" className="loginpic" />
                                    </motion.div>
                                 )}
                                <motion.div
                                    className="page-title"
                                    variants={titleVariants}
                                    initial="initial"
                                    animate={loaded ? "animate" : "initial"}
                                    exit="exit"
                                >
                                    <h2>Welcome Back!</h2>
                                </motion.div>

                                <div className="inputbox">
                                    <motion.input
                                        variants={inputVariants}
                                        initial="initial"
                                        animate={loaded ? "animate" : "initial"}
                                        exit="exit"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <motion.div style={{ position: 'relative' }}>
                                        <motion.input
                                            variants={inputVariants}
                                            initial="initial"
                                            animate={loaded ? "animate" : "initial"}
                                            exit="exit"
                                            type={passwordVisible ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                        <motion.button
                                            variants={togglePasswordVariants}
                                            initial="initial"
                                            animate={loaded ? "animate" : "initial"}
                                            exit="exit"
                                            type="button"
                                            className="toggle-password"
                                            onClick={togglePasswordVisibility}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            {passwordVisible ? "Hide" : "Show"}
                                        </motion.button>
                                    </motion.div>
                                </div>

                                <motion.button
                                    variants={submitButtonVariants}
                                    initial="initial"
                                    animate={loaded ? "animate" : "initial"}
                                    exit="exit"
                                    className="submit-button"
                                    type="submit"
                                    onClick={loginUser}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Login
                                </motion.button>

                                <motion.div
                                    className="border-line"
                                    variants={orLineVariants}
                                    initial="initial"
                                    animate={loaded ? "animate" : "initial"}
                                    exit="exit"
                                >
                                    <span>Or</span>
                                </motion.div>

                                <motion.div
                                    className="login-container"
                                    variants={loginContainerVariants}
                                    initial="initial"
                                    animate={loaded ? "animate" : "initial"}
                                    exit="exit"
                                >
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