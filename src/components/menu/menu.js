import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HistoryIcon from '@mui/icons-material/History';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import HomeIcon from '@mui/icons-material/Home';
import { getCurrentUser } from '../../utils/auth';

import { Link } from 'react-router-dom';

const Menu = () => {
  const [selectedIndex, setSelectedIndex] = useState();
  const currentUser = getCurrentUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  let items = [
    { label: 'Página inicial', icon: <HomeIcon />, path: '/home' },
    { label: 'Sair', icon: <MeetingRoomIcon />, path: '/logout' },
  ];

  if (currentUser && currentUser.accessLevel === 'admin') {
    items.unshift({ label: 'Histórico de mensagens', icon: <HistoryIcon />, path: '/messagehistory' });
    items.unshift({ label: 'Instituições', icon: <FoodBankIcon />, path: '/institutions' });
    items.unshift({ label: 'Usuários', icon: <AccountCircleIcon />, path: '/users', accessLevel: 'admin' });
  }

  if (currentUser && currentUser.accessLevel === 'manager') {
    items.unshift({ label: 'Histórico de mensagens', icon: <HistoryIcon />, path: '/messagehistory' });
    items.unshift({ label: 'Minha instituição', icon: <FoodBankIcon />, path: '/institutions' });
  }

  if (currentUser && currentUser.accessLevel === 'user') {
    items.unshift({ label: 'Instituições', icon: <FoodBankIcon />, path: '/institutions' });
  }

  items = items.sort((a, b) => {
    if (a.label === 'Página inicial') {
      return -1;
    } else if (b.label === 'Página inicial') {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <IconButton
        onClick={handleToggleDrawer}
        style={{ position: 'fixed', top: 10, left: 10, zIndex: 999 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        onMouseEnter={() => setIsDrawerOpen(true)}
        onMouseLeave={() => setIsDrawerOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: isDrawerOpen ? '#2196F3' : 'transparent',
            color: '#fff',
            transition: 'background-color 0.3s ease', // Adicionando uma transição suave
          },
        }}
      >
        <div sx={{ mt: 24, ml: 16 }}>
          <Typography align="center" variant="h6" sx={{ color: '#fff', paddingTop: '10px' }}>
            PratoCheio
          </Typography>
        </div>
        <Divider sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }} />
        <List>
          {items.map(({ label, icon, path }, index) => (
            <Link
              to={path}
              key={index}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem
                button
                sx={{
                  borderRadius: 8,
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: '#64B5F6',
                    color: '#fff',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  },
                }}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    sx: { color: '#fff' },
                  }}
                  primary={label}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider sx={{ mt: 'auto', mb: 1, backgroundColor: '#fff' }} />
      </Drawer>
    </>
  );
};

export default Menu;
