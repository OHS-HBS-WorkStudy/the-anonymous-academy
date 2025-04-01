// Library declaration imports
import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from "dompurify";

import TimeCounter from '../modules/TimeCounter.js';

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
          <div className="tags-container">
            <span className="tag" key={tag}>{tag} </span> 
          </div>
        ));
      }

    return(
        <div className="offset">
           <div class="thread-page">
            <article class="thread-content">
                <header class="thread-header">
                    <h1 class="thread-title" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                    <div class="thread-meta">
                        <p>Anonymous {thread.user.account_type}</p>
                        <p>Created: <TimeCounter date={thread.created_at} /></p>
                        <p>Views: 0</p>
                    </div>
                </header>

                <div class="thread-main-content">
                    <aside class="thread-vote-box">
                        {/* <ThreadVote /> */}
                    </aside>
                    <div class="thread-description" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
                    
                    {getTags()}
                </div>

                <section class="thread-replies">
                    <header class="replies-header">
                        <h2 class="replies-title">Replies: 0</h2>
                    </header>
                    <div class="replies-list">
                        {/* <ReplyList getCount={getReliesCount}/> */}
                    </div>
                </section>
            </article>
          </div>
        </div>
    );
}