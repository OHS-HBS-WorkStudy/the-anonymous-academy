import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateThreadAside({ ruleAgreement, setRuleAgreement }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleGeneral = () => {
    setOpenDropdown(openDropdown === 'general' ? null : 'general');
  };

  const toggleCommunication = () => {
    setOpenDropdown(openDropdown === 'communication' ? null : 'communication');
  };

  const toggleContent = () => {
    setOpenDropdown(openDropdown === 'content' ? null : 'content');
  };

  const containerVariants = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const contentVariants = {
    open: {
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <aside>
      <motion.div
        className="threadRules"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* General Guidelines Section */}
        <div onClick={toggleGeneral} className="dropdown">
          <motion.h2
            className="dropdown-title"
            animate={{ color: openDropdown === 'general' ? 'var(--clr-primary-a50)' : 'var(--color-text-tertiary)' }}
            transition={{ duration: 0.3 }}
            style={{ flexGrow: 1 }}
          >
            General Guidelines
          </motion.h2>
          <motion.svg
            animate={{ rotate: openDropdown === 'general' ? 0 : 90 }}
            transition={{ duration: 0.1 }}
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            viewBox="0 0 20 20"
            width="16px"
            fill="currentColor"
            className="dropdown-arrow"
            style={{ marginLeft: 'auto' }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </div>
        <AnimatePresence>
          {openDropdown === 'general' && (
            <motion.div
              className="dropdown-options-wrapper"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ originY: "top", overflow: "hidden" }}
            >
              <div className="dropdown-content">
                <p>
                  These are the general rules to keep in mind when creating a thread.
                </p>
                <ul>
                  <li>
                    <strong>Strict Topic Adherence:</strong> Threads must remain strictly on topic. Off-topic posts will be removed.
                  </li>
                  <li>
                    <strong>Constructive Contributions Only:</strong> Only helpful and constructive questions and information are permitted.
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Communication Guidelines Section */}
        <div onClick={toggleCommunication} className="dropdown">
          <motion.h2
            className="dropdown-title"
            animate={{ color: openDropdown === 'communication' ? 'var(--clr-primary-a50)' : 'var(--color-text-tertiary)' }}
            transition={{ duration: 0.3 }}
            style={{ flexGrow: 1 }}
          >
            Communication Guidelines
          </motion.h2>
          <motion.svg
            animate={{ rotate: openDropdown === 'communication' ? 0 : 90 }}
            transition={{ duration: 0.1 }}
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            viewBox="0 0 20 20"
            width="16px"
            fill="currentColor"
            className="dropdown-arrow"
            style={{ marginLeft: 'auto' }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </div>
        <AnimatePresence>
          {openDropdown === 'communication' && (
            <motion.div
              className="dropdown-options-wrapper"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ originY: "top", overflow: "hidden" }}
            >
              <div className="dropdown-content">
                <p>These rules are for how you communicate with other users.</p>
                <ul>
                  <li>
                    <strong>Respectful Communication:</strong> Absolutely no personal attacks, insults, or harassment. Treat all users with the utmost respect.
                  </li>
                  <li>
                    <strong>No Swearing or Foul Language:</strong> Profanity or offensive language is strictly forbidden.
                  </li>
                  <li>
                    <strong>Zero Tolerance for Bullying:</strong> Bullying, intimidation, or any harmful behavior will not be tolerated.
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Guidelines Section */}
        <div onClick={toggleContent} className="dropdown">
          <motion.h2
            className="dropdown-title"
            animate={{ color: openDropdown === 'content' ? 'var(--clr-primary-a50)' : 'var(--color-text-tertiary)' }}
            transition={{ duration: 0.3 }}
            style={{ flexGrow: 1 }}
          >
            Content Guidelines
          </motion.h2>
          <motion.svg
            animate={{ rotate: openDropdown === 'content' ? 0 : 90 }}
            transition={{ duration: 0.1 }}
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            viewBox="0 0 20 20"
            width="16px"
            fill="currentColor"
            className="dropdown-arrow"
            style={{ marginLeft: 'auto' }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </div>
        <AnimatePresence>
          {openDropdown === 'content' && (
            <motion.div
              className="dropdown-options-wrapper"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ originY: "top", overflow: "hidden" }}
            >
              <div className="dropdown-content">
                <p>These rules are for the type of content you post.</p>
                <ul>
                  <li>
                    <strong>No Spam or Self-Promotion:</strong> Avoid posting irrelevant links or excessive self-promotional content.
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agreement Section */}
        <div className="agree-portion">
          <p style={{ marginTop: "15px" }}>
            By creating a thread, you <b>explicitly agree</b> to these strict guidelines. Failure to comply will result in immediate moderation actions.
          </p>
          <label className="rule-checkbox" style={{ marginTop: "15px" }}>
            <input
              type="checkbox"
              checked={ruleAgreement}
              onChange={() => setRuleAgreement(!ruleAgreement)}
              required
            />
            <span className="required">
              <b> I have read and agreed to the thread creation guidelines.</b>
            </span>
          </label>
        </div>
      </motion.div>
    </aside>
  );
}
