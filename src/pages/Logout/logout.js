import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useCookies } from "react-cookie";

import { logout } from '../../utils/auth';

let theme = createTheme({
  palette: {
    primary: {
      light: '#ff7300',
      main: '#ef6c00',
      dark: '#da6c00',
    },
    secondary: {
      main: '#011627'
    },
    warning: {
      main: '#D62828',
    },
    info: {
      main: '#FCBF49'
    }
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const Logout = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['grafana_session']);

  useEffect(() => {
    logout();
    localStorage.clear();
    removeCookie('grafana_session');
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, removeCookie]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40vh' }}>
        <ThemeProvider theme={theme}>
          <CircularProgress color="primary" size={160} style={{ color: '#2196F3' }} />
          <Typography variant="h5" component="h1" style={{ marginTop: '1rem' }}>
            Saindo...
          </Typography>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Logout;
