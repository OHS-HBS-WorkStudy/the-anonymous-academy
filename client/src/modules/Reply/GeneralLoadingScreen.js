import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export default function GeneralLoadingScreen({
  steps = [],
  currentStep = 0,
  fallbackMessage = "Loading...",
}) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const totalSteps = steps.length;
  const message = steps[currentStep] || fallbackMessage;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            userSelect: "none",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Step Timeline */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
              p: 3,
              width: "100%",
              maxWidth: 360,
              color: "#222",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textAlign: "center",
                mb: 2,
                color: "#333",
              }}
            >
              {message}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {steps.length > 0 ? (
                steps.map((step, index) => {
                  const isDone = index < currentStep;
                  const isActive = index === currentStep;

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {/* Dot indicator */}
                      <motion.div
                        animate={{
                          scale: isActive ? [1, 1.2, 1] : 1,
                          opacity: isDone || isActive ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          backgroundColor: isDone
                            ? theme.palette.primary.main
                            : isActive
                            ? "#222"
                            : "#bbb",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: isDone || isActive ? "#222" : "#999",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {step}
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <Typography variant="body1" sx={{ color: "#444" }}>
                  {fallbackMessage}
                </Typography>
              )}
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
