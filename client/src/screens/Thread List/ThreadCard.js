import React from 'react';
import { motion } from 'framer-motion';

import {
  Box,
  Typography,
  Avatar,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

import TimeCounter from '../../modules/I-Candy/TimeCounter.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useThreadCardLogic } from './useThreadCardLogic.js';

const StyledThreadCard = styled(motion(Paper))(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.75,
  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
  boxShadow: `0 6px 18px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.05)`,
  cursor: 'pointer',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backdropFilter: 'blur(4px)',
  border: `1px solid ${theme.palette.divider}`,

  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',

  '&:hover': {
    transform: 'translateY(-4px) scale(1.01)',
    boxShadow: `0 10px 24px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.08)`,
    borderColor: theme.palette.primary.light,
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'radial-gradient(circle at top left, rgba(255,255,255,0.02), transparent 60%)',
    zIndex: 0,
    pointerEvents: 'none',
  },

  '& > *': {
    zIndex: 1,
  },
}));


const UserHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 15,
  marginBottom: theme.spacing(0.75),
  gap: theme.spacing(0.5),
}));

const ContentRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const LeftInfo = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  minWidth: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(0.75),
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  width: '100%',
}));

const SkeletonWrapper = ({ children }) => (
    <Box sx={{ opacity: 0.7, width: '100%' }}>
        {children}
    </Box>
);

export default function ThreadCard({ thread }) {
  const theme = useTheme();
  const {
    loggedInUser,
    isLoading,
    sanitizedName,
    sanitizedContents,
    handleThreadClick,
    getUserDisplayName,
  } = useThreadCardLogic(thread);

  const threadCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.01,
      boxShadow: theme.shadows[3],
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <StyledThreadCard
      variants={threadCardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isLoading ? "hover" : undefined}
      whileTap={!isLoading ? "tap" : undefined}
      onClick={!isLoading ? handleThreadClick : undefined}
      layout
    >
      <UserHeader>
        {isLoading ? (
          <SkeletonWrapper>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(0.5) }}>
              <Skeleton circle width={20} height={20} />
              <Skeleton width={80} height={14} sx={{ mr: 'auto' }} />
              <Skeleton width={60} height={12} />
            </Box>
          </SkeletonWrapper>
        ) : (
          <>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 20, height: 20, fontSize: '0.65rem' }}>
              {thread.user?.account_type ? thread.user.account_type[0] : <AccountCircleIcon sx={{ fontSize: '0.9rem' }} />}
            </Avatar>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, flexGrow: 1 }}>
              {getUserDisplayName(thread, loggedInUser)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              <TimeCounter date={thread.created_at} />
            </Typography>
          </>
        )}
      </UserHeader>

      <ContentRow>
        {isLoading ? (
          <SkeletonWrapper>
            <Box sx={{ display: 'flex', gap: theme.spacing(1), [theme.breakpoints.down('sm')]: { flexDirection: 'column' }}}>
              <Box sx={{ flexShrink: 0, [theme.breakpoints.down('sm')]: { display: 'flex', gap: theme.spacing(1.5), width: '100%' } }}>
                <Skeleton width={35} height={25} />
                <Skeleton width={35} height={25} />
                <Skeleton width={35} height={25} />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Skeleton width="60%" height={18} sx={{ mb: 0.25 }} />
                <Skeleton width="85%" height={14} sx={{ mb: 0.25 }} />
                <Skeleton width="75%" height={14} sx={{ mb: 0.5 }} />
                <Skeleton width="40%" height={16} />
              </Box>
            </Box>
          </SkeletonWrapper>
        ) : (
          <>
            <LeftInfo>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>0</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>votes</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>0</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>replies</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>0</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>views</Typography>
              </Box>
            </LeftInfo>

            <TextContent sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1.25) }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                  lineHeight: '1.3em',
                  maxHeight: '2.6em',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedName }}
                component={motion.p}
                variants={textItemVariants}
              />

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  wordBreak: 'break-word',           
                  whiteSpace: 'normal',             
                  lineHeight: '1.3em',
                  fontSize: '0.75rem',
                  mb: 1,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  maxHeight: '3.9em',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedContents }}
                component={motion.p}
                variants={textItemVariants}
              />


              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(0.5), mt: 0.5 }}>
                {thread.tags && thread.tags.length > 0 ? (
                  thread.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      color="secondary"
                      sx={{ fontWeight: 'bold', height: '18px', fontSize: '0.65rem' }}
                      component={motion.div}
                      variants={textItemVariants}
                    />
                  ))
                ) : (
                  <Chip
                    label="#No Tags"
                    size="small"
                    color="default"
                    sx={{ fontStyle: 'italic', height: '18px', fontSize: '0.65rem' }}
                    component={motion.div}
                    variants={textItemVariants}
                  />
                )}
              </Box>
            </TextContent>
          </>
        )}
      </ContentRow>
    </StyledThreadCard>
  );
}