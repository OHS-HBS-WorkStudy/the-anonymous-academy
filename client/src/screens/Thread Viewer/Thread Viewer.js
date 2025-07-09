import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import TimeCounter from '../../modules/I-Candy/TimeCounter.js';
import ThreadVote from './ThreadVote.js';
import ReplyList from '../../modules/Reply/ReplyList.js';
import ThreadReply from '../../modules/Reply/ThreadReply.js';
import PollingSystem from './PollingSystem.js';
import { useThreadLogic } from './useThreadViewer.js';

import {
  Box,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  VisibilityOutlined as ViewsIcon,
  AccessTime as TimeIcon,
  PersonOutline as AccountTypeIcon,
  InfoOutlined as StatusIcon,
} from '@mui/icons-material';


const StyledThreadContentPaper = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.glass.lavender,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCommentsPaper = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.glass.lavender,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledTagsContainer = styled(motion(Box))(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  mt: theme.spacing(2),
}));

const StyledMetadataBox = styled(motion(Box))(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  mb: theme.spacing(3),
  p: theme.spacing(2),
  alignItems: 'center',
}));

const StyledMetadataItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  color: theme.palette.text.secondary,
  minWidth: 'fit-content',
  textAlign: 'left',
}));

export default function ThreadView() {
  const {
    thread,
    status,
    isOwner,
    sanitizedTitle,
    sanitizedDesc,
    commentsPaperHeight,
    commentsListOverflow,
    handleStatusChange,
    threadContentRef,
    commentListContentRef,
    foundUser,
  } = useThreadLogic();

  const theme = useTheme();

  if (!thread) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Thread not found!
        </Typography>
      </Box>
    );
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const contentChildVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const baseFontSize = 32; 
  const minFontSize = 26;  
  const maxLength = 80;    

  const fontSize = Math.max(
    minFontSize,
    baseFontSize - (sanitizedTitle.length / maxLength) * (baseFontSize - minFontSize)
  );


  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          pt: '100px',
          pl: '90px',
          pr: '30px',
          pb: '50px',
          overflow: 'auto',
          overflowX: 'clip',
          boxSizing: 'border-box',
        }}
      >
        <Grid container spacing={3} sx={{ height: '100%', alignItems: 'stretch' }}>
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <StyledThreadContentPaper
              ref={threadContentRef}
              variants={contentChildVariants}
              layout
            >
              <Box component={motion.header} layout sx={{ mb: 1 }}>
                <Typography
                  variant="h4"
                  component={motion.h1}
                  dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
                  sx={{
                    mb: 0.5,
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    whiteSpace: 'normal',        
                    wordBreak: 'break-word',    
                    overflowWrap: 'anywhere',
                    fontSize: `${fontSize}px`, 
                  }}
                  layout
                />

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: foundUser?.email === thread.user.email ? 'bold' : 'normal',
                    color: foundUser?.email === thread.user.email ? theme.palette.primary.main : theme.palette.text.secondary,
                    mb: 2,
                  }}
                  component={motion.span}
                  layout
                >
                  {foundUser?.email === thread.user.email ? 'Your Post' : `Anonymous ${thread.user.account_type}`}
                </Typography>
              </Box>

              <StyledMetadataBox layout>
                <StyledMetadataItem>
                  <TimeIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
                  <Typography variant="body2" color="text.secondary">
                    <TimeCounter date={thread.created_at} />
                  </Typography>
                </StyledMetadataItem>

                <StyledMetadataItem>
                  <ViewsIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
                  <Typography variant="body2" color="text.secondary">
                    {thread.views || 0} views
                  </Typography>
                </StyledMetadataItem>

                {isOwner ? (
                  <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status-dropdown"
                      value={status}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="Archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <StyledMetadataItem>
                    <StatusIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
                    <Typography variant="body2" color="text.secondary">
                      Status:
                      <Typography component="span" sx={{ fontWeight: 'bold', ml: 0.5, color: theme.palette.info.dark }}>
                        {status}
                      </Typography>
                    </Typography>
                  </StyledMetadataItem>
                )}
              </StyledMetadataBox>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexGrow: 1, minHeight: 0 }}>
                <Box sx={{ flexShrink: 0 }}>
                  <ThreadVote />
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
                  <ReactQuill
                    value={sanitizedDesc}
                    readOnly={true}
                    theme="bubble"
                    sx={{
                      borderRadius: theme.shape.borderRadius * 1.2,
                      overflow: 'hidden',
                      '& .ql-editor': {
                        paddingBottom: 0,
                        marginBottom: 0,
                        minHeight: 'auto',
                        whiteSpace: 'normal',
                      },
                      '& .ql-tooltip': {
                        display: 'none !important',
                      },
                      '& .ql-container': {
                        border: 'none',
                      }
                    }}
                  />
                </Box>
              </Box>

              {thread.poll &&
                Array.isArray(thread.poll.options) &&
                thread.poll.options.length > 1 && (
                  <Box component={motion.div} layout sx={{ my: 3 }}>
                    <PollingSystem
                      question={thread.poll.question}
                      options={thread.poll.options}
                      pollId={thread.thread_id.toString()}
                    />
                  </Box>
                )}

              <StyledTagsContainer layout sx={{ mt: 3, mb: 2 }}>
                {thread.tags?.map((tag, index) => (
                  <Chip
                    label={tag}
                    key={index}
                    size="medium"
                    color="secondary"
                    variant="outlined"
                    sx={{
                      '& .MuiChip-label': {
                        fontWeight: 'bold',
                      },
                      cursor: 'default',
                      transition: 'transform 0.2s ease-in-out',
                      borderColor: theme.palette.secondary.light,
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.05, boxShadow: theme.shadows[2] }}
                  />
                ))}
              </StyledTagsContainer>

              <Divider sx={{ my: 2 }} />

              <Box component={motion.section} layout sx={{ mt: 2 }}>
                <ThreadReply />
              </Box>
            </StyledThreadContentPaper>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <StyledCommentsPaper
              sx={{
                height: commentsPaperHeight,
                overflowY: commentsListOverflow,
              }}
              variants={contentChildVariants}
              layout
            >
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                Comments
              </Typography>
              <Box sx={{ flexGrow: 1, overflow: 'auto' }} ref={commentListContentRef}>
                <ReplyList thread={thread} />
              </Box>
            </StyledCommentsPaper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
