import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  Box,
  Typography,
  TextField,
  Chip,
  InputAdornment,
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';


const AddTagsContainer = styled(motion(Box))(({ theme }) => ({

}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.input,
    boxShadow: theme.shadows[1],
    transition: 'all 0.3s ease-in-out',
    '& fieldset': {
      borderColor: theme.palette.divider,
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.light,
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
}));

const StyledChip = styled(motion(Chip))(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main, 
  color: theme.palette.secondary.contrastText, 
  borderRadius: theme.shape.borderRadius, 
  fontWeight: theme.typography.fontWeightMedium,

  '& .MuiChip-deleteIcon': {
    color: alpha(theme.palette.secondary.contrastText, 0.8), 
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.secondary.contrastText, 
    },
  },

  transformOrigin: 'center center',
}));


export default function AddTags({ tags, setTags }) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("#"); 
  const [tagRemoving, setTagRemoving] = useState(null);


  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const tagVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: "easeInOut" } },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    const savedTags = sessionStorage.getItem("tags");
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, [setTags]);

  useEffect(() => {
    sessionStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);


  const tagInputChange = (e) => {
    let value = e.target.value;
    if (value.length > 0 && !value.startsWith('#')) {
      value = '#' + value;
    }
    if (value.startsWith('##')) {
      value = '#' + value.substring(1);
    }
    setInputValue(value);
  };

  const addTagsFromInput = (input) => {
    if (!input || input === '#') {
      setInputValue("#");
      return;
    }

    const rawTags = input.split(',').map(tag => tag.trim()).filter(Boolean); 
    const newTagsToAdd = [];
    let tagsAddedThisBatch = 0;

    for (let rawTag of rawTags) {
      if (!rawTag.startsWith('#')) {
        rawTag = '#' + rawTag;
      }
      if (rawTag.length > 1 && !tags.includes(rawTag) && !newTagsToAdd.includes(rawTag)) {
        if (tags.length + tagsAddedThisBatch < 10) {
          newTagsToAdd.push(rawTag);
          tagsAddedThisBatch++;
        } else {
          alert("You can only add up to 10 tags. Some tags were not added.");
          break; 
        }
      } else if (rawTag.length > 0) {
        if (rawTags.length === 1 && (rawTag.length <= 1 || tags.includes(rawTag))) {
          alert("Tag must start with '#', be at least 2 characters long, and be unique.");
        }
      }
    }

    if (newTagsToAdd.length > 0) {
      setTags((prev) => [...prev, ...newTagsToAdd]);
    }
    setInputValue("#"); 
  };

  const enterCheck = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagsFromInput(inputValue);
    }
  };

  const handleBlur = () => {
    if (inputValue.length > 1 && inputValue !== '#') { 
      addTagsFromInput(inputValue);
    } else {
      setInputValue("#"); 
    }
  };

  const removeTag = (tagToRemove) => {
    setTagRemoving(tagToRemove); 
    setTimeout(() => {
      setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
      setTagRemoving(null); 
    }, tagVariants.exit.transition.duration * 1000); 
  };

  return (
    <AddTagsContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ mb: 3 }} 
    >
      <Typography variant="h6" component="label" htmlFor="tag-input" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: theme.palette.text.primary }}>
        <FontAwesomeIcon icon={faTag} style={{ marginRight: theme.spacing(1), fontSize: '1.2rem', color: theme.palette.primary.main }} /> Tags
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Add relevant tags to categorize your thread (e.g., 'Algebra 2', 'Euro History'). Separate tags with commas or press Enter for each tag.
      </Typography>

      <Box sx={{ position: 'relative', mb: 2 }}> 
        <StyledTextField
          id="tag-input"
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={tagInputChange}
          onKeyDown={enterCheck}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? "Enter tag(s) with # or comma-separated (e.g., #MUI, #React)" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', pr: 1 }}>
                  {tags.length}/10
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: theme.spacing(1) }}> {/* Container for displayed tags */}
        <AnimatePresence>
          {tags.map((tag) => (
            <StyledChip
              key={tag} 
              label={tag}
              onDelete={() => removeTag(tag)} 
              deleteIcon={
                <motion.div variants={{ hover: { rotate: 90 } }} transition={{ duration: 0.15 }}>
                  <FontAwesomeIcon icon={faTimes} />
                </motion.div>
              }
              clickable
              className={tagRemoving === tag ? "removing" : ""}
              variants={tagVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
            />
          ))}
        </AnimatePresence>
      </Box>
    </AddTagsContainer>
  );
}