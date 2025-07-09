import { useParams } from "react-router-dom";
import React, { useState } from "react";
import DOMPurify from 'dompurify';
import ReactQuill from "react-quill";

// Framer Motion Imports
import { motion, AnimatePresence } from "framer-motion";

// MUI Imports
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'; // Keep useTheme here for the main component

// MUI Icons
import {
  Sort as SortIcon,
  Reply as ReplyIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

// Other Modules
import TimeCounter from "../I-Candy/TimeCounter";
import ReplyToReply from "./ReplyToReply";
import ReplyVote from "./ReplyVote";
import CountUpComponent from "../I-Candy/CountUp.js";

// --- Styled Components ---

// Styled Paper for each reply card
const StyledReplyCard = styled(motion(Paper))(({ theme }) => ({
  // Adjusted styling for better display on top of a Paper container
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius * 1.5, // Slightly less rounded than parent Paper, but distinct
  boxShadow: theme.shadows[2], // Lighter shadow than parent Paper to avoid stacking effect
  backgroundColor: theme.palette.background.default, // Use a different background for subtle layering
  display: 'flex',
  flexDirection: 'column',
  // Keep hover effects for interactivity
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)', // Subtle lift on hover
    boxShadow: theme.shadows[4], // Increased shadow on hover
    backgroundColor: theme.palette.action.hover, // Slightly highlights on hover
  },
}));

// Styled Box for the reply content area (Quill + Vote)
const StyledReplyContentArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  flexGrow: 1,
  paddingTop: theme.spacing(1),
}));

// --- ReplyList Component ---

export default function ReplyList({ thread }) {
  const { threadId } = useParams();
  const theme = useTheme(); // This hook gives direct access to the theme
  const allReplies = JSON.parse(sessionStorage.getItem("replies")) || {};
  const [replyStates, setReplyStates] = useState({});

  const toggleReplyButton = (replyId) => {
    setReplyStates(prevState => ({
      ...prevState,
      [replyId]: !prevState[replyId]
    }));
  };

  const findReplies = () => {
    return allReplies[threadId] || [];
  };

  const [sortOption, setSortOption] = useState("newest");

  const sortReplies = (repliesArray, sortOpt) => {
    switch (sortOpt) {
      case "oldest":
        return [...repliesArray].sort((a, b) => new Date(a.date) - new Date(b.date));
      case "popular":
        // Assuming 'votes' property exists or needs to be calculated
        return [...repliesArray].sort((a, b) => (b.votes || 0) - (a.votes || 0));
      case "answered":
        // This logic would depend on a property indicating if a reply is 'answered'
        return [...repliesArray].filter(reply => reply.isAnswered); // Example
      case "newest":
      default:
        return [...repliesArray].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  const replies = sortReplies(findReplies(), sortOption);

  const foundUser = JSON.parse(sessionStorage.getItem("foundUser")) || { pref: {} };

  function userCheck(threadData, reply) {
    if (!threadData || !reply) {
      return "Unknown User";
    }

    if (foundUser && foundUser.email === reply.email) {
      return "You";
    } else if (reply.email === thread.user.email) {
      return "Original Poster";
    } else {
      return "Anonymous " + (reply.user || "User");
    }
  }

  function getRepliesLength() {
    return replies ? replies.length : 0;
  }

  // Framer Motion Variants for Reply Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Framer Motion Variants for Reply Button
  const replyButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  // Framer Motion Variants for nested ReplyToReply
  const nestedReplyVariants = {
    open: { height: "auto", opacity: 1, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } } },
    closed: { height: 0, opacity: 0, transition: { height: { duration: 0.2 }, opacity: { duration: 0.1 } } },
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Replies Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
          <CountUpComponent endValue={getRepliesLength()} duration={1.5} />
          <Typography component="span" variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>replies</Typography>
        </Typography>

        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-option-label">Sort By</InputLabel>
          <Select
            labelId="sort-option-label"
            id="sort-option"
            value={sortOption}
            label="Sort By"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="answered">Answered</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* List of Replies */}
      {replies.length > 0 ? (
        <AnimatePresence>
          {replies.map((reply) => (
            <StyledReplyCard
              key={reply.id || reply.date}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              {/* User Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mr: 1 }}>
                  {userCheck(thread, reply)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  &bull; <TimeCounter date={reply.date} />
                </Typography>
              </Box>

              {/* Reply Content & Vote */}
              <StyledReplyContentArea>
                <Box sx={{ flexShrink: 0, mr: 1 }}>
                  <ReplyVote />
                </Box>
                {/* Apply ReactQuill styling directly with sx prop here */}
                <ReactQuill
                  value={DOMPurify.sanitize(reply.contents)}
                  readOnly={true}
                  theme="bubble"
                  sx={{ // Apply styles directly via sx prop
                    flexGrow: 1,
                    minWidth: 0,
                    '& .ql-container.ql-bubble': {
                      border: 'none',
                      padding: 0,
                    },
                    '& .ql-editor': {
                      padding: 0,
                      // Access theme directly within the component
                      fontSize: theme.typography.body1.fontSize,
                      lineHeight: theme.typography.body1.lineHeight,
                      color: theme.palette.text.primary,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      minHeight: 'auto',

                      '& p': {
                        marginBottom: theme.spacing(1),
                      },
                      '& h1, & h2, & h3, & h4, & h5, & h6': {
                        color: theme.palette.text.primary,
                        fontWeight: 'bold',
                        marginBottom: theme.spacing(1),
                        marginTop: theme.spacing(2),
                      },
                      '& pre.ql-syntax': {
                        backgroundColor: theme.palette.grey[900],
                        color: theme.palette.common.white,
                        borderRadius: theme.shape.borderRadius,
                        padding: theme.spacing(1.5),
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        overflowX: 'auto',
                        margin: theme.spacing(1.5, 0),
                      },
                      '& blockquote': {
                        borderLeft: `4px solid ${theme.palette.secondary.main}`,
                        paddingLeft: theme.spacing(2),
                        fontStyle: 'italic',
                        color: theme.palette.text.secondary,
                        margin: theme.spacing(1.5, 0),
                      },
                      '& a': {
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      },
                      '& ol, & ul': {
                        paddingLeft: theme.spacing(4),
                        marginBottom: theme.spacing(1),
                        marginTop: theme.spacing(1),
                      },
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: theme.shape.borderRadius,
                        display: 'block',
                        margin: theme.spacing(1.5, 'auto'),
                      },
                    },
                    '& .ql-toolbar': {
                      display: 'none',
                    },
                  }}
                />
              </StyledReplyContentArea>

              {/* Reply Button and Nested Reply Area */}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ReplyIcon />}
                  onClick={() => toggleReplyButton(reply.id)}
                  component={motion.button}
                  variants={replyButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.light,
                    '&:hover': {
                        borderColor: theme.palette.primary.main,
                    }
                  }}
                >
                  Reply
                </Button>
              </Box>

              <AnimatePresence>
                {replyStates[reply.id] && (
                  <motion.div
                    key="nested-reply-input"
                    variants={nestedReplyVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ overflow: "hidden" }}
                  >
                    <Box sx={{ mt: 2, pt: 2, borderTop: `1px dashed ${theme.palette.divider}` }}>
                      <ReplyToReply parentReplyId={reply.id} />
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </StyledReplyCard>
          ))}
        </AnimatePresence>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body1" color="text.secondary">
            No replies found for this thread. Be the first to comment!
          </Typography>
        </Box>
      )}
    </Box>
  );
}