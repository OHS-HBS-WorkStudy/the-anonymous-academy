import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BentoBox from '../modules/BentoBox.js';
import Threads from '../modules/Thread/Threads.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    let data = JSON.parse(sessionStorage.getItem("data")) || {};
    let recieveThread = data || [];
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

    // State to toggle watched tags visibility (now controls the sliding)
    const [isTagsOpen, setIsTagsOpen] = useState(false);

    // Toggle visibility handler (now controls the sliding)
    const toggleTagsVisibility = () => {
        setIsTagsOpen((prevState) => !prevState);
    };

    return (
        <div className="offset">
            <div className="Home">
                <div className="container1">
                    <motion.div
                        className="welcomeSection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1>
                            <span className="welcome-text">Welcome back, </span>
                            <span className="user-name">{foundUser?.first_name} {foundUser?.last_name}</span>
                        </h1>
                        <p className="welcome-subtitle">Explore discussions and share your knowledge</p>
                    </motion.div>

                    <BentoBox />

                    <div className="home-content-area">
                        <div className="grid-container-area">
                            <motion.div
                                className="thread-list-container"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="section-header">
                                    <h2>Posts of Interest</h2>
                                    <div className="section-divider"></div>
                                </div>
                                {recieveThread && recieveThread.length > 0 ? (
                                    <div className="threads-grid">
                                        {recieveThread.map((thread, index) => (
                                            <motion.div
                                                key={thread.thread_id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <Threads thread={thread} />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                   <motion.div
                                    className="no-threads-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="message-icon">📫</span>
                                    <p>Insufficient data available at the moment.</p>
                                    <p className="sub-message">Please engage with additional threads to generate more data.</p>
                                </motion.div>

                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            className="right-space-area"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                        </motion.div>
                    </div>
                </div>

                {/* Fixed position watch tags panel */}
                <motion.div
                    className={`trending-threads-cont ${isTagsOpen ? 'open' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="section-header">
                        <h3>Watched Tags</h3>
                        <div className="section-divider"></div>
                    </div>
                    <div className="tags-search">
                        <input
                            type="text"
                            placeholder="Enter tags to watch..."
                            className="watched-tags-input"
                            disabled
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    <div className="watched-tags-list">
                        {['javascript', 'design', 'ai'].map((tag, index) => (
                            <motion.span
                                key={tag}
                                className="watched-tag"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ y: -2, scale: 1.05 }}
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Fixed position toggle button */}
                <div className="toggle-tags-button-container">
                    <button
                        className="toggle-tags-button"
                        onClick={toggleTagsVisibility}
                        aria-label={isTagsOpen ? "Close tags panel" : "Open tags panel"}
                    >
                        <FontAwesomeIcon icon={isTagsOpen ? faChevronRight : faChevronLeft} />
                    </button>
                </div>
            </div>
        </div>
    );
}