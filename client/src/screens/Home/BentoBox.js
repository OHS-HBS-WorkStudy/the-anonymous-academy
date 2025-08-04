import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  Insights as InsightsIcon,
  Whatshot as TrendingIcon,
  Stars as CredibilityIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';
import MyAnimatedLineChart from "../../modules/I-Candy/Chart.js";
import CredScore from "../../modules/I-Candy/CredScore.js";

const BentoCard = styled(motion(Paper))(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.glass.lavender,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 1.5,
  },
}));

const CardHeader = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  '& svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const CardContentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body1.fontSize,
  '& p': {
    fontSize: theme.typography.body1.fontSize,
  },
}));

export default function BentoBox() {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 'lg',
        mx: 'auto',
        mb: 4,
      }}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <BentoCard variants={itemVariants}>
            <CardHeader variant="h6" sx={{ color: theme.palette.secondary.main }}>
              <InsightsIcon sx={{ color: theme.palette.secondary.main }} /> My Score Progress
            </CardHeader>
            <CardContentBox>
              <MyAnimatedLineChart />
            </CardContentBox>
          </BentoCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <BentoCard variants={itemVariants}>
            <CardHeader variant="h6" sx={{ color: theme.palette.error.main }}>
              <TrendingIcon sx={{ color: theme.palette.error.main }} /> Trending
            </CardHeader>
            <CardContentBox>
              <Typography>No trends? Create a trend!</Typography>
            </CardContentBox>
          </BentoCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <BentoCard variants={itemVariants}>
            <CardHeader variant="h6" sx={{ color: theme.palette.info.main }}>
              <CredibilityIcon sx={{ color: theme.palette.info.main }} /> Credibility Score
            </CardHeader>
            <CardContentBox>
              <CredScore rawScore={45} />
            </CardContentBox>
          </BentoCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <BentoCard variants={itemVariants}>
            <CardHeader variant="h6" sx={{ color: theme.palette.success.main }}>
              <ForumIcon sx={{ color: theme.palette.success.main }} /> Your Threads
            </CardHeader>
            <CardContentBox>
              <Typography>Start a new thread!</Typography>
            </CardContentBox>
          </BentoCard>
        </Grid>
      </Grid>
    </Box>
  );
}
