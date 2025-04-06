// Library declaration imports
import React, {useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";

import TimeCounter from '../modules/I-Candy/TimeCounter.js';
import ThreadVote from '../modules/ThreadVote.js';
import ReplyList from '../modules/Reply/ReplyList.js';
import ThreadReply from '../modules/Reply/ThreadReply.js';

export default function Thread() {
    const { threadId } = useParams(); 
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (isInitialLoad.current) {
            window.scrollTo(0, 0); 
            isInitialLoad.current = false; 
        }
    }, []);

    let data = JSON.parse(sessionStorage.getItem("data")) || [];
    const thread = data.find(t => t.thread_id === parseInt(threadId));

    if (!data) {
        return <h2>Thread not found!</h2>;
    } 

    const sanitizedTitle = DOMPurify.sanitize(thread.thread_name);
    const sanitizedDesc = DOMPurify.sanitize(thread.thread_contents);

    function getTags() {
        if (!thread.tags || thread.tags.length === 0) {
          return <span className="tag" key="no-tags">#No Tags</span>; 
        } else {
            const tagElements = thread.tags.map((tag) => (
                <div className="tag" key={tag}>{tag}</div>
            ));

          return tagElements;
        }
      }

      const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

      function userCheck(thread, foundUser) {
        if (!thread || !foundUser) {
            return "Unknown User";  
        }

        if (foundUser.email === thread.user.email) {
            return "Your Post";  
        } else {
            
            return "Anonymous " + (thread.user.account_type || "Unknown User");
        }
    }


    return(
        <div className="offset">
           <div className="thread-page">
            <article className="thread-content">
                <header className="thread-header">
                    <h1 className="thread-title" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                </header>
                <div className="thread-meta">
                        <p className="user-poster">{userCheck(thread, foundUser)}</p>
                        <p>Created: <TimeCounter date={thread.created_at} /></p>
                        <p>Views: 0</p>
                    </div>
                

                <div className="thread-main-content">
                    
                    <aside className="thread-vote-box">
                        <ThreadVote />
                    </aside>

                    <ReactQuill 
                        value={DOMPurify.sanitize(thread.thread_contents)} 
                        readOnly={true} 
                        className="thread-description"
                        theme="bubble" 
                    />
                    
                    {/* <div className="thread-description" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} /> */}


                     
                </div>

                <div className="tags-container">
                        {getTags()}
                    </div>    

                <section className="thread-replies">
                    <ThreadReply />

                    <div className="reply-list">
                        <ReplyList thread={thread} />
                    </div>
                </section>
            </article>
          </div>
        </div>
    );
}