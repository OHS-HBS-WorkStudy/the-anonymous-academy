import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  ErrorOutline as ErrorOutlineIcon,
  Visibility,
  VisibilityOff,
  LightbulbOutlined as LightbulbIcon,
  RocketLaunchOutlined as RocketIcon,
  StarBorderOutlined as StarIcon,
  AutoStories as AutoStoriesIcon,
  EmojiEventsOutlined as TrophyIcon,
  QuestionAnswerOutlined as ChatIcon,
} from '@mui/icons-material';

import LoadingScreen from '../../modules/Reply/GeneralLoadingScreen';
import defaultTheme from '../../theme';
import useNavigation from '../Nav Bars/useNavigation';
import { useLogin } from './useLogin';
import ThreeDBackground from './Left Animation/ThreeDBackground';

export default function Login() {
  const { goToSignUp } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    errors,
    loginUser,
    getInputProps,
    togglePasswordVisibility,
    showPassword,
  } = useLogin(defaultTheme);

  const isMobile = useMediaQuery(defaultTheme.breakpoints.down('md'));
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSceneReady, setIsSceneReady] = useState(false);

  const slogans = [
    { text: 'Your Knowledge Hub Awaits!', icon: <LightbulbIcon sx={{ fontSize: '3.5rem', mb: 1.5, color: 'white' }} /> },
    { text: 'Grow, Learn, Achieve Together.', icon: <RocketIcon sx={{ fontSize: '3.5rem', mb: 1.5, color: 'white' }} /> },
    { text: 'Unlock New Horizons Every Day.', icon: <StarIcon sx={{ fontSize: '3.5rem', mb: 1.5, color: 'white' }} /> },
    { text: 'Where Curiosity Meets Clarity.', icon: <AutoStoriesIcon sx={{ fontSize: '3.5rem', mb: 1.5, color: 'white' }} /> },
    { text: 'Connect, Share, and Learn.', icon: <ChatIcon sx={{ fontSize: '3.5rem', mb: 1.5, color: 'white' }} /> },
    { text: 'Empowering Your Success Journey.', icon: <TrophyIcon sx={{ fontSize: '3.5rem', mb: 1.5, color: 'white' }} /> },
  ];

  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setCurrentSloganIndex((i) => (i + 1) % slogans.length);
    }, 3500);
    return () => clearInterval(sloganInterval);
  }, []);

  const handleSubmit = () => loginUser({ email, password });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 20);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: defaultTheme.palette.background.alt,
        overflow: 'hidden',
        px: isMobile ? 0 : defaultTheme.spacing(4),
        py: defaultTheme.spacing(2),
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: isPageLoading ? 0 : 1 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            maxWidth: '1200px',
            minHeight: isMobile ? 'auto' : '650px',
            borderRadius: isMobile ? 0 : defaultTheme.shape.borderRadius,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            boxShadow: isMobile ? 'none' : '0px 15px 40px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Grid
            item
            sx={{
              flex: isMobile ? '1 1 auto' : '0 0 60%',
              background: `linear-gradient(135deg, ${defaultTheme.palette.primary.light}, ${defaultTheme.palette.primary.dark})`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: defaultTheme.spacing(isMobile ? 4 : 8),
              borderRadius: isMobile ? '0' : `${defaultTheme.shape.borderRadius}px 0 0 ${defaultTheme.shape.borderRadius}px`,
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '250px' : 'auto',
            }}
          >

            <ThreeDBackground
              primaryColor={defaultTheme.palette.primary.main}
              onSceneReady={setIsSceneReady}
            />

            <Box sx={{ zIndex: 1, textAlign: 'center', color: 'white' }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontSize: '2.5em',
                  color: 'white',
                  fontWeight: 750,
                  textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
                }}
              >
                Learn. Grow. Connect.
              </Typography>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSloganIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <Box sx={{ mb: 1 }}>{slogans[currentSloganIndex].icon}</Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      color: 'white',
                    }}
                  >
                    {slogans[currentSloganIndex].text}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Grid>

          <Grid
            item
            sx={{
              flex: isMobile ? '1 1 auto' : '0 0 40%',
              p: isMobile ? defaultTheme.spacing(4) : defaultTheme.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: defaultTheme.palette.background.paper,
              borderRadius: isMobile
                ? '0'
                : `0 ${defaultTheme.shape.borderRadius}px ${defaultTheme.shape.borderRadius}px 0`,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 800, color: defaultTheme.palette.primary.dark }}
            >
              Welcome Back!
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 400, mt: defaultTheme.spacing(3) }}>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 120, damping: 15, delay: 0.2 },
                }}
                style={{ marginBottom: defaultTheme.spacing(2) }}
              >
                <TextField
                  {...getInputProps('email', 'text', 'Email', EmailIcon)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: defaultTheme.shape.borderRadius * 2 } }}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      style={{
                        color: defaultTheme.palette.error.main,
                        fontSize: '0.75rem',
                        marginTop: defaultTheme.spacing(0.5),
                      }}
                    >
                      <ErrorOutlineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {errors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div style={{ marginBottom: defaultTheme.spacing(2) }}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: defaultTheme.shape.borderRadius * 2 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: defaultTheme.palette.action.active }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: defaultTheme.palette.text.secondary }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </motion.div>

              <AnimatePresence>
                {errors.login && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{
                      color: defaultTheme.palette.error.main,
                      fontSize: '0.8rem',
                      marginBottom: defaultTheme.spacing(2),
                    }}
                  >
                    <ErrorOutlineIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {errors.login}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  borderRadius: defaultTheme.shape.borderRadius * 2,
                  py: 1.75,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  mt: 2,
                }}
              >
                Login
              </Button>

              <Box mt={3} textAlign="center">
                <Typography variant="body2" color="textSecondary">
                  Don’t have an account?{' '}
                  <Typography
                    component={motion.span}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToSignUp}
                    sx={{
                      fontSize: '1em',
                      color: defaultTheme.palette.secondary.main,
                      fontWeight: 700,
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Join here
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );
}
