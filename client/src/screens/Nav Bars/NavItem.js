import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

export default function NavItem({
  icon: Icon,
  label,
  expanded,
  isActive,
  activePath,
  onClick,
  theme,
  isMobile,
  setIsSidebarOpen,
}) {
  const active = isActive(activePath);

  const handleClick = () => {
    onClick();
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const textVariants = {
    closed: { opacity: 0, width: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, width: 'auto', transition: { duration: 0.3, delay: 0.1 } },
  };

  const activeColor = theme.palette.primary.main;

  return (
    <ListItemButton
      selected={active}
      onClick={handleClick}
      sx={{
        minHeight: 48,
        justifyContent: expanded ? 'initial' : 'center',
        px: 2.5,
        borderRadius: theme.shape.borderRadius,
        mx: 1,
        '&.Mui-selected': {
          backgroundColor: 'transparent',
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: expanded ? 3 : 'auto',
          justifyContent: 'center',
          color: active ? activeColor : theme.palette.text.secondary,
        }}
      >
        <Icon />
      </ListItemIcon>

      <motion.div
        initial="closed"
        animate={expanded ? 'open' : 'closed'}
        variants={textVariants}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        <ListItemText
          primary={label}
          sx={{
            color: active ? activeColor : theme.palette.text.primary,
          }}
        />
      </motion.div>
    </ListItemButton>
  );
}
