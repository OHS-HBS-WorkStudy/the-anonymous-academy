import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

// Styled Components

const PanelContainer = styled(motion(Paper))(({ theme }) => ({
  position: 'fixed',
  top: 60,
  right: 0,
  height: 'calc(100vh - 60px)',
  width: 320,
  maxWidth: '90vw',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[10],
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  zIndex: theme.zIndex.drawer,
  overflowY: 'auto',
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderBottomLeftRadius: theme.shape.borderRadius * 2,

  // Responsive: smaller width on mobile
  [theme.breakpoints.down('sm')]: {
    width: '80vw',
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const ToggleButton = styled(motion(IconButton))(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: theme.zIndex.drawer + 10,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[6],
  width: 48,
  height: 48,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[8],
  },
}));

const SearchInputContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  fontSize: '1rem',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0),
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 16,
  pointerEvents: 'none',
  color: theme.palette.action.active,
}));

const StyledChip = styled(motion(Chip))(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'transform 0.2s ease',
}));

// Component

export default function WatchedTagsPanel({ isOpen, togglePanel }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const panelVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '100%', opacity: 0 },
  };

  const buttonVariants = {
    open: { right: isMobile ? '80vw' : 320 },
    closed: { right: 0 },
  };

  // Example watched tags
  const watchedTags = [
    'javascript',
    'react',
    'design',
    'ai',
    'css',
    'html',
    'nodejs',
    'python',
    'databases',
    'security',
  ];

  return (
    <>
      <PanelContainer
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={panelVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        aria-hidden={!isOpen}
        role="region"
        aria-label="Watched tags panel"
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Watched Tags
        </Typography>

        <SearchInputContainer>
          <StyledInputBase
            placeholder="Enter tags to watch..."
            disabled 
            inputProps={{ 'aria-label': 'search watched tags' }}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </SearchInputContainer>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {watchedTags.map((tag, index) => (
            <StyledChip
              key={tag}
              label={`#${tag}`}
              size="medium"
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -2, scale: 1.05 }}
              onClick={() => alert(`Clicked tag: ${tag}`)}
              tabIndex={0}
              role="button"
              aria-pressed="false"
            />
          ))}
        </Box>
      </PanelContainer>

      <ToggleButton
        onClick={togglePanel}
        variants={buttonVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        aria-label={isOpen ? 'Close watched tags panel' : 'Open watched tags panel'}
        sx={{
          borderTopLeftRadius: theme.shape.borderRadius * 2,
          borderBottomLeftRadius: theme.shape.borderRadius * 2,
          boxShadow: 6,
        }}
      >
        {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </ToggleButton>
    </>
  );
}
