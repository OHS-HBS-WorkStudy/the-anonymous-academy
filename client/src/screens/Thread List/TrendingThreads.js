import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

const TrendingThreadsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  height: 'auto',
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    top: 'calc(60px + 24px)',
    maxHeight: 'calc(100vh - 60px - 24px - 48px)',
    overflowY: 'auto',
  },
}));

const TrendingListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function TrendingThreads() {
  const theme = useTheme();

  const trendingThreads = [
    'Exploring the Future of AI in Creative Fields',
    'Best Practices for Writing Clean and Maintainable Code',
    'The Impact of Remote Work on Team Collaboration',
    'Share Your Favorite Productivity Hacks and Tools',
    'A Deep Dive into the Latest Advancements in Web Security',
    'Understanding Quantum Computing Basics',
    'Innovations in Sustainable Energy Solutions',
    'The Role of Blockchain in Decentralized Finance',
    'Effective Strategies for Digital Marketing in 2024',
    'Cybersecurity Threats: Staying Ahead of the Curve',
  ];

  return (
    <TrendingThreadsPaper>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TrendingUpIcon sx={{ mr: 1, color: theme.palette.info.main }} />
        Trending Threads
      </Typography>
      <List disablePadding>
        {trendingThreads.map((thread, index) => (
          <TrendingListItem key={index}>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {thread}
                </Typography>
              }
            />
          </TrendingListItem>
        ))}
      </List>
    </TrendingThreadsPaper>
  );
}
