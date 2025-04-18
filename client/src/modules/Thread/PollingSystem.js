import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PollingSystem({ question, options, pollId }) {
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [hasVoted, setHasVoted] = useState(false);

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const optionVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  const handleVote = (index) => {
    if (!hasVoted) {
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes);
      setHasVoted(true);

      sessionStorage.setItem(`poll_${pollId}_voted`, 'true');
      sessionStorage.setItem(`poll_${pollId}_votes`, JSON.stringify(newVotes));
    } else {
      alert('You have already voted!');
    }
  };

  useEffect(() => {
    const votedStatus = sessionStorage.getItem(`poll_${pollId}_voted`);
    if (votedStatus === 'true') {
      setHasVoted(true);
    }

    const storedVotes = sessionStorage.getItem(`poll_${pollId}_votes`);
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
      setHasVoted(true); 
    }
  }, [pollId]);

  const totalVotes = votes.reduce((sum, count) => sum + count, 0);

  return (
    <motion.div className="frontend-poll-container" variants={containerVariants} initial="initial" animate="animate">
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <motion.div
            key={index}
            className="poll-option"
            variants={optionVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleVote(index)}
            style={{ cursor: hasVoted ? 'default' : 'pointer' }}
          >
            <span>{option}</span>
            {hasVoted && (
              <div className="vote-count">
                ({votes[index]} votes - {totalVotes > 0 ? ((votes[index] / totalVotes) * 100).toFixed(1) : 0}%)
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {hasVoted && <p className="voted-message">You have already voted!</p>}
    </motion.div>
  );
}

export default PollingSystem;