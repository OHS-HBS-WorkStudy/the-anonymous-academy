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

    return (
        <div className="grid-item" onClick={() => goToThread(thread.thread_id)}>
            <div className="user-header">
                <div className="user-avatar"></div>
                <p className="username">Anonymous {userAccountType}</p>
                <p className="date-display">Mar 20 2025 at 2:30 PM</p>
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