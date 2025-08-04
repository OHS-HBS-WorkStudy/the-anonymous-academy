import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  AccessTime as LatestIcon,
  LocalFireDepartment as PopularIcon,
  AddCircleOutline as AddIcon,
} from '@mui/icons-material';

import BentoBox from './BentoBox.js';
import ThreadCard from '../Thread List/ThreadCard.js';
import WatchedTagsPanel from './WatchedTagsPanel.js';
import NoThreadsMessage from '../Thread List/NoThreadsMessage.js';

const PageContainer = styled(motion.div)(({ theme }) => ({
  paddingTop: '45px',
  paddingLeft: '30px',
  minHeight: '100vh',
  boxSizing: 'border-box',
  overflowY: 'auto',
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));


const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const ThreadGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export default function Home() {
  const theme = useTheme();

  const allThreads = JSON.parse(sessionStorage.getItem("data")) || [];
  const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

  const [isTagsPanelOpen, setIsTagsPanelOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [displayCount, setDisplayCount] = useState(6);
  const threadsPerLoad = 6;

  const toggleTagsPanel = () => {
    setIsTagsPanelOpen((prevState) => !prevState);
  };

  const handleSortChange = (event, newSortOrder) => {
    if (newSortOrder !== null) {
      setSortOrder(newSortOrder);
      setDisplayCount(threadsPerLoad);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + threadsPerLoad);
  };

  const displayedThreads = useMemo(() => {
    let sortedThreads = [...allThreads];
    if (sortOrder === 'newest') {
      sortedThreads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === 'popular') {
      sortedThreads.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    return sortedThreads.slice(0, displayCount);
  }, [allThreads, sortOrder, displayCount]);

  const hasMoreThreads = displayedThreads.length < allThreads.length;

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: theme.spacing(4) }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            <Typography component="span" variant="inherit" color="text.secondary">
              Welcome back,&nbsp;
            </Typography>
            <Typography component="span" variant="inherit" color="primary.main">
              {foundUser?.first_name} {foundUser?.last_name}!
            </Typography>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore discussions and share your knowledge
          </Typography>
        </motion.div>

        <BentoBox sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <SectionHeader>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mr: 2 }}>
                  Interests
                </Typography>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Divider sx={{ flexGrow: 1 }} />
                </motion.div>
              </Box>

              <ToggleButtonGroup
                value={sortOrder}
                exclusive
                onChange={handleSortChange}
                aria-label="thread sort order"
                size="small"
              >
                <ToggleButton
                  value="newest"
                  sx={{
                    fontWeight: 'bold',
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <LatestIcon sx={{ mr: 0.5 }} /> Latest
                </ToggleButton>
                <ToggleButton
                  value="popular"
                  sx={{
                    fontWeight: 'bold',
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <PopularIcon sx={{ mr: 0.5 }} /> Popular
                </ToggleButton>
              </ToggleButtonGroup>
            </SectionHeader>

            {displayedThreads.length > 0 ? (
              <ThreadGridContainer>
                {displayedThreads.map((thread, index) => (
                  <motion.div
                    key={thread.thread_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ThreadCard thread={thread} />
                  </motion.div>
                ))}
              </ThreadGridContainer>
            ) : (
              <NoThreadsMessage />
            )}

            {hasMoreThreads && (
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
                    }
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Load More Posts
                </Button>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                height: '100%',
                minHeight: '200px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius * 2,
                boxShadow: theme.shadows[3],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.disabled,
                padding: theme.spacing(3),
              }}
            >
              <Typography variant="h6" textAlign="center">
                More Sections Coming Soon!
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <WatchedTagsPanel isOpen={isTagsPanelOpen} togglePanel={toggleTagsPanel} />
    </PageContainer>
  );
}
