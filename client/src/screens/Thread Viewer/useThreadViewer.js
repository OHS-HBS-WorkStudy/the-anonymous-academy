import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useTheme } from '@mui/material/styles';

export const useThreadLogic = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [status, setStatus] = useState('');
  const foundUser = JSON.parse(sessionStorage.getItem('foundUser'));
  const theme = useTheme();

  const threadContentRef = useRef(null);
  const commentListContentRef = useRef(null);

  const [commentsPaperHeight, setCommentsPaperHeight] = useState('auto');
  const [commentsListOverflow, setCommentsListOverflow] = useState('auto');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('data')) || [];
    const currentThread = data.find((t) => t.thread_id === parseInt(threadId));
    setThread(currentThread);
    if (currentThread) setStatus(currentThread.status || 'Open');
  }, [threadId]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    const updatedThread = { ...thread, status: newStatus };

    let data = JSON.parse(sessionStorage.getItem('data')) || [];
    const threadIndex = data.findIndex((t) => t.thread_id === thread.thread_id);

    if (threadIndex !== -1) {
      data[threadIndex] = updatedThread;
      sessionStorage.setItem('data', JSON.stringify(data));
      setThread(updatedThread);
    }
  };

  const sanitizedTitle = DOMPurify.sanitize(thread?.thread_name);
  const sanitizedDesc = DOMPurify.sanitize(thread?.thread_contents);

  const isOwner = foundUser?.email === thread?.user.email;

  useEffect(() => {
    const adjustCommentsLayout = () => {
      const threadContentEl = threadContentRef.current;
      const commentsListEl = commentListContentRef.current;

      if (threadContentEl && commentsListEl) {
        const threadContentVisualHeight = threadContentEl.offsetHeight;
        const commentsListScrollHeight = commentsListEl.scrollHeight;

        const commentsPaperVerticalPadding = theme.spacing(3) * 2;
        
        if (commentsListScrollHeight < (threadContentVisualHeight - commentsPaperVerticalPadding)) {
          setCommentsPaperHeight('auto');
          setCommentsListOverflow('visible');
        } else {
          setCommentsPaperHeight(threadContentVisualHeight + 'px');
          setCommentsListOverflow('auto');
        }
      }
    };

    adjustCommentsLayout();
    window.addEventListener('resize', adjustCommentsLayout);

    const observer = new MutationObserver(adjustCommentsLayout);
    if (commentListContentRef.current) {
      observer.observe(commentListContentRef.current, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      window.removeEventListener('resize', adjustCommentsLayout);
      observer.disconnect();
    };
  }, [thread, theme]);

  return {
    thread,
    status,
    isOwner,
    sanitizedTitle,
    sanitizedDesc,
    commentsPaperHeight,
    commentsListOverflow,
    handleStatusChange,
    threadContentRef,
    commentListContentRef,
    foundUser,
    theme,
  };
};