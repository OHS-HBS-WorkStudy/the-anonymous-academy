import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from "dompurify";

export default function Thread() {
    const { threadId } = useParams(); 

    let data = JSON.parse(sessionStorage.getItem("data")) || {};
    const thread = data.find(t => t.thread_id === parseInt(threadId));

    if (!thread) {
        return <h2>Thread not found!</h2>;
    }

    const sanitizedTitle = DOMPurify.sanitize(thread.thread_name);
    const sanitizedDesc = DOMPurify.sanitize(thread.thread_contents);

    return(
        <div className="offset">
            <div className="threadpage">
                <div id="thread-content">

                <div className="thread-top">
                        <div className="submitted-content-title" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                        <div className="thread-top-stats">
                            <p>Created By: Student</p>
                            <p>Creation Date: {thread.created_at}</p>
                            <p>Viewed: 0</p>
                        </div>
                    </div>
                    
                <div className="content-container">

                <div className="vote-box">
                                {/* <ThreadVote /> */}
                            
                </div>

                    
                    <div className="submitted-content-desc" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />

                    {/* {threadGetTag()} */}
                </div>

                {/* <ThreadReply /> */}

                <div className="Replylist">
                    <div className="ReplylistTop">
                        <h1 id="reply-counter">Replies: 0</h1>
                    </div>

                    {/* <ReplyList getCount={getReliesCount}/> */}

                </div>
                
                </div>
            </div>
        </div>
    );
}