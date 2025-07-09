import { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import useNavigation from '../Nav Bars/useNavigation';

export const useThreadCardLogic = (thread) => {
  const { goToThread } = useNavigation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sanitizedName = DOMPurify.sanitize(thread.thread_name);
  const sanitizedContents = DOMPurify.sanitize(thread.thread_contents);

  useEffect(() => {
    const foundUserGet = sessionStorage.getItem("foundUser");
    if (foundUserGet) {
      setLoggedInUser(JSON.parse(foundUserGet));
    }
  }, []);

  const updateRecentViewed = useCallback((threadId, threadTitle) => {
    const viewedThreadsJSON = sessionStorage.getItem('recentlyViewed');
    let viewedThreads = viewedThreadsJSON ? JSON.parse(viewedThreadsJSON) : [];

    const existingIndex = viewedThreads.findIndex(item => item.id === threadId);

    if (existingIndex !== -1) {
      const existingThread = viewedThreads.splice(existingIndex, 1)[0];
      viewedThreads.unshift(existingThread);
    } else {
      viewedThreads.unshift({ id: threadId, title: threadTitle });
      if (viewedThreads.length > 10) {
        viewedThreads.pop();
      }
    }
    sessionStorage.setItem('recentlyViewed', JSON.stringify(viewedThreads));
  }, []);

  const handleThreadClick = useCallback(() => {
    updateRecentViewed(thread.thread_id, thread.thread_name);
    goToThread(thread.thread_id);
  }, [thread, goToThread, updateRecentViewed]);

  const getUserDisplayName = useCallback((threadData, currentUser) => {
    if (currentUser?.email === threadData?.user.email) {
      return "Posted by you";
    } else {
      return `Anonymous ${threadData.user?.account_type || "User"}`;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return {
    loggedInUser,
    isLoading,
    sanitizedName,
    sanitizedContents,
    handleThreadClick,
    getUserDisplayName,
  };
};