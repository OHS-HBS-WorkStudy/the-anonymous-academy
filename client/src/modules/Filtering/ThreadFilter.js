import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  Checkbox,
  FormControlLabel,
  TextField,
  Chip,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';

const FilterPanelContainer = styled(motion(Paper))(({ theme }) => ({
  position: 'fixed',
  top: 60,
  right: 0,
  width: '100%',
  maxWidth: 350,
  height: '100%',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[8],
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    maxWidth: 400,
  },
}));

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const FilterHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5, 3),
  margin: theme.spacing(3),
  fontWeight: 'bold',
  boxShadow: theme.shadows[3],
  '&:hover': {
    boxShadow: theme.shadows[6],
  }
}));

const ClearButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: theme.spacing(0.5, 1),
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.secondary, 0.04),
  }
}));

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 35 }
  },
  exit: {
    x: '100%',
    transition: { type: "spring", stiffness: 300, damping: 35 }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function ThreadFilter({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
}) {
  const theme = useTheme();

  const [localSortOptions, setLocalSortOptions] = useState(currentFilters.sortOptions || {
    answered: false, views: false, comments: false, likes: false
  });
  const [localStartDate, setLocalStartDate] = useState(currentFilters.dateRange?.startDate || null);
  const [localEndDate, setLocalEndDate] = useState(currentFilters.dateRange?.endDate || null);
  const [localTags, setLocalTags] = useState(currentFilters.tags || []);
  const [localItemsPerPage, setLocalItemsPerPage] = useState(currentFilters.itemsPerPage || 6);

  const [newTagInput, setNewTagInput] = useState('');
  const tagInputRef = useRef(null);
  const filterPanelRef = useRef(null);

  useEffect(() => {
    setLocalSortOptions(currentFilters.sortOptions || { answered: false, views: false, comments: false, likes: false });
    setLocalStartDate(currentFilters.dateRange?.startDate || null);
    setLocalEndDate(currentFilters.dateRange?.endDate || null);
    setLocalTags(currentFilters.tags || []);
    setLocalItemsPerPage(currentFilters.itemsPerPage || 6);
  }, [currentFilters]);

  const handleSortOptionChange = useCallback((event) => {
    setLocalSortOptions(prev => ({
      ...prev,
      [event.target.name]: event.target.checked
    }));
  }, []);

  const handleNewTagInputChange = useCallback((event) => {
    setNewTagInput(event.target.value);
  }, []);

  const handleAddTag = useCallback((e) => {
    if (e.key === 'Enter' && newTagInput.trim() !== '') {
      let tagToAdd = newTagInput.trim().toLowerCase();
      if (!tagToAdd.startsWith('#')) tagToAdd = '#' + tagToAdd;
      if (!localTags.includes(tagToAdd)) {
        setLocalTags(prev => [...prev, tagToAdd]);
      }
      setNewTagInput('');
    }
  }, [newTagInput, localTags]);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setLocalTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const handleQuickDateRange = useCallback((range) => {
    const today = new Date();
    let start = null;
    let end = today;

    switch (range) {
      case 'Today':
        start = today;
        break;
      case 'Last 7 Days':
        start = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'This Month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'Last Month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        break;
    }

    setLocalStartDate(start ? start.toISOString().split('T')[0] : null);
    setLocalEndDate(end ? end.toISOString().split('T')[0] : null);
  }, []);

  const handleClearSort = useCallback(() => {
    setLocalSortOptions({ answered: false, views: false, comments: false, likes: false });
  }, []);

  const handleClearDateRange = useCallback(() => {
    setLocalStartDate(null);
    setLocalEndDate(null);
  }, []);

  const handleClearTags = useCallback(() => {
    setLocalTags([]);
    setNewTagInput('');
  }, []);

  const handleClearItemsPerPage = useCallback(() => {
    setLocalItemsPerPage(6);
  }, []);

  const handleApply = useCallback(() => {
    onApplyFilters({
      sortOptions: localSortOptions,
      dateRange: { startDate: localStartDate, endDate: localEndDate },
      tags: localTags,
      itemsPerPage: localItemsPerPage,
    });
    onClose();
  }, [onApplyFilters, onClose, localSortOptions, localStartDate, localEndDate, localTags, localItemsPerPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              top: 60,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(3px)',
              zIndex: 1200,
            }}
          />

          <FilterPanelContainer
            ref={filterPanelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FilterHeader sx={{ pl: 3, pr: 1, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Filters</Typography>
              <IconButton onClick={onClose} size="large"><CloseIcon /></IconButton>
            </FilterHeader>

            <FilterSection>
              <FilterHeader>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Sort By</Typography>
                <ClearButton onClick={handleClearSort}>Clear</ClearButton>
              </FilterHeader>
              <Stack spacing={1}>
                {[
                  { name: 'answered', label: 'Answered' },
                  { name: 'views', label: 'Most Views' },
                  { name: 'comments', label: 'Most Comments' },
                  { name: 'likes', label: 'Most Likes' },
                ].map((option) => (
                  <FormControlLabel
                    key={option.name}
                    control={
                      <Checkbox
                        checked={localSortOptions[option.name]}
                        onChange={handleSortOptionChange}
                        name={option.name}
                      />
                    }
                    label={<Typography variant="body2">{option.label}</Typography>}
                  />
                ))}
              </Stack>
            </FilterSection>

            <FilterSection>
              <FilterHeader>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Date Range</Typography>
                <ClearButton onClick={handleClearDateRange}>Clear</ClearButton>
              </FilterHeader>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="From"
                  type="date"
                  value={localStartDate || ''}
                  onChange={(e) => setLocalStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ flexGrow: 1 }}
                  size="small"
                />
                <TextField
                  label="To"
                  type="date"
                  value={localEndDate || ''}
                  onChange={(e) => setLocalEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ flexGrow: 1 }}
                  size="small"
                />
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {['Today', 'Last 7 Days', 'This Month', 'Last Month'].map(option => (
                  <Chip
                    key={option}
                    label={option}
                    onClick={() => handleQuickDateRange(option)}
                    variant="outlined"
                    color="primary"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08)
                      }
                    }}
                  />
                ))}
              </Stack>
            </FilterSection>

            <FilterSection>
              <FilterHeader>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tags</Typography>
                <ClearButton onClick={handleClearTags}>Clear</ClearButton>
              </FilterHeader>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={localTags.length === 0 ? "Add tags (e.g., #react)" : ""}
                value={newTagInput}
                onChange={handleNewTagInputChange}
                onKeyDown={handleAddTag}
                size="small"
                sx={{ mb: 1.5 }}
                InputProps={{
                  startAdornment: newTagInput.startsWith('#') || localTags.length > 0 ? null : <InputAdornment position="start">#</InputAdornment>
                }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <AnimatePresence>
                  {localTags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Chip
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 'medium',
                          '& .MuiChip-deleteIcon': { color: theme.palette.primary.main },
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Stack>
            </FilterSection>

            <FilterSection sx={{ borderBottom: 'none' }}>
              <FilterHeader>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Items Per Page</Typography>
                <ClearButton onClick={handleClearItemsPerPage}>Clear</ClearButton>
              </FilterHeader>
              <TextField
                fullWidth
                type="number"
                min="1"
                label="Number of items"
                value={localItemsPerPage}
                onChange={(e) => setLocalItemsPerPage(Number(e.target.value) || 0)}
                size="small"
              />
            </FilterSection>

            <ApplyButton variant="contained" color="primary" onClick={handleApply}>
              Apply Filters
            </ApplyButton>
          </FilterPanelContainer>
        </>
      )}
    </AnimatePresence>
  );
}
