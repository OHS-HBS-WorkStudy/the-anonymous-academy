import React from 'react';
import { motion } from 'framer-motion';

import { Box, Typography, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { AddCircleOutline as AddIcon } from '@mui/icons-material';

import CountUpComponent from '../../modules/I-Candy/CountUp.js';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const TitleSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        width: 'auto',  
        marginBottom: 0,
    },
}));

const CountSection = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3), 
    },
}));

const CreateThreadButton = styled(motion(Button))(({ theme }) => ({
    minWidth: '80px',
    padding: theme.spacing(1, 2.5),
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightBold,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[4],
    },
}));

export default function ThreadListHeader({ allThreadsLength, goToNewThread }) {
  const theme = useTheme();

  return (
    <HeaderContainer>
      <TitleSection>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
          Thread Directory
        </Typography>
        {allThreadsLength > 1 && (
          <CreateThreadButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={goToNewThread}
            whileHover="hover"
            whileTap="tap"
            sx={{ ml: { xs: 0, md: 3 } }}
          >
            New Thread
          </CreateThreadButton>
        )}
      </TitleSection>

      <CountSection variant="h6">
        Questions:
        <Typography component="span" sx={{ ml: 1, color: theme.palette.primary.main, fontWeight: 'bold' }}>
          <CountUpComponent endValue={allThreadsLength} duration={3.8} />
        </Typography>
      </CountSection>
    </HeaderContainer>
  );
}