import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Achievements.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faLock, faTrophy, faStar, faMedal, faCrown, faGem, faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';


const Achievements = () => {
  const [currentSlides, setCurrentSlides] = useState({
    achievements: 0,
    badges: 0,
    rewards: 0
  });

  const scrollRefs = {
    achievements: useRef(null),
    badges: useRef(null),
    rewards: useRef(null)
  };

  const categories = {
  achievements: [
    {
      id: 1,
      title: 'First Confession',
      description: 'Ask your very first anonymous question',
      icon: '🗯️',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      reward: '10 XP',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'The Curious Cat',
      description: 'Ask 10 different questions',
      icon: '🐱',
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      reward: '20 XP',
      rarity: 'uncommon'
    },
    {
      id: 3,
      title: 'Serial Asker',
      description: 'Ask a question every day for 14 days',
      icon: '📆',
      progress: 6,
      maxProgress: 14,
      unlocked: false,
      reward: '40 XP',
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Just Ventin’',
      description: 'Post a question that gets 10 replies',
      icon: '💬',
      progress: 6,
      maxProgress: 10,
      unlocked: false,
      reward: '25 XP',
      rarity: 'uncommon'
    },
    {
      id: 5,
      title: 'Daily Dose of Drama',
      description: 'Post for 30 consecutive days',
      icon: '📺',
      progress: 12,
      maxProgress: 30,
      unlocked: false,
      reward: '75 XP',
      rarity: 'epic'
    },
    {
      id: 6,
      title: 'The Anonymous Oracle',
      description: 'Reach 100 total posts',
      icon: '🔮',
      progress: 83,
      maxProgress: 100,
      unlocked: false,
      reward: '100 XP',
      rarity: 'legendary'
    }
  ],
  badges: [
    {
      id: 1,
      title: 'Reply Goblin',
      description: 'Reply to 20 questions anonymously',
      icon: '👺',
      progress: 16,
      maxProgress: 20,
      unlocked: false,
      reward: 'Reply Goblin Badge',
      rarity: 'rare'
    },
    {
      id: 2,
      title: 'Upvote Magnet',
      description: 'Get 50 upvotes across all your answers',
      icon: '🧲',
      progress: 35,
      maxProgress: 50,
      unlocked: false,
      reward: 'Upvote Magnet Badge',
      rarity: 'epic'
    },
    {
      id: 3,
      title: 'Wholesome Ghost',
      description: 'Have 5 answers marked as "Helpful"',
      icon: '👻',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      reward: 'Wholesome Ghost Badge',
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Lurker No More',
      description: 'Make your first reply after 7 days of silence',
      icon: '🕵️',
      progress: 1,
      maxProgress: 1,
      unlocked: false,
      reward: 'Welcome Back Badge',
      rarity: 'common'
    },
    {
      id: 5,
      title: 'The Disappearing Legend',
      description: 'Earn 500 XP and vanish for a month',
      icon: '🌫️',
      progress: 400,
      maxProgress: 500,
      unlocked: false,
      reward: 'Mystery Badge',
      rarity: 'legendary'
    }
  ],
  rewards: [
    {
      id: 1,
      title: 'Stealth Mode',
      description: 'Unlock a shadowy theme for nighttime posting',
      icon: '🕶️',
      progress: 80,
      maxProgress: 100,
      unlocked: false,
      reward: 'Stealth Theme',
      rarity: 'rare'
    },
    {
      id: 2,
      title: 'Username in Disguise',
      description: 'Mask your username with a random alias every time',
      icon: '🎭',
      progress: 60,
      maxProgress: 100,
      unlocked: false,
      reward: 'Alias Switcher',
      rarity: 'epic'
    },
    {
      id: 3,
      title: 'Drama King/Queen/Monarch',
      description: 'Unlock a flair that screams ✨extra✨',
      icon: '👑',
      progress: 90,
      maxProgress: 100,
      unlocked: false,
      reward: 'Dramatic Flair',
      rarity: 'epic'
    },
    {
      id: 4,
      title: 'The Void',
      description: 'Unlock a dark, minimalistic UI for maximum anonymity',
      icon: '🌌',
      progress: 20,
      maxProgress: 100,
      unlocked: false,
      reward: 'Void Theme',
      rarity: 'legendary'
    },
    {
      id: 5,
      title: 'Vibe Check Passed',
      description: 'Unlock background music or ambient sounds',
      icon: '🎧',
      progress: 45,
      maxProgress: 100,
      unlocked: false,
      reward: 'Audio Vibes',
      rarity: 'rare'
    }
  ]
};



  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'var(--clr-primary-a40)';
      case 'uncommon': return '#4CAF50';
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FFD700';
      default: return 'var(--clr-primary-a40)';
    }
  };

  const getMaxSlides = (items, itemsPerSlide = 3) => {
    return Math.ceil(items.length / itemsPerSlide) - 1;
  };

  const scrollToNextSlide = (category) => {
  const itemsPerPage = 3;
  const maxSlide = getMaxSlides(categories[category], itemsPerPage);
  if (currentSlides[category] < maxSlide) {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: prev[category] + 1
    }));
  }
};

