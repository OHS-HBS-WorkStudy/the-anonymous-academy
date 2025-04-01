// Library declaration imports
import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from "dompurify";

import TimeCounter from '../modules/TimeCounter.js';
import ThreadVote from '../modules/ThreadVote.js';

import ReplyList from '../modules/Reply/ReplyList.js';

import ThreadReply from '../modules/Reply/ThreadReply.js';

export default function Thread() {
    const { threadId } = useParams(); 

    let data = JSON.parse(sessionStorage.getItem("data")) || {};
    const thread = data.find(t => t.thread_id === parseInt(threadId));

    if (!thread) {
        return <h2>Thread not found!</h2>;
    }

    const sanitizedTitle = DOMPurify.sanitize(thread.thread_name);
    const sanitizedDesc = DOMPurify.sanitize(thread.thread_contents);

    function getTags() {
        if (!thread.tags || thread.tags.length === 0) {
          return <span key="no-tags">#No Tags</span>; 
        }
    
        return thread.tags.map((tag) => (

            <div className="tag" key={tag}>{tag}</div> 

        ));
      }

    return(
        <div className="offset">
           <div className="thread-page">
            <article className="thread-content">
                <header className="thread-header">
                    <h1 className="thread-title" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                    <div className="thread-meta">
                        <p>Anonymous {thread.user.account_type}</p>
                        <p>Created: <TimeCounter date={thread.created_at} /></p>
                        <p>Views: 0</p>
                    </div>
                </header>
                

                <div className="thread-main-content">
                    
                    <aside className="thread-vote-box">
                        <ThreadVote />
                    </aside>
                    <div className="thread-description" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />


                    <div className="tags-container">
                        {getTags()}
                    </div>     
                </div>

                <section className="thread-replies">
                    <ThreadReply />

                    <header className="replies-header">
                        <h2 className="replies-title">Replies:</h2>
                    </header>

                    <div className="replies-list">
                        <ReplyList  />
                    </div>
                </section>
            </article>
          </div>
        </div>
    );
}