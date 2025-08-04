import React from 'react';
import { motion } from 'framer-motion';
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    ToggleButtonGroup,
    ToggleButton,
    Paper,
    CssBaseline,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';
import {
    Person as PersonIcon,
    DriveFileRenameOutline as SignatureIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    LockReset as LockResetIcon,
    QuestionAnswer as QuestionAnswerIcon,
    Forum as ForumIcon,
    LightbulbCircle as LightbulbCircleIcon,
} from '@mui/icons-material';

import defaultTheme from '../../theme';
import useNavigation from '../Nav Bars/useNavigation';
import { useSignUp } from './useSignUp';
import SignUpBackground from './SignUpBackground';
import GeneralLoadingScreen from '../../modules/Reply/GeneralLoadingScreen';
export default function SignUp() {
    const { goToLogin } = useNavigation();
    const {
        activeButton,
        loadingStep,
        getInputProps,
        handleButtonClick,
        createUser,
        containerVariants,
        itemVariants,
        statsBlockVariants, 
        formVariants,
        buttonGroupVariants,
        buttonItemVariants,
        submitButtonVariants,
        linkVariants,
    } = useSignUp(defaultTheme);

    const isMobile = useMediaQuery(defaultTheme.breakpoints.down('md'));

    const steps = [
        "Validating user info",
        "Creating account",
        "Finalizing setup"
    ];

    const leftPanelContentVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                ease: "easeOut",
                duration: 0.8,
                staggerChildren: 0.2,
            }
        },
    };

    const leftPanelItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeOut",
                duration: 0.6,
            }
        }
    };

    return (
        <>
         {loadingStep !== null && (
            <GeneralLoadingScreen steps={steps} currentStep={loadingStep} />
         )}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: defaultTheme.palette.background.default,
                    padding: isMobile ? '16px' : '32px', 
                    boxSizing: 'border-box',
                }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        height: '100%',
                        minHeight: isMobile ? 'auto' : 'calc(100vh - 64px)',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        overflow: 'hidden',
                        borderRadius: defaultTheme.shape.borderRadius,
                        boxShadow: isMobile ? '0' : defaultTheme.shadows[5], 
                    }}
                >
                    {!isMobile && (
                        <Grid
                            item
                            component={motion.div}
                            variants={leftPanelContentVariants}
                            sx={{
                            flex: "0 0 50%",
                            position: "relative",
                            borderRadius: `${defaultTheme.shape.borderRadius}px 0 0 ${defaultTheme.shape.borderRadius}px`,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: defaultTheme.palette.primary.contrastText,
                            }}
                        >
                            <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 0,
                            }}
                            >
                                <SignUpBackground />
                            </Box>

                            <Box
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                padding: defaultTheme.spacing(6),
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                height: "100%",
                                width: "100%",
                                textAlign: "center",
                                background: "rgba(0, 0, 0, 0.3)", // subtle dark overlay for contrast
                                borderRadius: `${defaultTheme.shape.borderRadius}px 0 0 ${defaultTheme.shape.borderRadius}px`,
                            }}
                            component={motion.div}
                            variants={leftPanelContentVariants}
                            >
                            <motion.div variants={leftPanelItemVariants}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                Join the Conversation!
                                </Typography>
                            </motion.div>
                            <motion.div variants={leftPanelItemVariants}>
                                <QuestionAnswerIcon sx={{ fontSize: "3rem", mb: 1 }} />
                                <Typography variant="h3">5M+</Typography>
                                <Typography variant="h6">Anonymous Questions</Typography>
                            </motion.div>
                            <motion.div variants={leftPanelItemVariants}>
                                <ForumIcon sx={{ fontSize: "3rem", mb: 1 }} />
                                <Typography variant="h3">10M+</Typography>
                                <Typography variant="h6">Community Answers</Typography>
                            </motion.div>
                            <motion.div variants={leftPanelItemVariants}>
                                <LightbulbCircleIcon sx={{ fontSize: "3rem", mb: 1 }} />
                                <Typography variant="h3">25K+</Typography>
                                <Typography variant="h6">Topics Explored</Typography>
                            </motion.div>
                            </Box>
                        </Grid>
                        )}

                    <Grid
                        item
                        sx={{
                            flex: '1',
                            padding: isMobile ? 4 : 8,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: defaultTheme.palette.background.paper,
                            overflowY: isMobile ? 'auto' : 'hidden',
                            borderRadius: `
                                ${isMobile ? defaultTheme.shape.borderRadius : 0}px
                                ${defaultTheme.shape.borderRadius}px
                                ${defaultTheme.shape.borderRadius}px
                                ${isMobile ? defaultTheme.shape.borderRadius : 0}px
                            `, 
                        }}
                    >
                        {isMobile && (
                            <motion.div variants={statsBlockVariants} style={{ marginBottom: defaultTheme.spacing(4) }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: defaultTheme.palette.primary.main }}>
                                    Join Our Thriving Community!
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <QuestionAnswerIcon sx={{ fontSize: '2rem', color: defaultTheme.palette.primary.main }} />
                                        <Typography variant="subtitle1">5M+</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <ForumIcon sx={{ fontSize: '2rem', color: defaultTheme.palette.primary.main }} />
                                        <Typography variant="subtitle1">10M+</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <LightbulbCircleIcon sx={{ fontSize: '2rem', color: defaultTheme.palette.primary.main }} />
                                        <Typography variant="subtitle1">25K+</Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        )}

                        <motion.div variants={formVariants} style={{ width: '100%', maxWidth: 400 }}>
                            <Typography
                                component={motion.h2}
                                variants={itemVariants}
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: defaultTheme.palette.primary.main,
                                    mb: 4,
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                Get Started Today!
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
                                    <TextField {...getInputProps("fname", "text", "First Name", PersonIcon)} fullWidth />
                                </motion.div>
                                <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
                                    <TextField {...getInputProps("lname", "text", "Last Name", SignatureIcon)} fullWidth />
                                </motion.div>
                                <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
                                    <TextField {...getInputProps("email", "email", "Email", EmailIcon)} fullWidth />
                                </motion.div>
                                <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
                                    <TextField {...getInputProps("password", "password", "Password", LockIcon)} fullWidth />
                                </motion.div>
                                <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
                                    <TextField {...getInputProps("reenteredPassword", "password", "Re-enter Password", LockResetIcon)} fullWidth />
                                </motion.div>
                            </Box>

                            <motion.div variants={buttonGroupVariants} style={{ marginBottom: 32 }}>
                                <ToggleButtonGroup
                                    value={activeButton}
                                    exclusive
                                    onChange={handleButtonClick}
                                    fullWidth
                                    sx={{
                                        backgroundColor: defaultTheme.palette.action.selected,
                                        borderRadius: defaultTheme.shape.borderRadius,
                                        p: 0.5,
                                    }}
                                >
                                    {["Student", "Parent", "Teacher"].map((role) => (
                                        <motion.div variants={buttonItemVariants} key={role} style={{ flexGrow: 1 }}>
                                            <ToggleButton value={role} sx={{ width: '100%' }}>
                                                {role}
                                            </ToggleButton>
                                        </motion.div>
                                    ))}
                                </ToggleButtonGroup>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    component={motion.button}
                                    variants={submitButtonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    onClick={() => createUser(goToLogin)}
                                    sx={{
                                        borderRadius: defaultTheme.shape.borderRadius,
                                        py: 1.5,
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        background: `linear-gradient(45deg, ${defaultTheme.palette.primary.light} 30%, ${defaultTheme.palette.primary.main} 90%)`,
                                        boxShadow: `0 8px 25px ${defaultTheme.palette.primary.light}40`,
                                        '&:hover': {
                                            background: `linear-gradient(45deg, ${defaultTheme.palette.primary.main} 30%, ${defaultTheme.palette.primary.dark} 90%)`,
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </motion.div>

                            <Box
                                component={motion.div}
                                variants={itemVariants}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    my: 3,
                                    '&::before, &::after': {
                                        content: '""',
                                        flexGrow: 1,
                                        height: '1px',
                                        backgroundColor: defaultTheme.palette.divider,
                                    },
                                    '& span': {
                                        px: 2,
                                        color: defaultTheme.palette.text.secondary,
                                        fontWeight: 500,
                                    },
                                }}
                            >
                                <span>Or</span>
                            </Box>

                            <motion.div variants={itemVariants}>
                                <Typography variant="body2" color="textSecondary">
                                    Already have an account?{' '}
                                    <Typography
                                        component={motion.span}
                                        variants={linkVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={goToLogin}
                                        sx={{
                                            fontSize: '1em',
                                            color: defaultTheme.palette.secondary.main,
                                            cursor: 'pointer',
                                            fontWeight: 700,
                                            '&:hover': { textDecoration: 'underline' },
                                        }}
                                    >
                                        Login here
                                    </Typography>
                                </Typography>
                            </motion.div>
                        </motion.div>
                    </Grid>
                </Paper>
            </motion.div>
        </>
    );
}