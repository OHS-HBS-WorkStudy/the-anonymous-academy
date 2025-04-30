import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faReply, faComments, faEye } from '@fortawesome/free-solid-svg-icons';

export default function DataList({ loggedInUser }) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const mockPosts = [
    {
      id: 1,
      type: 'question',
      title: 'How does React handle re-renders?',
      views: 120,
      date: '2025-04-10',
    },
    {
      id: 2,
      type: 'answer',
      title: 'Understanding closures in JavaScript',
      views: 85,
      date: '2025-03-28',
    },
    {
      id: 3,
      type: 'question',
      title: 'What’s new in CSS 2025?',
      views: 60,
      date: '2025-02-15',
    },
    {
      id: 4,
      type: 'comment',
      title: 'I totally agree with this point on reusability.',
      views: 25,
      date: '2025-04-22',
    },
  ];

  const filterPosts = () => {
    let filtered = [...mockPosts];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(post => post.type === typeFilter);
    }

    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  };

  const iconMap = {
    question: faQuestionCircle,
    answer: faReply,
    comment: faComments,
  };

  return (
    <div className="my-posts">
      <div className="filter-controls">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="question">Questions</option>
          <option value="answer">Answers</option>
          <option value="comment">Comments</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <ul className="post-list">
        {filterPosts().length > 0 ? (
          filterPosts().map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-icon">
                <FontAwesomeIcon icon={iconMap[post.type] || faQuestionCircle} />
              </div>
              <div className="post-content">
                <p className="post-title">{post.title}</p>
                <p className="post-meta">
                  <FontAwesomeIcon icon={faEye} className="icon" /> {post.views} views • {post.date}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </ul>
    </div>
  );
}
