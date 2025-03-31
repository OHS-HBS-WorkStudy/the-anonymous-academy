import useNavigation from '../modules/useNavigation.js';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export default function Threads({thread}) {
    const { goToThread } = useNavigation();

    function getTags() {
        let tags = thread.tags;
        if (tags.length === 0 || tags.length === null) {
            return "#No Tags";
        } else {
            return tags;
        }
    }

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const foundUserGet = sessionStorage.getItem("foundUser");
        if (foundUserGet) {
            setLoggedInUser(JSON.parse(foundUserGet));
        }
    }, []);

    const sanitizedName = DOMPurify.sanitize(thread.thread_name);
    const sanitizedContents = DOMPurify.sanitize(thread.thread_contents);

    const userAccountType = thread?.user?.account_type || "Unknown";


    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return `${interval} years ago`;

        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return `${interval} months ago`;

        interval = Math.floor(seconds / 86400);
        if (interval === 1) return `Yesterday`;
        if (interval > 1) return `${interval} days ago`;

        interval = Math.floor(seconds / 3600);
        if (interval > 1) return `${interval} hours ago`;

        interval = Math.floor(seconds / 60);
        if (interval > 1) return `${interval} minutes ago`;

        return `${seconds} seconds ago`;
    };

    return (
        <div className="grid-item" onClick={() => goToThread(thread.thread_id)}>
            <div className="user-header">
                <div className="user-avatar"></div>
                <p className="username">Anonymous {userAccountType}</p>
                <p className="date-display">
                    {thread.created_at ? timeSince(thread.created_at) : "Unknown date"}
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
                        <div className='grid-item-tags'>
                        {getTags()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}