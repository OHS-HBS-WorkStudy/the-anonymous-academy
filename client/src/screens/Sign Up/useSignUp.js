import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import defaultTheme from '../../theme';

export const useSignUp = (theme) => {
  const [activeButton, setActiveButton] = useState("Student");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    reenteredPassword: false
  });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    reenteredPassword: '',
  });
  
  // New state to track loading steps:
  const [loadingStep, setLoadingStep] = useState(null);

  const togglePasswordVisibility = (inputId) => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [inputId]: !prevState[inputId]
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: undefined }));
    }
  };

  const handleButtonClick = (event, newButtonType) => {
    if (newButtonType !== null) {
      setActiveButton(newButtonType);
    }
  };

  const validateFields = () => {
    const { fname, lname, email, password, reenteredPassword } = formData;
    const newErrors = {};
    let users = [];
    try {
      users = JSON.parse(sessionStorage.getItem("user")) || [];
    } catch (e) {
      console.error("Error parsing user data from session storage:", e);
      users = [];
    }

    if (!fname) newErrors.fname = "First name is required.";
    if (!lname) newErrors.lname = "Last name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    } else if (users.some(u => u.email === email)) {
      newErrors.email = "Email already exists.";
    }

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
      newErrors.reenteredPassword = "Re-entering password is required.";
    } else if (password !== reenteredPassword) {
      newErrors.reenteredPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create user function now async and uses loadingStep
  const createUser = async (onSuccess) => {
    if (!validateFields()) return;

    const steps = [
      "Validating user info",
      "Creating account",
      "Finalizing setup"
    ];

    setLoadingStep(0);
    try {
      // Step 1: Simulate user info validation (could be async)
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate delay
      setLoadingStep(1);

      // Step 2: Create account (simulate async storage)
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      let users = [];
      try {
        users = JSON.parse(sessionStorage.getItem("user")) || [];
      } catch (e) {
        console.error("Error parsing user data from session storage:", e);
        users = [];
      }
      
      const { fname, lname, email, password } = formData;
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
      setLoadingStep(2);

      // Step 3: Final setup (simulate delay)
      await new Promise(resolve => setTimeout(resolve, 600));

      setLoadingStep(null); // done
      setActiveButton("Student");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setLoadingStep(null);
      console.error(error);
      // Optionally set error states here
    }
  };

  const getInputProps = (id, type, label, IconComponent) => {
    const isPasswordToggle = id === "password" || id === "reenteredPassword";
    const inputType = isPasswordToggle ? (passwordVisibility[id] ? "text" : "password") : type;

    return {
      id,
      label,
      type: inputType,
      variant: "outlined",
      fullWidth: true,
      value: formData[id],
      onChange: handleInputChange,
      error: !!errors[id],
      helperText: errors[id],
      InputProps: {
        startAdornment: (
          <InputAdornment position="start" sx={{ color: theme.palette.text.secondary }}>
            <IconComponent />
          </InputAdornment>
        ),
        endAdornment: isPasswordToggle && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => togglePasswordVisibility(id)}
              edge="end"
              sx={{ color: theme.palette.text.secondary }}
            >
              {passwordVisibility[id] ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
      sx: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    };
  };

  // (Your existing variants unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const statsBlockVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const formVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.2 } },
  };

  const buttonGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.6, staggerChildren: 0.1 } },
  };

  const buttonItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const submitButtonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' },
    tap: { scale: 0.95 },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: defaultTheme.palette.secondary.main },
    tap: { scale: 0.95 },
  };

  return {
    activeButton,
    formData,
    errors,
    loadingStep,              // expose loadingStep so UI can show loading screen
    handleButtonClick,
    getInputProps, 
    createUser,
    containerVariants,
    itemVariants,
    statsBlockVariants,
    formVariants,
    buttonGroupVariants,
    buttonItemVariants,
    submitButtonVariants,
    linkVariants,
  };
};
