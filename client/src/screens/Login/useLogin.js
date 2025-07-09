import { useState, useEffect } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material"; 
import useNavigation from '../Nav Bars/useNavigation';

export const useLogin = (theme) => { 
    const [loaded, setLoaded] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({ password: false });
    const [errors, setErrors] = useState({});

    const { goToHome } = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const togglePasswordVisibility = (inputId) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [inputId]: !prev[inputId],
        }));
    };

    const validateInputs = (email, password) => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        return newErrors;
    };

    const loginUser = ({ email, password }) => {
        const newErrors = validateInputs(email, password);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const users = JSON.parse(sessionStorage.getItem("user") || "[]");
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
    };

    const getInputProps = (id, type, label, IconComponent) => {
        const isPassword = id === "password";
        const inputType = isPassword ? (passwordVisibility[id] ? "text" : "password") : type;

        return {
            id,
            label,
            type: inputType,
            error: !!errors[id],
            helperText: errors[id],
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start" sx={{ color: theme.palette.text.secondary }}>
                        <IconComponent />
                    </InputAdornment>
                ),
                endAdornment: isPassword && (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => togglePasswordVisibility(id)}
                            edge="end"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {passwordVisibility[id] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }
        };
    };

    return {
        loaded,
        errors,
        loginUser,
        getInputProps,
        passwordVisibility,
        togglePasswordVisibility,
    };
};
