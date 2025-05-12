import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';


export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('rank');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialLeaderboardData = [
    { userId: 1, username: 'AlphaCoder', score: 1500, avatarUrl: 'https://via.placeholder.com/50/FF0000', region: 'NA' },
    { userId: 2, username: 'BetaTester', score: 1250, avatarUrl: 'https://via.placeholder.com/50/00FF00', region: 'EU' },
    { userId: 3, username: 'GammaGeek', score: 1100, avatarUrl: 'https://via.placeholder.com/50/0000FF', region: 'ASIA' },
    { userId: 4, username: 'DeltaDev', score: 980, avatarUrl: 'https://via.placeholder.com/50/FFFF00', region: 'NA' },
    { userId: 5, username: 'EpsilonEnthusiast', score: 850, avatarUrl: 'https://via.placeholder.com/50/00FFFF', region: 'EU' },
    { userId: 6, username: 'ZetaZoom', score: 720, avatarUrl: 'https://via.placeholder.com/50/FF00FF', region: 'ASIA' },
    { userId: 7, username: 'EtaHacker', score: 600, avatarUrl: 'https://via.placeholder.com/50/C0C0C0', region: 'NA' },
    { userId: 8, username: 'ThetaThinker', score: 510, avatarUrl: 'https://via.placeholder.com/50/808080', region: 'EU' },
    { userId: 9, username: 'IotaInnovator', score: 450, avatarUrl: 'https://via.placeholder.com/50/FFA500', region: 'ASIA' },
    { userId: 10, username: 'KappaKing', score: 390, avatarUrl: 'https://via.placeholder.com/50/800080', region: 'NA' },
    { userId: 11, username: 'LambdaLion', score: 1600, avatarUrl: 'https://via.placeholder.com/50/008000', region: 'EU' },
    { userId: 12, username: 'MuMaster', score: 1050, avatarUrl: 'https://via.placeholder.com/50/800000', region: 'ASIA' },
    { userId: 13, username: 'NuNinja', score: 920, avatarUrl: 'https://via.placeholder.com/50/000080', region: 'NA' },
    { userId: 14, username: 'XiXpert', score: 780, avatarUrl: 'https://via.placeholder.com/50/808000', region: 'EU' },
    { userId: 15, username: 'OmicronOracle', score: 650, avatarUrl: 'https://via.placeholder.com/50/4682B4', region: 'ASIA' },
  ];

  useEffect(() => {
    setTimeout(() => {
      const rankedData = initialLeaderboardData.sort((a, b) => b.score - a.score).map((user, index) => ({ ...user, rank: index + 1 }));
      setLeaderboardData(rankedData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredData = React.useMemo(() => {
    let filtered = leaderboardData;

    if (filterOption !== 'all') {
      filtered = filtered.filter(user => user.region === filterOption);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    switch (sortOption) {
      case 'rank':
        filtered.sort((a, b) => a.rank - b.rank);
        break;
      case 'score':
        filtered.sort((a, b) => b.score - a.score);
        break;
      case 'username':
        filtered.sort((a, b) => a.username.localeCompare(b.username));
        break;
      default:
        break;
    }

    return filtered;
  }, [leaderboardData, filterOption, searchTerm, sortOption]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page on search
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 0.05 } },
  };

  const paginationItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  if (loading) {
    return <motion.div className="loadingState">Loading leaderboard...</motion.div>;
  }

  if (error) {
    return <motion.div className="errorState">Error loading leaderboard: {error}</motion.div>;
  }

  return (
    <div className='offset'>
    <motion.div className="leaderboardPage">
      <motion.div className="leaderboardHeaderSection" variants={headerVariants} initial="hidden" animate="visible">
        <motion.h1 className="leaderboardTitle">Global Leaders</motion.h1>

        <div className="leaderboardControls">
            <div className="controlGroup searchBar">
                <label htmlFor="searchInput">
                <FontAwesomeIcon icon={faSearch} className="controlIcon" /> Search User
                </label>
                <div className="inputWithIcon">
                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search username..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="searchInput"
                />
                </div>
            </div>

            <div className="controlGroup filterDropdown">
                <label htmlFor="regionFilter">
                <FontAwesomeIcon icon={faFilter} className="controlIcon" /> User Type
                </label>
                <select
                id="regionFilter"
                value={filterOption}
                onChange={handleFilterChange}
                className="selectInput"
                >
                <option value="all">All</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                </select>
            </div>

            <div className="controlGroup sortDropdown">
                <label htmlFor="sortOrder">
                <FontAwesomeIcon icon={faSort} className="controlIcon" /> Sort by
                </label>
                <select
                id="sortOrder"
                value={sortOption}
                onChange={handleSortChange}
                className="selectInput"
                >
                <option value="">User Score</option>
                <option value="questions">Questions</option>
                <option value="answers">Answers</option>
                </select>
            </div>
            </div>
      </motion.div>

      <motion.ol className="leaderboardList" variants={containerVariants} initial="hidden" animate="visible">
        <AnimatePresence>
          {currentItems.map((user) => (
            <motion.li
              key={user.userId}
              className="leaderboardItem"
              variants={listItemVariants}
              whileHover="hover"
              whileTap="tap"
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="rankNumber">{user.rank}</span>
              <div className="avatarWrapper">
                {user.avatarUrl && <img src={user.avatarUrl} alt={user.username} className="userAvatar" />}
                {!user.avatarUrl && <div className="noUserAvatar"></div>}
              </div>
              <span className="userName">{user.username}</span>
              <span className="userScore">{user.score} Points</span>
            </motion.li>
          ))}
          {currentItems.length === 0 && !loading && (
            <motion.li className="noResults">No matching results.</motion.li>
          )}
        </AnimatePresence>
      </motion.ol>

      {filteredData.length > itemsPerPage && (
        <motion.div className="pagination" variants={paginationVariants} initial="hidden" animate="visible">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
            <motion.button
              key={number}
              onClick={() => paginate(number)}
              className={`pageButton ${currentPage === number ? 'active' : ''}`}
              variants={paginationItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {number}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
    </div>
  );
};
