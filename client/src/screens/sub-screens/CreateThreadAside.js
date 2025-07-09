import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// MUI Imports
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  List, // For list items within guidelines
  ListItem, // For list items within guidelines
  ListItemIcon, // For icons next to list items
  ListItemText, // For text in list items
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'; // Removed 'alpha' from import
import {
  ExpandMore as ExpandMoreIcon, // MUI's expand/collapse icon
  CheckCircleOutline as CheckCircleOutlineIcon, // Example icon for list items
  InfoOutlined as InfoOutlinedIcon, // Example icon for list items
  ForumOutlined as ForumOutlinedIcon, // Example icon for communication
  DescriptionOutlined as DescriptionOutlinedIcon, // Example icon for content
} from '@mui/icons-material';

// --- Custom Styled Components ---

// Styled Paper for the main rules container
const StyledRulesPaper = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4], // Consistent shadow
  backgroundColor: theme.palette.background.paper,
}));

// Styled AccordionSummary for the dropdown headers
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  // Replacing alpha-based backgrounds with specific theme colors or fallback light colors
  backgroundColor: theme.palette.action.hover, // A very light tint, commonly used for subtle backgrounds
  borderRadius: theme.shape.borderRadius, // Rounded corners for headers
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.selected, // Slightly darker on hover
  },
  '&.Mui-expanded': {
    backgroundColor: theme.palette.action.selected, // Stay darker when expanded
    minHeight: '48px', // Ensure consistent height when expanded
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0), // Adjust content margin
    alignItems: 'center',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.primary.main, // Primary color for the arrow icon
  },
}));

// Styled AccordionDetails for the dropdown content
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2), // Adjust padding for content
  borderTop: `1px solid ${theme.palette.divider}`, // Subtle divider
  '& ul': {
    paddingLeft: theme.spacing(2),
    listStyleType: 'none', // Remove default list style if using ListItems
  },
  '& li': {
    marginBottom: theme.spacing(1),
  },
}));

// Styled List item icons
const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '32px', // Compact the icon area
  color: theme.palette.secondary.main, // Gold color for icons
}));

// --- CreateThreadAside Component ---

export default function CreateThreadAside({ ruleAgreement, setRuleAgreement }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false); // Manages expanded state for Accordions

  // Framer Motion Variants for the overall container
  const containerVariants = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Framer Motion Variants for Accordion content (replaces contentVariants)
  const accordionContentVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2, ease: "easeOut" },
        opacity: { duration: 0.1, ease: "easeOut" }, // Shorter opacity transition on close
      },
    },
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: { xs: 4, md: 0 } }}> {/* Add top margin for smaller screens to separate from main content */}
      <StyledRulesPaper
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 3,
          color: theme.palette.primary.dark, // Darker primary for heading
        }}>
          Thread Creation Guidelines
        </Typography>

        {/* General Guidelines Section */}
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={0} sx={{ mb: 1, borderRadius: theme.shape.borderRadius }}>
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <InfoOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>
              General Guidelines
            </Typography>
          </StyledAccordionSummary>
          <AnimatePresence>
            {expanded === 'panel1' && (
              <motion.div
                key="panel1-content"
                variants={accordionContentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                <StyledAccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                    These are the general rules to keep in mind when creating a thread.
                  </Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters>
                      <StyledListItemIcon>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </StyledListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">
                        <strong>Strict Topic Adherence:</strong> Threads must remain strictly on topic. Off-topic posts will be removed.
                      </Typography>} />
                    </ListItem>
                    <ListItem disableGutters>
                      <StyledListItemIcon>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </StyledListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">
                        <strong>Constructive Contributions Only:</strong> Only helpful and constructive questions and information are permitted.
                      </Typography>} />
                    </ListItem>
                  </List>
                </StyledAccordionDetails>
              </motion.div>
            )}
          </AnimatePresence>
        </Accordion>

        {/* Communication Guidelines Section */}
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} elevation={0} sx={{ mb: 1, borderRadius: theme.shape.borderRadius }}>
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <ForumOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>
              Communication Guidelines
            </Typography>
          </StyledAccordionSummary>
          <AnimatePresence>
            {expanded === 'panel2' && (
              <motion.div
                key="panel2-content"
                variants={accordionContentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                <StyledAccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                    These rules are for how you communicate with other users.
                  </Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters>
                      <StyledListItemIcon>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </StyledListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">
                        <strong>Respectful Communication:</strong> Absolutely no personal attacks, insults, or harassment. Treat all users with the utmost respect.
                      </Typography>} />
                    </ListItem>
                    <ListItem disableGutters>
                      <StyledListItemIcon>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </StyledListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">
                        <strong>No Swearing or Foul Language:</strong> Profanity or offensive language is strictly forbidden.
                      </Typography>} />
                    </ListItem>
                    <ListItem disableGutters>
                      <StyledListItemIcon>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </StyledListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">
                        <strong>Zero Tolerance for Bullying:</strong> Bullying, intimidation, or any harmful behavior will not be tolerated.
                      </Typography>} />
                    </ListItem>
                  </List>
                </StyledAccordionDetails>
              </motion.div>
            )}
          </AnimatePresence>
        </Accordion>

        {/* Content Guidelines Section */}
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} elevation={0} sx={{ mb: 1, borderRadius: theme.shape.borderRadius }}>
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <DescriptionOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: theme.palette.text.primary }}>
              Content Guidelines
            </Typography>
          </StyledAccordionSummary>
          <AnimatePresence>
            {expanded === 'panel3' && (
              <motion.div
                key="panel3-content"
                variants={accordionContentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ overflow: "hidden" }}
              >
                <StyledAccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                    These rules are for the type of content you post.
                  </Typography>
                  <List dense disablePadding>
                    <ListItem disableGutters>
                      <StyledListItemIcon>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </StyledListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">
                        <strong>No Spam or Self-Promotion:</strong> Avoid posting irrelevant links or excessive self-promotional content.
                      </Typography>} />
                    </ListItem>
                  </List>
                </StyledAccordionDetails>
              </motion.div>
            )}
          </AnimatePresence>
        </Accordion>

        {/* Agreement Section */}
        <Box sx={{ mt: 3, pt: 2, borderTop: `1px dashed ${theme.palette.divider}`, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            By creating a thread, you <Typography component="span" sx={{ fontWeight: 'bold', color: theme.palette.warning.dark }}>explicitly agree</Typography> to these strict guidelines. Failure to comply will result in immediate moderation actions.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={ruleAgreement}
                onChange={() => setRuleAgreement(!ruleAgreement)}
                required
                color="primary"
              />
            }
            label={
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                I have read and agreed to the thread creation guidelines.
              </Typography>
            }
            sx={{
                '& .MuiFormControlLabel-label.Mui-disabled': {
                    color: theme.palette.text.secondary, // Ensure disabled label color is consistent
                },
            }}
          />
        </Box>
      </StyledRulesPaper>
    </Box>
  );
}