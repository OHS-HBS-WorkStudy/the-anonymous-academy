import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  open: { scaleY: 1, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  closed: { scaleY: 0, opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

const optionVariants = {
  hover: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.98 },
};


function AnimatedDropdown({ label, name, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value, name } }); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="animated-dropdown" ref={dropdownRef}>
      <motion.div
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={toggleOpen}
        whileTap={{ scale: 0.98 }}
      >
        {selectedValue || label || "Select an option..."}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 0 20 20"
          width="16px"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </motion.div>
      <motion.div
        className="dropdown-options"
        variants={dropdownVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{ originY: "top" }}
      >
        {options.map((option) => (
          <motion.p
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            variants={optionVariants}
            whileHover={{ scale: 1.02 }}
            whileTap="tap"
          >
            {option.label}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

export default AnimatedDropdown;