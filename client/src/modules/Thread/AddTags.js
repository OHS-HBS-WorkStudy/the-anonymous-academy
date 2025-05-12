import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTag } from '@fortawesome/free-solid-svg-icons';

export default function AddTags({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");
  const [tagRemoving, setTagRemoving] = useState(null);

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const inputVariants = {
    initial: { scaleX: 0.95, opacity: 0.8 },
    animate: { scaleX: 1, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const tagVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: "easeInOut" } },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    const savedTags = sessionStorage.getItem("tags");
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, [setTags]);

  useEffect(() => {
    sessionStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const tagInputChange = (e) => {
    let value = e.target.value;
    const lastChar = value.slice(-1);

    if (lastChar === ',' && !value.endsWith(', ')) {
      setInputValue(value + ' #');
    } else if (!value.startsWith('#') && value.length > 0 && !value.includes('#')) {
      setInputValue('#' + value);
    } else {
      setInputValue(value);
    }
  };

  const enterCheck = (e) => {
    if (e.key === "Enter") {
      if (tags.length >= 10) {
        alert("You can only add up to 10 tags.");
        return;
      } else {
        processInputValue();
      }
    }
  };

  const processInputValue = () => {
      if (tags.length >= 10) {
        alert("You can only add up to 10 tags.");
        return;
      } else {
      const rawValue = inputValue.trim();
      if (rawValue.length > 1) {
        const newTagsFromInput = rawValue
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.startsWith('#') && tag.length > 1 && !tags.includes(tag));

        if (newTagsFromInput.length > 0) {
          const updatedTags = [...tags, ...newTagsFromInput];
          setTags(updatedTags);
          setInputValue("#");
        } else if (rawValue.includes(',')) {
          alert("One or more tags were either empty or already exist.");
        } else if (!rawValue.startsWith('#') || rawValue.length <= 1 || tags.includes(rawValue)) {
          alert("Tag must start with '#', be at least 2 characters long, and be unique.");
        }
      }
    }
  };

  const removeTag = (index) => {
    setTagRemoving(index);
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setTagRemoving(null);
  };

  const handleBlur = () => {
    if (inputValue.length > 1 && inputValue.includes(',')) {
      const rawValue = inputValue.trim();
      const newTagsFromInput = rawValue
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.startsWith('#') && tag.length > 1 && !tags.includes(tag));

      if (newTagsFromInput.length > 0) {
        const updatedTags = [...tags, ...newTagsFromInput];
        setTags(updatedTags);
        setInputValue("#");
      }
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
      <label htmlFor="tag-input" className="threadTag">
        <h1><FontAwesomeIcon icon={faTag}  className="fa-icon" /> Tags</h1>
      </label>
      <p className="subtext">Add relevant tags to categorize your thread (e.g., 'Algebra 2', 'Euro History'). Separate tags with commas or press Enter for each tag.</p>

      <div className="tag-input-container text-box ql-container">
        <motion.input
          id="tag-input"
          className="input-container"
          type="text"
          value={inputValue}
          onChange={tagInputChange}
          onKeyDown={enterCheck}
          onBlur={handleBlur}
          placeholder={inputValue === "#" ? "" : "Enter tag(s) with # or comma-separated"}
          variants={inputVariants}
          initial="initial"
          animate="animate"
        />

         <div className="charCounter">{tags.length}/10 tags limit</div>
      </div>

      <div className="tags-container">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.div
              key={index}
              className={`tag ${tagRemoving === index ? "removing" : ""}`}
              onClick={() => removeTag(index)}
              variants={tagVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
            >
              {tag}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}