import React, { useState, useEffect } from 'react';
import CountUpComponent from '../modules/I-Candy/CountUp.js';
import Threads from '../modules/Thread/Threads.js';
import ThreadFilter from '../modules/Filtering/ThreadFilter.js';
import PageNavigation from '../modules/Filtering/PageNav.js';

export default function ThreadList() {
  const allThreads = JSON.parse(sessionStorage.getItem("data")) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  const totalPages = Math.ceil(allThreads?.length / threadsPerPage);

  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = allThreads?.slice(indexOfFirstThread, indexOfLastThread);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  return (
    <div className="offset">
      <div className="ThreadList">
        <div className="container1">
          <div className="questionsSection">
            <h1 className="threadListTitle">Thread Directory</h1>

            <h3>
              <span className="questionsTitle">Questions</span>
              <span className="countUp">
                <CountUpComponent endValue={allThreads.length} duration={3.8} />
              </span>
            </h3>

            <ThreadFilter />
          </div>

          <div className="main-content-area">
            <div className="grid-container-area">
              <div className="thread-list-container">
                {currentThreads && currentThreads.length > 0 ? (
                  currentThreads.map((thread) => (
                    <div key={thread.thread_id}>
                      <Threads thread={thread} />
                    </div>
                  ))
                ) : (
                  <div className="no-threads-message">No Threads</div>
                )}
              </div>

              <div className="listman">
                <PageNavigation
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
                />
              </div>
            </div>

            <div className="right-space-area">
              <div className="trending-threads-cont">
                <h3>Trending Threads</h3>
                <ul className="trending-threads-list">
                  <li className="trending-thread-item">Exploring the Future of AI in Creative Fields</li>
                  <li className="trending-thread-item">Best Practices for Writing Clean and Maintainable Code</li>
                  <li className="trending-thread-item">The Impact of Remote Work on Team Collaboration</li>
                  <li className="trending-thread-item">Share Your Favorite Productivity Hacks and Tools</li>
                  <li className="trending-thread-item">A Deep Dive into the Latest Advancements in Web Security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
