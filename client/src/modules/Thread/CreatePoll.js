import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

function CreatePoll({ onPollData }) {
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const inputVariants = {
    initial: { scaleX: 0.95, opacity: 0.8 },
    animate: { scaleX: 1, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const optionVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.15, ease: "easeInOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleQuestionChange = (event) => {
    setPollQuestion(event.target.value);
    if (onPollData) {
      onPollData(event.target.value, pollOptions);
    }
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...pollOptions];
    newOptions[index] = event.target.value;
    setPollOptions(newOptions);
    if (onPollData) {
      onPollData(pollQuestion, newOptions);
    }
  };

  const addOption = () => {
    const newOptions = [...pollOptions, ''];
    setPollOptions(newOptions);
    if (onPollData) {
      onPollData(pollQuestion, newOptions);
    }
  };

  const removeOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
      if (onPollData) {
        onPollData(pollQuestion, newOptions);
      }
    } else {
      alert('A poll must have at least two options.');
    }
  };

  return (
    <motion.div
      className="fill"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="poll-creation"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <label htmlFor="pollQuestion" className="threadDir">
          <h1>Poll Question</h1>
        </label>
        <motion.input
          type="text"
          id="pollQuestion"
          className="new-input-container1"
          placeholder="Enter your poll question"
          value={pollQuestion}
          onChange={handleQuestionChange}
          variants={inputVariants}
          initial="initial"
          animate="animate"
        />

        <label className="threadDir">
          <h1>Poll Options</h1>
        </label>
        <AnimatePresence>
          {pollOptions.map((option, index) => (
            <motion.div
              key={index}
              className="poll-option-input"
              variants={optionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.input
                type="text"
                className="new-input-container1"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(event) => handleOptionChange(event, index)}
                variants={inputVariants}
                initial="initial"
                animate="animate"
              />
              {pollOptions.length > 2 && (
                <motion.button
                  type="button"
                  onClick={() => removeOption(index)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className='remove-btn'
                >
                  Remove
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={addOption}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Add Option
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default CreatePoll;