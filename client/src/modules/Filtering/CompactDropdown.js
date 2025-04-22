import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dropdownVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      scaleY: { stiffness: 100, damping: 20 },
      opacity: { duration: 0.1 },
    },
    originY: 0,
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      scaleY: { stiffness: 100, damping: 20 },
      opacity: { duration: 0.1 },
    },
    originY: 0,
  },
};

const CompactDropdown = ({ name, options, onChange, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    onChange({ target: { name: name, value: value } });
    setIsOpen(false);
  };

  const displayedLabel = options.find((option) => option.value === selectedValue)?.label || "Select";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="compact-dropdown-container" ref={dropdownRef}>
      <motion.button
        className="compact-filter-button"
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{displayedLabel}</span> 
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 0 20 20"
          width="16px"
          fill="currentColor"
          className="dropdown-arrow"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="compact-dropdown-options"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {options.map((option) => (
              <motion.li key={option.value}>
                <motion.button
                  className="compact-dropdown-option-button"
                  onClick={() => handleOptionClick(option.value)}
                  whileHover={{ backgroundColor: '#f0f0f0' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompactDropdown;