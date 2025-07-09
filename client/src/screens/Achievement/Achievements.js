import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Container, 
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  LinearProgress,
  CircularProgress,
  Avatar,
  useMediaQuery,
  Tabs,
  Tab,
  Tooltip,
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  EmojiEvents as TrophyIcon,
  Stars as StarIcon,
  MilitaryTech as MedalIcon,
  WorkspacePremium as CrownIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Lightbulb as IdeaIcon,
  Forum as ForumIcon,
  EmojiObjects as RewardsIcon,
} from '@mui/icons-material';


const rarityColors = {
  common: '#8D99AE', // Slate Grey
  uncommon: '#4CAF50', // Green
  rare: '#2196F3', // Blue
  epic: '#9C27B0', // Purple
  legendary: '#FFD700', // Gold
};

const AchievementsPageWrapper = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(3), 
  minHeight: '100%', 
  boxSizing: 'border-box', 
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(6, 2),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[6],
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 4,
    borderRadius: '4px 4px 0 0',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const CategorySection = styled(Box)(({ theme }) => ({
  minHeight: '400px',
}));

const AchievementGridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
}));

const StyledAchievementCard = styled(Paper)(({ theme, unlocked, rarityColor }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: unlocked ? theme.shadows[5] : theme.shadows[2],
  border: `1px solid ${unlocked ? alpha(rarityColor, 0.5) : theme.palette.grey[300]}`,
  background: unlocked
    ? `linear-gradient(145deg, ${alpha(rarityColor, 0.05)}, ${theme.palette.background.paper})`
    : theme.palette.background.paper,
  overflow: 'hidden',
  height: '100%',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.01)',
    boxShadow: unlocked ? theme.shadows[8] : theme.shadows[4],
    '& .MuiBox-root.status-indicator': {
      opacity: 1,
    },
    '& .unlocked-flare': {
      opacity: 0.5,
    },
  },
  '&::before': unlocked && {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at center, ${alpha(rarityColor, 0.1)} 0%, transparent 70%)`,
    opacity: 0,
    animation: 'unlocked-pulse 2s infinite ease-in-out',
    zIndex: 1,
  },
  '@keyframes unlocked-pulse': {
    '0%': { transform: 'scale(0.8)', opacity: 0 },
    '50%': { transform: 'scale(1)', opacity: 0.8 },
    '100%': { transform: 'scale(0.8)', opacity: 0 },
  },
}));

const CardIconContainer = styled(Box)(({ theme, rarityColor }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.5rem',
  marginBottom: theme.spacing(1.5),
  background: `linear-gradient(135deg, ${rarityColor}, ${alpha(rarityColor, 0.7)})`,
  color: theme.palette.common.white,
  border: `3px solid ${alpha(rarityColor, 0.5)}`,
  boxShadow: theme.shadows[3],
  position: 'relative',
  zIndex: 2,
}));

const UnlockedFlare = styled(Box)(({ theme, rarityColor }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '110%',
  height: '110%',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${alpha(rarityColor, 0.2)} 0%, transparent 70%)`,
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.2s ease-out',
  zIndex: 1,
}));

const StatusIndicator = styled(Box)(({ theme, unlocked }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: unlocked ? alpha(theme.palette.success.main, 0.7) : alpha(theme.palette.grey[600], 0.7),
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '0.7rem',
  gap: theme.spacing(0.5),
  boxShadow: theme.shadows[1],
  transition: 'opacity 0.2s ease-out',
  opacity: unlocked ? 1 : 0.6,
  zIndex: 3,
}));

const RarityLabel = styled(Typography)(({ theme, rarityColor }) => ({
  fontSize: '0.8rem',
  fontWeight: 'bold',
  color: rarityColor,
  backgroundColor: alpha(rarityColor, 0.1),
  padding: theme.spacing(0.4, 1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  letterSpacing: '0.05em',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme, rarityColor }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    backgroundColor: rarityColor,
    borderRadius: 4,
  },
}));

const ProgressInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: theme.spacing(0.4),
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
}));

const RewardDisplay = styled(Box)(({ theme, rarityColor }) => ({
  marginTop: theme.spacing(1.5),
  fontWeight: 'bold',
  color: rarityColor,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.9rem',
}));


export default function Achievements() {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);

  const categories = {
    achievements: [
      { id: 1, title: 'First Confession', description: 'Ask your very first anonymous question', icon: '🗯️', progress: 1, maxProgress: 1, unlocked: true, reward: '10 XP', rarity: 'common', isNew: true },
      { id: 2, title: 'The Curious Cat', description: 'Ask 10 different questions', icon: '🐱', progress: 7, maxProgress: 10, unlocked: false, reward: '20 XP', rarity: 'uncommon' },
      { id: 3, title: 'Serial Asker', description: 'Ask a question every day for 14 days', icon: '📆', progress: 6, maxProgress: 14, unlocked: false, reward: '40 XP', rarity: 'rare' },
      { id: 4, title: 'Just Ventin’', description: 'Post a question that gets 10 replies', icon: '💬', progress: 6, maxProgress: 10, unlocked: false, reward: '25 XP', rarity: 'uncommon' },
      { id: 5, title: 'Daily Dose of Drama', description: 'Post for 30 consecutive days', icon: '📺', progress: 12, maxProgress: 30, unlocked: false, reward: '75 XP', rarity: 'epic' },
      { id: 6, title: 'The Anonymous Oracle', description: 'Reach 100 total posts', icon: '🔮', progress: 83, maxProgress: 100, unlocked: false, reward: '100 XP', rarity: 'legendary' }
    ],
    badges: [
      { id: 1, title: 'Reply Goblin', description: 'Reply to 20 questions anonymously', icon: '👺', progress: 16, maxProgress: 20, unlocked: false, reward: 'Reply Goblin Badge', rarity: 'rare' },
      { id: 2, title: 'Upvote Magnet', description: 'Get 50 upvotes across all your answers', icon: '🧲', progress: 35, maxProgress: 50, unlocked: false, reward: 'Upvote Magnet Badge', rarity: 'epic' },
      { id: 3, title: 'Wholesome Ghost', description: 'Have 5 answers marked as "Helpful"', icon: '👻', progress: 3, maxProgress: 5, unlocked: false, reward: 'Wholesome Ghost Badge', rarity: 'rare' },
      { id: 4, title: 'Lurker No More', description: 'Make your first reply after 7 days of silence', icon: '🕵️', progress: 1, maxProgress: 1, unlocked: false, reward: 'Welcome Back Badge', rarity: 'common' },
      { id: 5, title: 'The Disappearing Legend', description: 'Earn 500 XP and vanish for a month', icon: '🌫️', progress: 400, maxProgress: 500, unlocked: false, reward: 'Mystery Badge', rarity: 'legendary' }
    ],
    rewards: [
      { id: 1, title: 'Stealth Mode', description: 'Unlock a shadowy theme for nighttime posting', icon: '🕶️', progress: 80, maxProgress: 100, unlocked: false, reward: 'Stealth Theme', rarity: 'rare' },
      { id: 2, title: 'Username in Disguise', description: 'Mask your username with a random alias every time', icon: '🎭', progress: 60, maxProgress: 100, unlocked: false, reward: 'Alias Switcher', rarity: 'epic' },
      { id: 3, title: 'Drama King/Queen/Monarch', description: 'Unlock a flair that screams ✨extra✨', icon: '👑', progress: 90, maxProgress: 100, unlocked: false, reward: 'Dramatic Flair', rarity: 'epic' },
      { id: 4, title: 'The Void', description: 'Unlock a dark, minimalistic UI for maximum anonymity', icon: '🌌', progress: 20, maxProgress: 100, unlocked: false, reward: 'Void Theme', rarity: 'legendary' },
      { id: 5, title: 'Vibe Check Passed', description: 'Unlock background music or ambient sounds', icon: '🎧', progress: 45, maxProgress: 100, unlocked: false, reward: 'Audio Vibes', rarity: 'rare' }
    ]
  };

  const getRarityColor = useCallback((rarity) => {
    return rarityColors[rarity] || theme.palette.grey[400];
  }, [theme.palette.grey]);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const AchievementCard = ({ achievement }) => {
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
    const rarityColor = getRarityColor(achievement.rarity);

    const tooltipContent = (
      <Box sx={{ p: 1 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          {achievement.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Reward: {achievement.reward}
        </Typography>
      </Box>
    );

    return (
      <Tooltip title={tooltipContent} placement="top" arrow>
        <StyledAchievementCard
          unlocked={achievement.unlocked}
          rarityColor={rarityColor}
        >
          {achievement.unlocked && (
            <AnimatePresence>
              <motion.div
                className="unlocked-flare"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '110%',
                  height: '110%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${alpha(rarityColor, 0.3)} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            </AnimatePresence>
          )}

          <StatusIndicator unlocked={achievement.unlocked} className="status-indicator">
            {achievement.unlocked ? <UnlockIcon fontSize="small" /> : <LockIcon fontSize="small" />}
            <Typography variant="inherit">{achievement.unlocked ? 'Unlocked' : 'Locked'}</Typography>
          </StatusIndicator>

          {achievement.isNew && (
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              sx={{
                position: 'absolute',
                top: -8,
                left: -8,
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                borderRadius: '50%',
                width: 35,
                height: 35,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                boxShadow: theme.shadows[2],
                zIndex: 4,
                border: `2px solid ${theme.palette.background.paper}`,
              }}
            >
              <StarIcon fontSize="small" />
            </Box>
          )}

          <CardIconContainer rarityColor={rarityColor}>
            {achievement.icon}
          </CardIconContainer>

          <RarityLabel rarityColor={rarityColor}>
            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
          </RarityLabel>

          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            {achievement.title}
          </Typography>

          <Box sx={{ width: '100%', mt: 1.5 }}>
            {achievement.maxProgress > 1 ? (
              <>
                <StyledLinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  rarityColor={rarityColor}
                />
                <ProgressInfo>
                  <Typography variant="caption" sx={{ color: rarityColor }}>
                    {achievement.progress} / {achievement.maxProgress}
                  </Typography>
                  <Typography variant="caption" sx={{ color: rarityColor }}>
                    {Math.round(progressPercentage)}%
                  </Typography>
                </ProgressInfo>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                {achievement.unlocked && <IdeaIcon sx={{ color: rarityColor }} />}
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: rarityColor }}>
                  {achievement.unlocked ? 'Accomplished!' : 'Yet to Begin'}
                </Typography>
              </Box>
            )}
          </Box>

          <RewardDisplay rarityColor={rarityColor}>
            <RewardsIcon />
            {achievement.reward}
          </RewardDisplay>
        </StyledAchievementCard>
      </Tooltip>
    );
  };

  const TabPanel = ({ children, value, index }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <CategorySection>
            <Grid container spacing={4} justifyContent="center">
              <AnimatePresence>
                {children.map((item) => (
                  <AchievementGridItem
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={item.id}
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <AchievementCard achievement={item} />
                  </AchievementGridItem>
                ))}
                {children.length === 0 && (
                  <Grid item xs={12}>
                    <Typography align="center" color="text.secondary" variant="h6" sx={{ mt: 4 }}>
                      No items found in this category. Keep exploring!
                    </Typography>
                  </Grid>
                )}
              </AnimatePresence>
            </Grid>
          </CategorySection>
        )}
      </div>
    );
  };

  return (
    <AchievementsPageWrapper
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          py: 8, 
        }}
      >
        <HeroSection>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Your Anonymous Journey
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, maxWidth: '700px', mx: 'auto' }}>
              Track your milestones, earn recognition for your contributions, and unlock unique ways to enhance your anonymous experience.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<ForumIcon />}
              sx={{ mt: 2, py: 1, px: 3, borderRadius: 50 }}
              component={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Questions
            </Button>
          </motion.div>
        </HeroSection>

        {/* Tabs for Categories */}
        <Box sx={{ width: '100%' }}>
          <StyledTabs value={activeTab} onChange={handleChangeTab} centered>
            <Tab label="Achievements" />
            <Tab label="Badges" />
            <Tab label="Rewards" />
          </StyledTabs>

          <TabPanel value={activeTab} index={0}>
            {categories.achievements}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            {categories.badges}
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            {categories.rewards}
          </TabPanel>
        </Box>
      </Container>
    </AchievementsPageWrapper>
  );
}