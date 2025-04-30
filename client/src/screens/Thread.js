import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import TimeCounter from '../modules/I-Candy/TimeCounter.js';
import ThreadVote from '../modules/Thread/ThreadVote.js';
import ReplyList from '../modules/Reply/ReplyList.js';
import ThreadReply from '../modules/Reply/ThreadReply.js';
import PollingSystem from '../modules/Thread/PollingSystem.js';
import { motion } from 'framer-motion';

export default function Thread() {
  const { threadId } = useParams();
  const isInitialLoad = useRef(true);
  const threadContentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' 
    });
  }, 100); 

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
    if (screenWidth <= 786) {
      setMaxHeight('auto');
    } else {
      setMaxHeight(null);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (isInitialLoad.current) {
      window.scrollTo(0, 0);
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const updateMaxHeight = () => {
      if (threadContentRef.current) {
        const contentHeight = threadContentRef.current.offsetHeight;
        setMaxHeight(`${contentHeight}px`);
      }
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  let data = JSON.parse(sessionStorage.getItem('data')) || [];
  const thread = data.find((t) => t.thread_id === parseInt(threadId));

  if (!thread) {
    return <h2>Thread not found!</h2>;
  }

  const sanitizedTitle = DOMPurify.sanitize(thread.thread_name);
  const sanitizedDesc = DOMPurify.sanitize(thread.thread_contents);

  function getTags() {
    if (!thread.tags || thread.tags.length === 0) {
      return (
        <motion.span
          className="tag"
          key="no-tags"
          whileHover={{ scale: 1.05 }}
        >
          #No Tags
        </motion.span>
      );
    } else {
      return thread.tags.map((tag) => (
        <motion.div
          className="tag"
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tag}
        </motion.div>
      ));
    }
  }

  const foundUser = JSON.parse(sessionStorage.getItem('foundUser'));

  function userCheck(thread, foundUser) {
    if (!thread || !foundUser) return 'Unknown User';
    return foundUser.email === thread.user.email
      ? 'Your Post'
      : 'Anonymous ' + (thread.user.account_type || 'Unknown User');
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
          ref={threadContentRef}
          layout
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
              {userCheck(thread, foundUser)}
            </motion.p>
            <motion.p><TimeCounter date={thread.created_at} /></motion.p>
            <motion.p>0 views</motion.p>
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
            {getTags()}
          </motion.div>

          <motion.section className="thread-replies" layout>
            <ThreadReply />
          </motion.section>
        </motion.article>

        <motion.div
          className="comment-list-container"
          style={{ maxHeight }}
          layout
        >
          <div className="reply-list">
            <ReplyList thread={thread} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
