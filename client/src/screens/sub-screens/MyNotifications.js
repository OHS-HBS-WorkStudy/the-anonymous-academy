import React, { useState, useEffect } from 'react';
import useNavigation from '../../modules/useNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faBell, faQuestionCircle, faComment, faHeart, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const mockNotifications = [
    {
        id: 1,
        type: 'question',
        message: 'New answer to your question "How to center a div?".',
        timestamp: '5 minutes ago',
        link: '/questions/123',
    },
    {
        id: 2,
        type: 'comment',
        message: 'A user commented on your answer to "Best practices for React forms".',
        timestamp: '15 minutes ago',
        link: '/questions/456#answer-789',
    },
    {
        id: 3,
        type: 'heart',
        message: 'Someone upvoted your answer on "Understanding JavaScript closures".',
        timestamp: '30 minutes ago',
        link: '/questions/789#answer-012',
    },
    {
        id: 4,
        type: 'follow',
        message: 'A new user, @CodeNinja, started following you.',
        timestamp: '1 hour ago',
        link: '/users/codeninja',
    },
    {
        id: 5,
        type: 'achievement',
        message: 'Congratulations! You earned the "First Answer" badge.',
        timestamp: '2 hours ago',
    },
    {
        id: 6,
        type: 'question',
        message: 'Your question "Is Redux still relevant in 2024?" received a new upvote.',
        timestamp: '4 hours ago',
        link: '/questions/012',
    },
    {
        id: 7,
        type: 'comment',
        message: 'A user replied to your comment on "Async/Await vs Promises".',
        timestamp: '8 hours ago',
        link: '/questions/345#comment-678',
    },
    {
        id: 8,
        type: 'heart',
        message: 'Your question "What are the benefits of TypeScript?" was upvoted.',
        timestamp: '1 day ago',
        link: '/questions/678',
    },
    {
        id: 9,
        type: 'follow',
        message: '@WebDevGuru is now following your activity.',
        timestamp: '1 day ago',
        link: '/users/webdevguru',
    },
    {
        id: 10,
        type: 'achievement',
        message: 'You reached 100 total answer views!',
        timestamp: '1 day ago',
    },
];

const getNotificationIcon = (type) => {
    switch (type) {
        case 'question':
            return faQuestionCircle;
        case 'comment':
            return faComment;
        case 'heart':
            return faHeart;
        case 'follow':
            return faUserPlus;
        case 'achievement':
            return faCheckCircle;
        case 'success':
            return faCheckCircle;
        case 'warning':
            return faExclamationTriangle;
        case 'error':
            return faExclamationTriangle;
        case 'info':
            return faInfoCircle;
        default:
            return faBell;
    }
};

const NotificationPopup = ({ notifications, onClose }) => (
    <div className="notification-popup-overlay" onClick={onClose}>
        <div className="notification-popup" onClick={(e) => e.stopPropagation()}> 
            <h3>All Notifications</h3>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        <FontAwesomeIcon
                            icon={getNotificationIcon(notification.type)}
                            className="notification-icon"
                        />
                        <div className="notification-content">
                            <p>{notification.message}</p>
                            <span className="notification-timestamp">{notification.timestamp}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="popup-actions">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
);

export default function MyNotifications () {
    const [showAll, setShowAll] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const visibleNotifications = showAll ? mockNotifications : mockNotifications.slice(0, 5);

    const handleSeeAllClick = () => {
        setShowAll(true);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowAll(false);
    };

    return (
        <div>
            <ul>
                {visibleNotifications.map((notification) => (
                    <li key={notification.id}>
                        <FontAwesomeIcon
                            icon={getNotificationIcon(notification.type)}
                            className="notification-icon"
                        />
                        <div className="notification-content">
                            <p>{notification.message}</p>
                            <span className="notification-timestamp">{notification.timestamp}</span>
                        </div>
                    </li>
                ))}
            </ul>
            {mockNotifications.length > 5 && !showAll && (
                <button className="see-all-button" onClick={handleSeeAllClick}>
                    See All
                </button>
            )}

            {showPopup && (
                <NotificationPopup notifications={mockNotifications} onClose={handleClosePopup} />
            )}
        </div>
    );
};