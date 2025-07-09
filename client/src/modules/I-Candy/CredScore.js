import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// MUI Imports
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Placeholder FullCircle component (you should replace this with your actual gauge component)
const FullCircle = ({ score, isUnknown }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    style={{
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: isUnknown ? '#ccc' : '#2196f3',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 'bold',
    }}
  >
    {isUnknown ? '?' : score}
  </motion.div>
);

// Styled container
const CredScoreContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  maxWidth: 300,
  margin: '0 auto',
}));

// --- Component ---
export default function CredScore({ rawScore = null }) {
  const theme = useTheme();
  const unknownFallback = 90;

  // Inflation score logic
  const inflateScore = (input) => {
    const num = parseInt(input, 10);
    return isNaN(num) ? null : Math.min(Math.max(num + 90, 0), 180); // Clamp between 0 and 180
  };

  const inflationScore = inflateScore(rawScore);

  const [score, setScore] = useState(inflationScore);

  useEffect(() => {
    setScore(inflationScore);
  }, [inflationScore]);

  return (
    <CredScoreContainer>
      {score !== null ? (
        <FullCircle score={score} />
      ) : (
        <Box textAlign="center">
          <FullCircle score={unknownFallback} isUnknown />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Score Unavailable
          </Typography>
        </Box>
      )}
    </CredScoreContainer>
  );
}
