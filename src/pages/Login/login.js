import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { login, logout } from '../../utils/auth';
import { Toast } from '../../components/swal';
import api from '../../utils/api';

function Login() {

  const [reCaptchaRef, setReCaptchaRef] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autorized, setAutorized] = useState(false)

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) {
      Toast.fire({
        icon: "warning",
        title: "Preencha o e-mail e a senha para continuar!"
      });
    } else {

      if (autorized) {
        try {
          const apiResponse = await api.post('/login', { username, password });
          login(apiResponse.data.access_token, apiResponse.data.currentUser);
          navigate('/users');
        } catch (err) {
          setPassword("");
          setUsername("");
          setAutorized(false);
          localStorage.clear();
          reCaptchaRef.reset();
          logout();
          Toast.fire({
            icon: "error",
            title: err.response.data.message
          });
        }
      } else {
        Toast.fire({
          icon: "warning",
          title: "Por favor, envie o captcha antes de logar!",
        });
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2196F3' }}>
      <Paper sx={{ maxWidth: "550px", padding: "32px", zIndex: 1 }} variant="elevation" elevation={8}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="h5" align="center" style={{ color: '#2196F3' }}>PratoCheio</Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="h5" align="center">Faça seu login</Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    label="Usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Senha"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <ReCAPTCHA style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                    lang='pt-BR'
                    ref={(r) => setReCaptchaRef(r)}
                    onReset={() => setAutorized(false)}
                    onChange={() => setAutorized(true)}
                    onExpired={() => setAutorized(false)}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                    style={{ backgroundColor: '#2196F3' }}
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;
