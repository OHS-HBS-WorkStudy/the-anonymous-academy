import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Stack,
  Paper,
  Chip,
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  AccessTime as LatestIcon,
  LocalFireDepartment as PopularIcon,
  AddCircleOutline as AddIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

import ThreadListHeader from './ThreadListHeader.js';
import ThreadCard from './ThreadCard.js';
import TrendingThreads from './TrendingThreads.js';
import NoThreadsMessage from './NoThreadsMessage.js';
import ThreadFilter from '../../modules/Filtering/ThreadFilter.js';

import { useThreadListLogic } from './useThreadListLogic.js';

// Styled components remain the same as they are not directly related to the main layout adjustments
const StyledThreadGrid = styled(Grid)(({ theme }) => ({

}));

const StyledSearchBarPaper = styled(motion(Paper))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['box-shadow', 'border-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    boxShadow: theme.shadows[3],
    borderColor: theme.palette.primary.light,
  },
  '&.Mui-focused': {
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.primary.main,
  },
}));

// Create a styled component for the main container, similar to PageContainer in Home.js
const PageContainer = styled(motion.div)(({ theme }) => ({
  // These values should align with your actual sidebar width and top nav height
  // For example, if your sidebar is 240px wide and your top nav is 60px tall:
  paddingTop: '60px', // Height of your top navigation bar
  paddingLeft: '60px', // Width of your sidebar
  minHeight: '100vh',
  boxSizing: 'border-box',
  overflowY: 'auto', // Allows scrolling if content overflows vertically
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),

  [theme.breakpoints.down('md')]: { // Adjust for smaller screens where sidebar might collapse or disappear
    paddingLeft: theme.spacing(3), // Or 0 if sidebar is hidden
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function ThreadListView() {
  const theme = useTheme();
  const {
    goToNewThread,
    allThreads,
    searchText,
    sortOrder,
    advancedFilters,
    isLoading,
    isFilterPanelOpen,
    filteredAndSortedThreads,
    currentThreads,
    hasMoreThreads,
    handleSearchChange,
    handleClearSearch,
    handleSortChange,
    handleClearSortToggle,
    handleLoadMore,
    handleOpenFilterPanel,
    handleCloseFilterPanel,
    handleApplyAdvancedFilters,
    handleClearAllFilters,
    areAdvancedFiltersActive,
    displayedThreadsCount,
  } = useThreadListLogic();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };


  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <ThreadListHeader
              allThreadsLength={allThreads.length}
              goToNewThread={goToNewThread}
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 2 }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 4, flexWrap: 'wrap' }}
            >
              <StyledSearchBarPaper
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                whileFocus={{ boxShadow: theme.shadows[6] }}
                sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: '200px' } }}
              >
                <TextField
                  variant="standard"
                  placeholder="Search threads..."
                  value={searchText}
                  onChange={handleSearchChange}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" sx={{ mr: 1 }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchText && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClearSearch} edge="end" size="small">
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      fontSize: '0.9rem',
                      height: '40px',
                      '& .MuiInputBase-input': { py: 0.5 },
                    }
                  }}
                  sx={{ flexGrow: 1 }}
                />
              </StyledSearchBarPaper>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                sx={{ ml: { xs: 0, sm: theme.spacing(2) } }}
              >
                <ToggleButtonGroup
                  value={sortOrder}
                  exclusive
                  onChange={handleSortChange}
                  aria-label="thread sort order"
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: theme.shape.borderRadius * 2,
                    overflow: 'hidden',

                    '& .MuiToggleButtonGroup-grouped': {
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 0, 
                      padding: '6px 12px',
                      fontWeight: 500,
                      textTransform: 'none',
                      color: theme.palette.text.primary,
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      },
                      '&:not(:first-of-type)': {
                        borderLeft: 'none', // Prevent double border
                      },
                    },

                    '& .MuiToggleButtonGroup-grouped:first-of-type': {
                      borderTopLeftRadius: theme.shape.borderRadius * 2,
                      borderBottomLeftRadius: theme.shape.borderRadius * 2,
                    },

                    '& .MuiToggleButtonGroup-grouped:last-of-type': {
                      borderTopRightRadius: theme.shape.borderRadius * 2,
                      borderBottomRightRadius: theme.shape.borderRadius * 2,
                    },
                  }}
                >
                  <ToggleButton value="newest" aria-label="latest posts">
                    <LatestIcon fontSize="small" sx={{ mr: 0.5 }} /> Latest
                  </ToggleButton>
                  <ToggleButton value="popular" aria-label="most popular posts">
                    <PopularIcon fontSize="small" sx={{ mr: 0.5 }} /> Popular
                  </ToggleButton>
                  {sortOrder === 'custom' && (
                    <ToggleButton value="custom" aria-label="custom sort" disabled>
                      Custom Sort
                    </ToggleButton>
                  )}
                </ToggleButtonGroup>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                sx={{ ml: { xs: 0, sm: theme.spacing(2) } }}
              >
                <Button
                  variant="outlined"
                  onClick={handleOpenFilterPanel}
                  startIcon={<FilterIcon />}
                  sx={{
                    borderRadius: theme.shape.borderRadius * 2,
                    height: '40px',
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    }
                  }}
                >
                  Filters
                </Button>
              </motion.div>
            </Stack>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{ minHeight: theme.spacing(4), marginBottom: theme.spacing(3) }}
            >
              <AnimatePresence>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {searchText && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={`Search: "${searchText}"`}
                        onDelete={handleClearSearch}
                        color="primary"
                        variant="outlined"
                        deleteIcon={<CloseIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </motion.div>
                  )}
                  {sortOrder === 'popular' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={`Sorted by: Popular`}
                        onDelete={handleClearSortToggle}
                        color="secondary"
                        variant="outlined"
                        deleteIcon={<CloseIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </motion.div>
                  )}
                  {sortOrder === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={`Sorted by: Custom`}
                        onDelete={() => handleApplyAdvancedFilters({ ...advancedFilters, sortOptions: { answered: false, views: false, comments: false, likes: false } })}
                        color="secondary"
                        variant="outlined"
                        deleteIcon={<CloseIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </motion.div>
                  )}
                  {advancedFilters.tags && advancedFilters.tags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={`Tags: ${advancedFilters.tags.join(', ')}`}
                        onDelete={() => handleApplyAdvancedFilters({ ...advancedFilters, tags: [] })}
                        color="info"
                        variant="outlined"
                        deleteIcon={<CloseIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </motion.div>
                  )}
                  {(advancedFilters.dateRange?.startDate || advancedFilters.dateRange?.endDate) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={`Date: ${advancedFilters.dateRange.startDate || 'Any'} - ${advancedFilters.dateRange.endDate || 'Any'}`}
                        onDelete={() => handleApplyAdvancedFilters({ ...advancedFilters, dateRange: { startDate: null, endDate: null } })}
                        color="success"
                        variant="outlined"
                        deleteIcon={<CloseIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </motion.div>
                  )}
                  {advancedFilters.itemsPerPage !== 6 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={`Showing: ${advancedFilters.itemsPerPage} per page`}
                        onDelete={() => handleApplyAdvancedFilters({ ...advancedFilters, itemsPerPage: 6 })}
                        color="warning"
                        variant="outlined"
                        deleteIcon={<CloseIcon />}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </motion.div>
                  )}

                  {areAdvancedFiltersActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label="Clear All Filters"
                        onClick={handleClearAllFilters}
                        color="error"
                        variant="filled"
                        icon={<ClearIcon />}
                        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                      />
                    </motion.div>
                  )}
                </Stack>
              </AnimatePresence>
            </motion.div>


            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress color="primary" size={60} />
              </Box>
            ) : (
              currentThreads && currentThreads.length > 0 ? (
                <StyledThreadGrid container spacing={0}>
                  <AnimatePresence>
                    {currentThreads.map((thread) => (
                      <Grid item xs={12} key={thread.thread_id}>
                        <motion.div
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <ThreadCard thread={thread} />
                        </motion.div>
                      </Grid>
                    ))}
                  </AnimatePresence>
                </StyledThreadGrid>
              ) : (
                <NoThreadsMessage goToNewThread={goToNewThread} />
              )
            )}

            {hasMoreThreads && !isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleLoadMore}
                  endIcon={<AddIcon />}
                  sx={{
                    borderRadius: theme.shape.borderRadius * 3,
                    px: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Load More Threads ({filteredAndSortedThreads.length - displayedThreadsCount} remaining)
                </Button>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <TrendingThreads />
          </Grid>
        </Grid>
      </Box>

      <ThreadFilter
        isOpen={isFilterPanelOpen}
        onClose={handleCloseFilterPanel}
        currentFilters={advancedFilters}
        onApplyFilters={handleApplyAdvancedFilters}
      />
    </PageContainer>
  );
}