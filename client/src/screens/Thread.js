import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import TimeCounter from '../modules/I-Candy/TimeCounter.js';
import ThreadVote from '../modules/Thread/ThreadVote.js';
import ReplyList from '../modules/Reply/ReplyList.js';
import ThreadReply from '../modules/Reply/ThreadReply.js';
import PollingSystem from '../modules/Thread/PollingSystem.js';

export default function Thread() {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [status, setStatus] = useState('');
  const foundUser = JSON.parse(sessionStorage.getItem('foundUser'));
  const [commentListHeight, setCommentListHeight] = useState('auto');
  const [threadContentHeight, setThreadContentHeight] = useState('auto'); 
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isInitialLoad = useRef(true);
  const threadContentRef = useRef(null);
  const commentListContainerRef = useRef(null);

  useEffect(() => {
    if (isInitialLoad.current) {
      window.scrollTo(0, 0);
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updateHeights = () => {
      if (threadContentRef.current && commentListContainerRef.current) {
        if (screenWidth <= 786) {
          setCommentListHeight('auto');
          setThreadContentHeight('auto');
        } else {
          const contentHeight = threadContentRef.current.offsetHeight;
          setThreadContentHeight(contentHeight + 'px');
          setCommentListHeight(contentHeight + 'px');
        }
      }
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);

    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, [screenWidth, thread]);

  useEffect(() => {
    if (threadContentRef.current && commentListContainerRef.current && screenWidth > 786) {
      const contentHeight = threadContentRef.current.offsetHeight;
      setThreadContentHeight(contentHeight + 'px');
      setCommentListHeight(contentHeight + 'px');
    }
  }, [thread, screenWidth]);

  useEffect(() => {
    if (commentListContainerRef.current && screenWidth > 786) {
      const commentList = commentListContainerRef.current.querySelector('.reply-list');
      if (commentList) {
        commentList.style.overflowY = commentList.offsetHeight > parseInt(commentListHeight) ? 'scroll' : 'auto';
      }
    } else if (commentListContainerRef.current) {
      const commentList = commentListContainerRef.current.querySelector('.reply-list');
      if (commentList) {
        commentList.style.overflowY = 'auto'; 
      }
    }
  }, [commentListHeight, screenWidth, thread]); 

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('data')) || [];
    const currentThread = data.find((t) => t.thread_id === parseInt(threadId));
    setThread(currentThread);
    if (currentThread) setStatus(currentThread.status || 'Open');
  }, [threadId]);

  // Handle status change and save it to sessionStorage
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Update the status in the thread object
    const updatedThread = { ...thread, status: newStatus };

    // Update the thread in the session storage
    let data = JSON.parse(sessionStorage.getItem('data')) || [];
    const threadIndex = data.findIndex((t) => t.thread_id === thread.thread_id);

    if (threadIndex !== -1) {
      data[threadIndex] = updatedThread;
      sessionStorage.setItem('data', JSON.stringify(data)); 
    }
  };

  const sanitizedTitle = DOMPurify.sanitize(thread?.thread_name);
  const sanitizedDesc = DOMPurify.sanitize(thread?.thread_contents);

  const isOwner = foundUser?.email === thread?.user.email;

  if (!thread) {
    return <h2>Thread not found!</h2>;
  }

  return (
    <motion.div
      className="offset"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="thread-page"
        layout
      >
        <motion.article
          className="thread-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60 }}
          layout
          ref={threadContentRef} // Attach ref to the thread content
          style={{ height: threadContentHeight }}
        >
          <motion.header className="thread-header" layout>
            <motion.h1
              className="thread-title"
              dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
              layout
            />
          </motion.header>

          <motion.div className="thread-meta" layout>
            <motion.p className="user-poster" whileHover={{ scale: 1.05 }}>
              {foundUser?.email === thread.user.email ? 'Your Post' : `Anonymous ${thread.user.account_type}`}
            </motion.p>
            <motion.p><TimeCounter date={thread.created_at} /></motion.p>
            <motion.p>0 views</motion.p>

            {isOwner ? (
              <motion.div>
                <label htmlFor="status-dropdown">Status:</label>
                <select
                  id="status-dropdown"
                  value={status}
                  onChange={handleStatusChange}
                  className="status-dropdown"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Archived">Archived</option>
                </select>
              </motion.div>
            ) : (
              <motion.p>Status: {status}</motion.p>
            )}
          </motion.div>

          <motion.div className="thread-main-content" layout>
            <aside className="thread-vote-box">
              <ThreadVote />
            </aside>

            <ReactQuill
              value={sanitizedDesc}
              readOnly={true}
              className="thread-description"
              theme="bubble"
            />
          </motion.div>

          {thread.poll &&
            Array.isArray(thread.poll.options) &&
            thread.poll.options.length > 1 && (
              <motion.div layout>
                <PollingSystem
                  question={thread.poll.question}
                  options={thread.poll.options}
                  pollId={thread.thread_id.toString()}
                />
              </motion.div>
            )}

          <motion.div className="tags-container" layout>
            {thread.tags?.map((tag, index) => (
              <motion.div
                className="tag"
                key={index}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>

          <motion.section className="thread-replies" layout>
            <ThreadReply />
          </motion.section>
        </motion.article>

        <motion.div
          className="comment-list-container"
          style={{ height: commentListHeight }}
          layout
          ref={commentListContainerRef} 
        >
          <div className="reply-list">
            <ReplyList thread={thread} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}