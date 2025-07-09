import React from 'react';

import { Box, Typography, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { NoteAdd as NoteAddIcon } from '@mui/icons-material';

const NoThreadsContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const IconBox = styled(Box)(({ theme }) => ({
  fontSize: '4rem', 
  color: theme.palette.text.disabled, 
  marginBottom: theme.spacing(2),
}));

export default function NoThreadsMessage({ goToNewThread }) {
  const theme = useTheme();

  return (
    <NoThreadsContainer>
      <IconBox>📝</IconBox> 
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 1 }}>
        No Threads Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        There are currently no threads available in this category. Be the first to start a discussion!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<NoteAddIcon />}
        onClick={goToNewThread}
        sx={{
            padding: theme.spacing(1, 3),
            fontWeight: theme.typography.fontWeightBold,
            borderRadius: theme.shape.borderRadius,
        }}
      >
        Create New Thread
      </Button>
    </NoThreadsContainer>
  );
}