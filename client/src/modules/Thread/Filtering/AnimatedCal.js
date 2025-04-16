import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const dropdownVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
    display: "block",
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
    transitionEnd: { display: "none" },
  },
};

function AnimatedDatePicker({ label = "Select date", name, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const ref = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: date, name } });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="animated-date-picker" ref={ref}>
      <motion.div className="date-trigger" onClick={toggleOpen} whileTap={{ scale: 0.98 }}>
        {selectedDate ? selectedDate.toDateString() : label}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 0 20 20"
          width="16px"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </motion.div>
      <motion.div
        className="calendar-dropdown"
        variants={dropdownVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{ originY: "top" }}
      >
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </motion.div>
    </div>
  );
}

export default AnimatedDatePicker;
