import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { LinearProgress, Box } from "@mui/material";

export default function LoadingScreen() {
  const colors = {
    background: "#f9fafb",
    primary: "#3b82f6",
    secondary: "#14b8a6",
    text: "#374151",
    progressBg: "#d1d5db",
    accent: "#f59e0b",
  };

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [boost, setBoost] = useState(0);
  const [funnyMessage, setFunnyMessage] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [achievement, setAchievement] = useState("");
  const [paused, setPaused] = useState(false);

  const progressTimerRef = useRef(null);
  const messageTimerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const coreOffsetX = useTransform(mouseX, (x) => (x / window.innerWidth) * 20 - 10);
  const coreOffsetY = useTransform(mouseY, (y) => (y / window.innerHeight) * 20 - 10);

  const loadingMessages = [
    "Gathering your questions...",
    "Connecting to the community...",
    "Organizing answers...",
    "Preparing your discussion space...",
    "Ensuring your anonymity...",
    "Loading helpful resources...",
    "Setting up safe environment...",
    "Finishing touches...",
  ];

  const funnyMessages = [
    "Oops… Starting over 🙃",
    "Did you just press that?! 😳",
    "Restarting the Q-niverse 🌌",
    "Guess we needed a refresh 🤷‍♂️",
    "You like clicking things, huh?",
    "There goes the progress 😬",
  ];

  const getAchievement = (count) => {
    if (count === 1) return "🥉 You broke it already?";
    if (count === 3) return "🥈 Persistent, huh?";
    if (count === 5) return "🥇 Ok now you're just trolling 😂";
    if (count === 10) return "👑 Welcome to the Chaos Club 👾";
    return "";
  };

  const startLoading = () => {
    const totalLoadingTime = 8000;
    const messageInterval = totalLoadingTime / loadingMessages.length;
    let currentProgress = 0;

    clearInterval(progressTimerRef.current);
    clearInterval(messageTimerRef.current);

    progressTimerRef.current = setInterval(() => {
      if (paused) return;
      currentProgress += 1 + boost;
      setBoost((b) => Math.max(0, b - 0.05));
      const newProgress = (currentProgress / (totalLoadingTime / 10)) * 100;
      setProgress(Math.min(100, newProgress));

      if (currentProgress * 10 >= totalLoadingTime) {
        clearInterval(progressTimerRef.current);
      }
    }, 10);

    messageTimerRef.current = setInterval(() => {
      if (!paused) {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }
    }, messageInterval);
  };

  useEffect(() => {
    startLoading();
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setCursor({ x: e.clientX - centerX, y: e.clientY - centerY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  const particleScatterFactor = Math.min(
    1,
    Math.sqrt(cursor.x * cursor.x + cursor.y * cursor.y) / 250
  );

  const handleCoreClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setPulse(true);
    setPaused(true);

    setProgress(0);
    setMessageIndex(0);

    const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setFunnyMessage(randomMsg);

    const achievementMsg = getAchievement(newCount);
    if (achievementMsg) {
      setAchievement(achievementMsg);
      setTimeout(() => setAchievement(""), 3000);
    }

    setTimeout(() => {
      setFunnyMessage("");
      setPulse(false);
      setPaused(false);
      startLoading();
    }, 300);
  };

  const getParticleStyle = (i) => ({
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: `rgba(59, 130, 246, 0.15)`,
    filter: "blur(0.6px)",
    pointerEvents: "none",
    top: `${(i * 3) % 90}%`,
    left: `${(i * 7) % 90}%`,
  });

  const geometricParticleAnim = {
    animate: (i) => ({
      x: [Math.random() * 200 * (0.5 + particleScatterFactor) - 100, 0],
      y: [Math.random() * 200 * (0.5 + particleScatterFactor) - 100, 0],
      opacity: [0.1, 0],
      transition: {
        delay: i * 0.1,
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    }),
  };

  const centralCoreAnim = {
    animate: pulse
      ? {
          scale: [1, 1.15, 1],
          boxShadow: [
            `0 0 30px ${colors.primary}`,
            `0 0 70px ${colors.secondary}`,
            `0 0 40px ${colors.primary}`,
          ],
          transition: { duration: 0.4, ease: "easeInOut" },
        }
      : {
          scale: [1, 1.02, 0.98, 1],
          boxShadow: [
            `0 0 10px ${colors.primary}60`,
            `0 0 25px ${colors.secondary}90`,
            `0 0 15px ${colors.primary}60`,
          ],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
  };

  const textAnim = {
    initial: { opacity: 0, y: 15, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -15,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "'Poppins', sans-serif",
        color: colors.text,
        userSelect: "none",
      }}
    >
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          custom={i}
          variants={geometricParticleAnim}
          animate="animate"
          style={getParticleStyle(i)}
        />
      ))}

      {/* Secret Click Count UI */}
      {clickCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: colors.accent,
            color: "white",
            padding: "6px 12px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "0.9rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          🎯 Clicks: {clickCount}
        </div>
      )}

      {/* Core */}
      <motion.div
        onClick={handleCoreClick}
        style={{
          width: 80,
          height: 80,
          backgroundColor: colors.primary,
          borderRadius: "20px 20px 20px 6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 36,
          fontWeight: "700",
          userSelect: "none",
          x: coreOffsetX,
          y: coreOffsetY,
        }}
        variants={centralCoreAnim}
        animate="animate"
        aria-label="Click to restart"
      >
        ?
      </motion.div>

      <AnimatePresence>
        {funnyMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ marginTop: 16, color: colors.accent, fontWeight: 600 }}
          >
            {funnyMessage}
          </motion.div>
        )}
        {achievement && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ marginTop: 8, fontSize: "1rem", fontWeight: "bold" }}
          >
            {achievement}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Text & Bar */}
      <Box
        sx={{
          marginTop: 4,
          width: "60vw",
          maxWidth: 400,
          textAlign: "center",
          fontSize: "1.25rem",
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        <motion.div
          key={messageIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textAnim}
        >
          {loadingMessages[messageIndex]}
        </motion.div>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            marginTop: 2,
            height: 8,
            borderRadius: 5,
            backgroundColor: colors.progressBg,
            "& .MuiLinearProgress-bar": {
              backgroundColor: colors.primary,
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
