import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] } },
};

const optionVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.68, -0.55, 0.265, 1.55] } },
  hover: { scale: 1.02, transition: { duration: 0.15 } },
  tap: { scale: 0.98 },
};

function PollingSystem({ question, options, pollId }) {
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [hasVoted, setHasVoted] = useState(null); // Store the index of the voted option

  const handleVote = (index) => {
    if (hasVoted === null) {
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes);
      setHasVoted(index); // Set the index of the voted option
      sessionStorage.setItem(`poll_${pollId}_voted`, 'true');
      sessionStorage.setItem(`poll_${pollId}_voteIndex`, index.toString()); // Store the voted index
      sessionStorage.setItem(`poll_${pollId}_votes`, JSON.stringify(newVotes));
    } else {
      alert('You\'ve already cast your vote!');
    }
  };

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

  const totalVotes = votes.reduce((sum, count) => sum + count, 0);

  return (
    <motion.div
      className="modern-poll-container"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <h2 className="poll-question">{question}</h2>
      <div className="poll-options-grid">
        {options.map((option, index) => (
          <motion.button
            key={index}
            className={`poll-option-button ${hasVoted !== null ? (hasVoted === index ? 'voted' : 'not-voted') : ''}`}
            variants={optionVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleVote(index)}
            disabled={hasVoted !== null}
          >
            <span className="option-label">{option}</span>
            {hasVoted !== null && (
              <span className="vote-percentage">
                {totalVotes > 0 ? `${((votes[index] / totalVotes) * 100).toFixed(1)}%` : '0%'}
              </span>
            )}
            {hasVoted !== null && <span className="vote-count-pill">{votes[index]}</span>}
          </motion.button>
        ))}
      </div>
      {hasVoted !== null && <motion.div className="voted-banner" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>Thanks for voting!</motion.div>}
    </motion.div>
  );
}

export default PollingSystem;