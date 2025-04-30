import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faFire, faCommentDots, faListUl } from '@fortawesome/free-solid-svg-icons';
import DataList from "./DataList";

export default function Activity() {
  const mockTags = ['#JavaScript', '#ReactJS', '#WebDev'];
  const mockTrendingThreads = [
    'How to manage React state in large apps?',
    'New features in ES2025',
    'Why Web Performance matters',
  ];
  const mockTrendingComments = [
    'Great point! I hadn’t considered...',
    'Thanks for this explanation — super helpful!',
    'Can you clarify what you meant by...',
  ];

  return (
    <div className="activity">
      <div className="user-info-column">
        <div className="account-content">
          
          <div className="my-recent-tags">
            <h2><FontAwesomeIcon icon={faTags} className="icon" /> Recent Tags</h2>
            <ul>
              {mockTags.map((tag, index) => (
                <li key={index} className="tag-item">{tag}</li>
              ))}
            </ul>
          </div>

          <div className="my-trending">
            <h2><FontAwesomeIcon icon={faFire} className="icon" /> Trending Threads</h2>
            <ul>
              {mockTrendingThreads.map((thread, index) => (
                <li key={index} className="thread-item">{thread}</li>
              ))}
            </ul>
          </div>

          <div className="my-trending-comments">
            <h2><FontAwesomeIcon icon={faCommentDots} className="icon" /> Trending Comments</h2>
            <ul>
              {mockTrendingComments.map((comment, index) => (
                <li key={index} className="comment-item">"{comment}"</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="other-content">
        <div className="my-data-list">
          <h2><FontAwesomeIcon icon={faListUl} className="icon" /> Activity List</h2>
          <DataList />
        </div>
      </div>
    </div>
  );
}
