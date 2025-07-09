import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const StyledPollContainer = styled(motion(Box))(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflow: 'hidden',
}));

const PollOptionButton = styled(motion(Button))(({ theme, isVoted, isSelected }) => ({
  width: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  minHeight: '56px',
  fontSize: '1rem',
  fontWeight: theme.typography.fontWeightMedium,
  position: 'relative',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    boxShadow: theme.shadows[1],
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
  ...(isVoted && {
    color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
    borderColor: isSelected ? theme.palette.primary.dark : theme.palette.divider,
    boxShadow: isSelected ? theme.shadows[2] : 'none',
    cursor: 'default',
    pointerEvents: 'none',
    '&:hover': {
      backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
      boxShadow: isSelected ? theme.shadows[2] : 'none',
    },
  }),
}));

const StyledLinearProgress = styled(motion(LinearProgress))(({ theme, isSelected }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: theme.shape.borderRadius,
  zIndex: 0,
  '& .MuiLinearProgress-bar': {
    backgroundColor: isSelected ? theme.palette.primary.light : theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
  },
  '&.MuiLinearProgress-root': {
    backgroundColor: 'transparent',
  },
}));

function PollingSystem({ question, options, pollId }) {
  const theme = useTheme();
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [hasVoted, setHasVoted] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const votedStatus = sessionStorage.getItem(`poll_${pollId}_voted`);
    const storedVoteIndex = sessionStorage.getItem(`poll_${pollId}_voteIndex`);
    if (votedStatus === 'true' && storedVoteIndex !== null) {
      setHasVoted(parseInt(storedVoteIndex, 10));
    }
    const storedVotes = sessionStorage.getItem(`poll_${pollId}_votes`);
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
  }, [pollId]);

  const handleVote = (index) => {
    if (hasVoted === null) {
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes);
      setHasVoted(index);
      sessionStorage.setItem(`poll_${pollId}_voted`, 'true');
      sessionStorage.setItem(`poll_${pollId}_voteIndex`, index.toString());
      sessionStorage.setItem(`poll_${pollId}_votes`, JSON.stringify(newVotes));
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const totalVotes = votes.reduce((sum, count) => sum + count, 0);

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] } },
  };

  const optionButtonVariants = {
    rest: { scale: 1, boxShadow: theme.shadows[1] },
    hover: { scale: 1.02, boxShadow: theme.shadows[3] },
    tap: { scale: 0.98, boxShadow: theme.shadows[1] },
  };

  const percentageTextVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  return (
    <StyledPollContainer variants={containerVariants} initial="initial" animate="animate">
      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
        {question}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1.5) }}>
        <AnimatePresence>
          {options.map((option, index) => {
            const percentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
            const isSelected = hasVoted === index;
            const isVotedState = hasVoted !== null;

            return (
              <PollOptionButton
                key={index}
                isVoted={isVotedState}
                isSelected={isSelected}
                onClick={() => handleVote(index)}
                disabled={isVotedState}
                variants={optionButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                animate={isVotedState ? { scale: 1, boxShadow: isSelected ? theme.shadows[2] : 'none' } : "rest"}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '& .MuiButton-startIcon, & .MuiButton-endIcon, & .MuiButton-label': {
                    zIndex: 1,
                  },
                }}
              >
                {isVotedState && (
                  <StyledLinearProgress
                    variant="determinate"
                    value={percentage}
                    isSelected={isSelected}
                    component={motion.div}
                    initial={{ width: '0%' }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {option}
                  </Typography>
                  {isVotedState && (
                    <motion.div variants={percentageTextVariants} initial="hidden" animate="visible">
                      <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                        {`${percentage.toFixed(1)}% (${votes[index]})`}
                      </Typography>
                    </motion.div>
                  )}
                </Box>
              </PollOptionButton>
            );
          })}
        </AnimatePresence>
      </Box>

      <AnimatePresence>
        {hasVoted !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Alert severity="success" sx={{ borderRadius: theme.shape.borderRadius, mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium', color: theme.palette.success.dark }}>
                Thanks for voting! Your vote has been recorded.
              </Typography>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%', borderRadius: theme.shape.borderRadius }}>
          You've already cast your vote!
        </Alert>
      </Snackbar>
    </StyledPollContainer>
  );
}

export default PollingSystem;
