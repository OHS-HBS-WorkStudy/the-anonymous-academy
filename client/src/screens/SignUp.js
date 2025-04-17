// Library declaration imports
import { useState} from 'react';
import { motion } from 'framer-motion';

// Other modules components imports
import useNavigation from '../modules/useNavigation';
import signuppic from '../img/signpic.png';

const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut", delayChildren: 0.4, staggerChildren: 0.1 } },
};

const splitRightVariants = {
    initial: { opacity: 0, x: "50vw", rotate: 10, zIndex: -2, },
    animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// const splitLeftVariants = {
//     initial: { opacity: 0, x: -50 },
//     animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

const imageVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

const titleVariants = {
    initial: { opacity: 0, y: -30, skewY: 5 },
    animate: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
};

const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonGroupVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
    initial: { scale: 0.9 },
    hover: { scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
};

const submitButtonVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5,ease: "easeOut", delay: 0.6 } },
    hover: { scale: 1.05, backgroundColor: "#007bff", color: "white", boxShadow: "0px 7px 12px rgba(0, 0, 0, 0.25)" },
    tap: { scale: 0.98 },
};

const orLineVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.7 } },
};

const loginContainerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.8 } },
};

const fadeVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.8 } },
}

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