import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { AddCircleOutline as AddIcon, RemoveCircleOutline as RemoveIcon } from '@mui/icons-material';

const StyledPollContainer = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.input,
    boxShadow: theme.shadows[1],
    transition: 'all 0.3s ease-in-out',
    '& fieldset': {
      borderColor: theme.palette.divider,
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.light,
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
}));

export default function CreatePoll({ onPollData }) {
  const theme = useTheme();
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeInOut' } },
  };

  const optionItemVariants = {
    initial: { opacity: 0, y: -5, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -5, scale: 0.95, transition: { duration: 0.15, ease: 'easeInOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const handleQuestionChange = (event) => {
    setPollQuestion(event.target.value);
    onPollData?.(event.target.value, pollOptions);
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...pollOptions];
    newOptions[index] = event.target.value;
    setPollOptions(newOptions);
    onPollData?.(pollQuestion, newOptions);
  };

  const addOption = () => {
    const newOptions = [...pollOptions, ''];
    setPollOptions(newOptions);
    onPollData?.(pollQuestion, newOptions);
  };

  const removeOption = (indexToRemove) => {
    if (pollOptions.length > 2) {
      const optionsBeforeRemoval = [...pollOptions];
      const newOptions = pollOptions.filter((_, i) => i !== indexToRemove);
      setPollOptions(optionsBeforeRemoval);
      setTimeout(() => {
        setPollOptions(newOptions);
        onPollData?.(pollQuestion, newOptions);
      }, optionItemVariants.exit.transition.duration * 1000);
    }
  };

  return (
    <StyledPollContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography variant="h6" htmlFor="pollQuestion" sx={{ mb: 1, color: theme.palette.text.primary }}>
          Poll Question
        </Typography>
        <motion.div variants={optionItemVariants} initial="initial" animate="animate">
          <StyledTextField
            fullWidth
            id="pollQuestion"
            placeholder="Enter your poll question"
            value={pollQuestion}
            onChange={handleQuestionChange}
            variant="outlined"
          />
        </motion.div>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.primary }}>
          Poll Options
        </Typography>
        <AnimatePresence>
          {pollOptions.map((option, index) => (
            <motion.div key={index} variants={optionItemVariants} initial="initial" animate="animate" exit="exit">
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: theme.spacing(1) }}>
                <StyledTextField
                  fullWidth
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                  variant="outlined"
                />
                {pollOptions.length > 2 && (
                  <IconButton
                    color="error"
                    onClick={() => removeOption(index)}
                    component={motion.button}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addOption}
          sx={{ mt: 2 }}
          component={motion.button}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Add Option
        </Button>
      </Box>
    </StyledPollContainer>
  );
}
