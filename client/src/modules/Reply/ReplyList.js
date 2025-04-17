import { data, useParams } from "react-router-dom"; 
import ReactQuill from "react-quill";
import TimeCounter from "../I-Candy/TimeCounter";
import { useState, useRef, useEffect} from "react";
import DOMPurify from 'dompurify';


import ReplyToReply from "./ReplyToReply";
import ReplyVote from "./ReplyVote";
import CountUpComponent from "../I-Candy/CountUp.js";

export default function ReplyList({thread}) {
    const { threadId } = useParams(); 
    const allReplies = JSON.parse(sessionStorage.getItem("replies")) || {};

    const [replyStates, setReplyStates] = useState({});  

    const toggleReplyButton = (replyId) => {
        setReplyStates(prevState => ({
            ...prevState,
            [replyId]: !prevState[replyId] 
        }));
    };
    const findReplies = () => {
        return allReplies[threadId] || [];
    };

    const [sortOption, setSortOption] = useState("newest");  

    const sortReplies = (replies, sortOption) => {
        switch (sortOption) {
            case "oldest":
                return [...replies].sort((a, b) => new Date(a.date) - new Date(b.date));
            case "popular":
                return;
            case "answered":
                return;
            case "newest":
            default:
                return [...replies].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    };

    const replies = sortReplies(findReplies(), sortOption);

    const foundUser = JSON.parse(sessionStorage.getItem("foundUser")) || { pref: {} };

    
    function userCheck(threadData, reply) {
        if (!threadData || !reply) {
            return "Unknown User";  
        }

        if (foundUser && foundUser.email === reply.email) {
            return "You";
        } else if (reply.email === thread.user.email) {
            return "Original Poster";  
        } else {
            return "Anonymous " + (reply.user || "Unknown User");
        }
    }

    function getRepliesLength() {
        return replies  ? replies.length : "0";
    }


    

    return (
            <div>
                <header className="replies-header">
                    <h2 className="replies-title">Replies: {''} 
                        <CountUpComponent endValue={getRepliesLength()} duration={3.8} />
                    </h2>
                   

                    <div className="sort-dropdown-container">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="sort-dropdown"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="popular">Popular</option>
                            <option value="answered">Answered</option>
                        </select>
                        </div>

                </header>

                {replies.length > 0 ? (
                    replies.map((reply, index) => (
                        <div key={index} className="reply-card">
                            <div className="user-header">
                                <div className="user-avatar"></div>
                                <p className="username">
                                     {userCheck(thread, reply)}
                                </p>
                                <p className="date-display">
                                    <strong> <TimeCounter date={reply.date} /> </strong>
                                </p>
                            </div>
         
                            <div className="reply-content">
                                <aside className="reply-vote-box">
                                    <ReplyVote />
                                </aside>

                                <ReactQuill 
                                    value={DOMPurify.sanitize(reply.contents)} 
                                    readOnly={true} 
                                    className="reply-desc"
                                    style={{ backgroundColor: "transparent"}}
                                    theme="bubble" 
                                />
                            </div>
                            <div>
                                <button onClick={() => toggleReplyButton(reply.id)}>Reply</button>
                            </div>

                            {replyStates[reply.id] && <ReplyToReply />}
                        </div>
                    ))
                ) : (
                    <p className="no-replies">No replies found for this thread.</p>
                )}
            </div>
        );
}
