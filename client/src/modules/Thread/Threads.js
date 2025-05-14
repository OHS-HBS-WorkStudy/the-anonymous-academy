import useNavigation from '../useNavigation.js';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import TimeCounter from '../I-Candy/TimeCounter.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonWrapper = ({ children }) => (
    <div style={{ opacity: 0.7 }}>
        {children}
    </div>
);

export default function Threads({ thread }) {
    const { goToThread } = useNavigation();

    const [loggedInUser, setLoggedInUser] = useState(null);
    const sanitizedName = DOMPurify.sanitize(thread.thread_name);
    const sanitizedContents = DOMPurify.sanitize(thread.thread_contents);
    const userAccountType = thread?.user?.account_type || "Unknown";

    useEffect(() => {
        const foundUserGet = sessionStorage.getItem("foundUser");
        if (foundUserGet) {
            setLoggedInUser(JSON.parse(foundUserGet));
        }
    }, []);

    const updateRecentViewed = (threadId, threadTitle) => {
        const viewedThreadsJSON = sessionStorage.getItem('recentlyViewed');
        let viewedThreads = viewedThreadsJSON ? JSON.parse(viewedThreadsJSON) : [];

        const existingIndex = viewedThreads.findIndex(item => item.id === threadId);

        if (existingIndex !== -1) {
            const existingThread = viewedThreads.splice(existingIndex, 1)[0];
            viewedThreads.unshift(existingThread);
        } else {
            viewedThreads.unshift({ id: threadId, title: threadTitle });

            if (viewedThreads.length > 10) {
                viewedThreads.pop();
            }
        }
        sessionStorage.setItem('recentlyViewed', JSON.stringify(viewedThreads));
    };

    const handleThreadClick = () => {
        updateRecentViewed(thread.thread_id, thread.thread_name);
        goToThread(thread.thread_id);
    };

    function getTags() {
        let tags = thread.tags;
        if (tags.length === 0 || tags.length === null) {
            return <span className="grid-item-tags">#No Tags</span>
        } else {
            return (
                <div>
                    {tags.map((tag, index) => (
                        <span key={index} className="grid-item-tags">{tag}</span>
                    ))}
                </div>
            );
        }
    }

    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

    function userCheck(thread, foundUser) {
        if (foundUser?.email === thread?.user.email) {
            return "Posted by you";
        } else {
            return "Anonymous " + (thread.user.account_type || "Unknown User");
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, []);

    const threadVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        hover: {
            scale: 1.01,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    return (
        <motion.div 
            className="grid-item"
            onClick={!isLoading ? handleThreadClick : undefined}
            variants={threadVariants}
            initial="hidden"
            animate="visible"
            whileHover={!isLoading ? "hover" : undefined}
            whileTap={!isLoading ? "tap" : undefined}
            layout
        >
            <motion.div className="user-header">
                {isLoading ? (
                    <SkeletonWrapper>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Skeleton circle width={32} height={32} />
                            <Skeleton width={`${Math.floor(Math.random() * (220 - 100) + 100)}px`} height={24} style={{ marginRight: "auto" }} />
                            <Skeleton width={`${Math.floor(Math.random() * (140 - 60) + 60)}px`} height={20} />
                        </div>
                    </SkeletonWrapper>
                ) : (
                    <>
                        <motion.div 
                            className="user-avatar"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />
                        <motion.p className="username">{userCheck(thread, foundUser)}</motion.p>
                        <motion.p className="date-display">
                            {thread.created_at ? <TimeCounter date={thread.created_at} /> : "Unknown date"}
                        </motion.p>
                    </>
                )}
            </motion.div>

            <motion.div className="content-row">
                {isLoading ? (
                    <SkeletonWrapper>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div className="left-info" style={{gap: "0.5rem" }}>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} style={{ marginBottom: "1px" }}>
                                        <Skeleton width={55} height={20} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-content" style={{ width: "100%" }}>
                                <div style={{ 
                                    width: "100%",
                                    maxWidth: "100%",
                                    overflow: "hidden"
                                }}>
                                    <Skeleton width={`${Math.floor(Math.random() * (500 - 60) + 60)}px`} height={22} style={{ marginBottom: "0.5rem" }} />
                                    <Skeleton width={`${Math.floor(Math.random() * (600 - 75) + 75)}px`} height={20} style={{ marginBottom: "0.5rem" }} />
                                </div>
                                <div style={{ display: "flex", gap: "4px" }}>
                                    <Skeleton width={`${Math.floor(Math.random() * (80 - 40) + 40)}px`} height={21} />
                                    <Skeleton width={`${Math.floor(Math.random() * (75 - 35) + 35)}px`} height={21} />
                                    <Skeleton width={`${Math.floor(Math.random() * (85 - 45) + 45)}px`} height={21} />
                                </div>
                            </div>
                        </div>
                    </SkeletonWrapper>
                ) : (
                    <>
                        <motion.div className="left-info">
                            <motion.div 
                                className="vote-container"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div className="vote-counter">
                                    <motion.p animate={{ scale: [1, 1.2, 1] }}>0</motion.p>
                                </motion.div>
                                <motion.p className="vote-text">votes</motion.p>
                            </motion.div>

                            <motion.div 
                                className="replies-container"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div className="replies-counter">
                                    <motion.p animate={{ scale: [1, 1.2, 1] }}>0</motion.p>
                                </motion.div>
                                <motion.p className="replies-text">replies</motion.p>
                            </motion.div>

                            <motion.div 
                                className="views-container"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div className="views-counter">
                                    <motion.p animate={{ scale: [1, 1.2, 1] }}>0</motion.p>
                                </motion.div>
                                <motion.p className="views-text">views</motion.p>
                            </motion.div>
                        </motion.div>                            <motion.div className="text-content">
                            <motion.div 
                                className="grid-item-title" 
                                style={{
                                    display: "block"
                                }}
                                dangerouslySetInnerHTML={{ __html: sanitizedName }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                            <motion.div 
                                className="grid-item-desc" 
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    width: "100%",
                                    maxWidth: "100%"
                                }}
                                dangerouslySetInnerHTML={{ __html: sanitizedContents }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                            <motion.div 
                                className="grid-item-tags-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {getTags()}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}