import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const StyledVoteBox = styled(motion(Box))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.background.default,
  minWidth: '50px',
  border: `1px solid ${theme.palette.divider}`,
}));

export default function ReplyVote() {
  const theme = useTheme();
  const [selectedVote, setSelectedVote] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

  const buttonVariants = {
    rest: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.9, opacity: 0.9 },
    selected: { scale: 1.05, opacity: 1 },
  };

  const voteNumberVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.15, ease: "easeIn" } },
  };

  const handleVote = (voteType) => {
    setVoteCount(prevCount => {
      let newCount = prevCount;

      if (selectedVote === voteType) {
        setSelectedVote(null);
        newCount = voteType === 'up' ? newCount - 1 : newCount + 1;
      } else {
        if (selectedVote === 'up') newCount -= 1;
        else if (selectedVote === 'down') newCount += 1;

        setSelectedVote(voteType);
        newCount = voteType === 'up' ? newCount + 1 : newCount - 1;
      }

      return newCount;
    });
  };

  return (
    <StyledVoteBox
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
    >
      <IconButton
        color={selectedVote === 'up' ? 'primary' : 'default'}
        onClick={() => handleVote('up')}
        component={motion.button}
        variants={buttonVariants}
        initial="rest"
        animate={selectedVote === 'up' ? "selected" : "rest"}
        whileHover="hover"
        whileTap="tap"
        aria-label="upvote"
        sx={{
          '&:hover': {
            backgroundColor: selectedVote === 'up'
              ? theme.palette.primary.light
              : 'rgba(0, 0, 0, 0.04)',
          },
          transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
        }}
      >
        <ArrowUpwardIcon fontSize="medium" />
      </IconButton>

      <AnimatePresence mode="wait">
        <motion.div
          key={voteCount}
          variants={voteNumberVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              fontWeight: 'bold',
              color:
                voteCount > 0
                  ? theme.palette.success.main
                  : voteCount < 0
                  ? theme.palette.error.main
                  : theme.palette.text.primary,
              my: 0.5,
            }}
          >
            {voteCount}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <IconButton
        color={selectedVote === 'down' ? 'error' : 'default'}
        onClick={() => handleVote('down')}
        component={motion.button}
        variants={buttonVariants}
        initial="rest"
        animate={selectedVote === 'down' ? "selected" : "rest"}
        whileHover="hover"
        whileTap="tap"
        aria-label="downvote"
        sx={{
          '&:hover': {
            backgroundColor: selectedVote === 'down'
              ? theme.palette.error.light
              : 'rgba(0, 0, 0, 0.04)',
          },
          transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
        }}
      >
        <ArrowDownwardIcon fontSize="medium" />
      </IconButton>
    </StyledVoteBox>
  );
}
