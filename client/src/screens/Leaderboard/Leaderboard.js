import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// MUI Imports
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Grid,
  Button,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

const StyledLeaderboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
}));

const RankNumber = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  minWidth: '30px', 
  textAlign: 'right',
}));

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('rank'); // Default to 'rank' for initial display
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialLeaderboardData = [
    { userId: 1, username: 'AlphaCoder', score: 1500, avatarUrl: 'https://via.placeholder.com/50/FF0000', region: 'NA', userType: 'student' },
    { userId: 2, username: 'BetaTester', score: 1250, avatarUrl: 'https://via.placeholder.com/50/00FF00', region: 'EU', userType: 'teacher' },
    { userId: 3, username: 'GammaGeek', score: 1100, avatarUrl: 'https://via.placeholder.com/50/0000FF', region: 'ASIA', userType: 'student' },
    { userId: 4, username: 'DeltaDev', score: 980, avatarUrl: 'https://via.placeholder.com/50/FFFF00', region: 'NA', userType: 'parent' },
    { userId: 5, username: 'EpsilonEnthusiast', score: 850, avatarUrl: 'https://via.placeholder.com/50/00FFFF', region: 'EU', userType: 'student' },
    { userId: 6, username: 'ZetaZoom', score: 720, avatarUrl: 'https://via.placeholder.com/50/FF00FF', region: 'ASIA', userType: 'teacher' },
    { userId: 7, username: 'EtaHacker', score: 600, avatarUrl: 'https://via.placeholder.com/50/C0C0C0', region: 'NA', userType: 'student' },
    { userId: 8, username: 'ThetaThinker', score: 510, avatarUrl: 'https://via.placeholder.com/50/808080', region: 'EU', userType: 'parent' },
    { userId: 9, username: 'IotaInnovator', score: 450, avatarUrl: 'https://via.placeholder.com/50/FFA500', region: 'ASIA', userType: 'student' },
    { userId: 10, username: 'KappaKing', score: 390, avatarUrl: 'https://via.placeholder.com/50/800080', region: 'NA', userType: 'teacher' },
    { userId: 11, username: 'LambdaLion', score: 1600, avatarUrl: 'https://via.placeholder.com/50/008000', region: 'EU', userType: 'student' },
    { userId: 12, username: 'MuMaster', score: 1050, avatarUrl: 'https://via.placeholder.com/50/800000', region: 'ASIA', userType: 'parent' },
    { userId: 13, username: 'NuNinja', score: 920, avatarUrl: 'https://via.placeholder.com/50/000080', region: 'NA', userType: 'student' },
    { userId: 14, username: 'XiXpert', score: 780, avatarUrl: 'https://via.placeholder.com/50/808000', region: 'EU', userType: 'teacher' },
    { userId: 15, username: 'OmicronOracle', score: 650, avatarUrl: 'https://via.placeholder.com/50/4682B4', region: 'ASIA', userType: 'student' },
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
      filtered = filtered.filter(user => user.userType === filterOption);
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
        filtered.sort((a, b) => b.score - a.score);
        break;
    }

    return filtered;
  }, [leaderboardData, filterOption, searchTerm, sortOption]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setCurrentPage(1); 
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
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
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading leaderboard...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography color="error" variant="h6">Error loading leaderboard: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}> {/* Using MUI Container for max-width and margin */}
      <motion.div variants={headerVariants} initial="hidden" animate="visible">
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Global Leaders
        </Typography>

        <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 4 }}>
          {/* Search Bar */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search User"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Filter Dropdown */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="region-filter-label">User Type</InputLabel>
              <Select
                labelId="region-filter-label"
                id="regionFilter"
                value={filterOption}
                onChange={handleFilterChange}
                label="User Type"
                startAdornment={<FilterListIcon color="action" sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort Dropdown */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-order-label">Sort by</InputLabel>
              <Select
                labelId="sort-order-label"
                id="sortOrder"
                value={sortOption}
                onChange={handleSortChange}
                label="Sort by"
                startAdornment={<SortIcon color="action" sx={{ mr: 1 }} />}
              >
                <MenuItem value="score">User Score</MenuItem>
                <MenuItem value="rank">Rank</MenuItem>
                <MenuItem value="username">Username</MenuItem>
                {/* Add options for 'questions' and 'answers' if they become part of your data model */}
                {/* <MenuItem value="questions">Questions</MenuItem>
                <MenuItem value="answers">Answers</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </motion.div>

      <StyledLeaderboardPaper elevation={3}> {/* Using custom styled Paper */}
        <List component={motion.ol} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: 0 }}>
          <AnimatePresence>
            {currentItems.map((user) => (
              <StyledListItem
                key={user.userId}
                component={motion.li}
                variants={listItemVariants}
                whileHover="hover"
                whileTap="tap"
                exit={{ opacity: 0, y: -10 }}
              >
                <RankNumber variant="h6">{user.rank}</RankNumber>
                <ListItemAvatar>
                  <Avatar src={user.avatarUrl} alt={user.username} sx={{ width: 50, height: 50 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">{user.username}</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">{user.score} Points</Typography>}
                />
              </StyledListItem>
            ))}
            {currentItems.length === 0 && !loading && (
              <ListItem>
                <ListItemText primary={<Typography align="center">No matching results.</Typography>} />
              </ListItem>
            )}
          </AnimatePresence>
        </List>
      </StyledLeaderboardPaper>


      {filteredData.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            renderItem={(item) => (
              <motion.div
                key={item.page}
                variants={paginationItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button {...item} disabled={item.type === 'start-ellipsis' || item.type === 'end-ellipsis'} />
              </motion.div>
            )}
          />
        </Box>
      )}
    </Container>
  );
}