const scrollToPrevSlide = (category) => {
  if (currentSlides[category] > 0) {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: prev[category] - 1
    }));
  }
};

const scrollToSlide = (category, index) => {
  const itemsPerPage = 3;
  const maxSlide = getMaxSlides(categories[category], itemsPerPage);
  if (index >= 0 && index <= maxSlide) {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: index
    }));
  }
};


  const AchievementCard = ({ achievement }) => {
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
    const rarityColor = getRarityColor(achievement.rarity);

    return (
      <div
        className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
        style={{ '--rarity-color': rarityColor }}
      >
        <div className="achievement-icon" style={{ background: `linear-gradient(135deg, ${rarityColor}, ${rarityColor}88)` }}>
          {achievement.icon}
        </div>
        <div className={`achievement-status ${achievement.unlocked ? 'status-unlocked' : 'status-locked'}`}>
          {achievement.unlocked ?
            <FontAwesomeIcon icon={faUnlock} className="fa-icon" /> :
            <FontAwesomeIcon icon={faLock} className="fa-icon" />
          }
        </div>
        <div className="achievement-rarity" style={{ color: rarityColor }}>
          {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
        </div>
        <h3 className="achievement-title">{achievement.title}</h3>
        <p className="achievement-description">{achievement.description}</p>
        <div className="achievement-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%`, background: `linear-gradient(90deg, ${rarityColor}, ${rarityColor}88)` }}
            />
          </div>
          <div className="progress-text">
            <span>{achievement.progress} / {achievement.maxProgress}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
        <div className="achievement-reward">
          <FontAwesomeIcon icon={faTrophy} className="fa-icon" style={{ marginRight: '0.5rem', color: rarityColor }} />
          Reward: {achievement.reward}
        </div>
      </div>
    );
  };

  

  const CarouselSection = ({ category, title, items }) => {
const itemsPerPage = 3;
  const maxSlides = getMaxSlides(items, itemsPerPage);
  const currentSlide = currentSlides[category];

  const showNavigation = items.length > itemsPerPage;

  const pagedItems = items.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <div className="category-wrapper">
      <h2 className="section-title">
        <FontAwesomeIcon 
          icon={
            category === 'achievements' ? faTrophy :
            category === 'badges' ? faMedal :
            faCrown
          }
          className="section-icon"
        />
        {title}
      </h2>

      <div className="achievements-carousel">
        {showNavigation && (
          <button
            className="nav-button prev"
            onClick={() => scrollToPrevSlide(category)}
            disabled={currentSlide === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        <div className="achievements-scroll">
          <div className="achievements-grid">
            {pagedItems.map((item) => (
              <AchievementCard
                key={item.id}
                achievement={item}
              />
            ))}
          </div>
        </div>

        {showNavigation && (
          <button
            className="nav-button next"
            onClick={() => scrollToNextSlide(category)}
            disabled={currentSlide === maxSlides}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>

      {showNavigation && (
        <div className="carousel-dots">
          {[...Array(maxSlides + 1)].map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => scrollToSlide(category, index)}
            >
              <FontAwesomeIcon icon={faCircle} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


  return (
    <div className="offset achievements-page">
      <div className="achievements-container">
        <div className="achievements-header">
          <h1>Achievements & Rewards</h1>
          <p>Track your progress and unlock exclusive rewards</p>
        </div>

        <CarouselSection 
          category="achievements"
          title="Achievements"
          items={categories.achievements}
        />

        <CarouselSection 
          category="badges"
          title="Badges"
          items={categories.badges}
        />

        <CarouselSection 
          category="rewards"
          title="Rewards"
          items={categories.rewards}
        />
      </div>
    </div>
  );
};

export default Achievements;
