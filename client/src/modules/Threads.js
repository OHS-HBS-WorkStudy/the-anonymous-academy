import useNavigation from '../modules/useNavigation.js';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import TimeCounter from './I-Candy/TimeCounter.js';

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

    return (
        <div className="grid-item" onClick={handleThreadClick}>
            <div className="user-header">
                <div className="user-avatar"></div>
                <p className="username">{userCheck(thread, foundUser)}</p>
                <p className="date-display">
                    {thread.created_at ? <TimeCounter date={thread.created_at} /> : "Unknown date"}
                </p>
            </div>

            <div className="content-row">
                <div className="left-info">
                    <div className="vote-container">
                        <div className="vote-counter">
                            <p>0</p>
                        </div>
                        <p className="vote-text">votes</p>
                    </div>

                    <div className="replies-container">
                        <div className="replies-counter">
                            <p>0</p>
                        </div>
                        <p className="replies-text">replies</p>
                    </div>

                    <div className="views-container">
                        <div className="views-counter">
                            <p>0</p>
                        </div>
                        <p className="views-text">views</p>
                    </div>
                </div>

                <div className="text-content">
                    <div className="grid-item-title" dangerouslySetInnerHTML={{ __html: sanitizedName }} />
                    <div className="grid-item-desc" dangerouslySetInnerHTML={{ __html: sanitizedContents }} />


                    <div className="grid-item-tags-container">
                        {getTags()}
                    </div>
                </div>
            </div>
        </div>
    );
}