import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
} from '@mui/material';
import {
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { getCurrentUser } from '../../utils/auth';

import { Link } from 'react-router-dom';

const Menu = () => {
    const [selectedIndex, setSelectedIndex] = useState();
    const currentUser = getCurrentUser();
    const items = [
        { label: 'Instituições', icon: <FoodBankIcon />, path: '/institutions' },
        { label: 'Sair', icon: <MeetingRoomIcon />, path: '/logout' },
    ];

    if (currentUser && currentUser.accessLevel === 'admin') {
        items.unshift({ label: 'Usuários', icon: <AccountCircleIcon />, path: '/users', accessLevel: 'admin' });
    }
    return (
        <>
            <Drawer
                variant="persistent"
                anchor="left"
                open={true}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#2196F3',
                        color: '#fff',
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
