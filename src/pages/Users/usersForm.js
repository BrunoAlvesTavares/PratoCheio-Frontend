import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';
import api from '../../utils/api';
import validator from 'validator';

const UserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', username: '', accessLevel: '', password: '' });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/users/${id}`)
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (name === 'username') {
      setEmailError(!validator.isEmail(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validator.isEmail(user.username)) {
      setEmailError(true);
      return;
    }
    setLoading(true);
    if (id) {
      api.patch(`/users/${id}`, user)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Usuário salvo com sucesso!"
          }).then(() => {
            navigate("/users");
          });
        }).catch(err => {
          Toast.fire({
            icon: "error",
            title: err.response.data.message
          });
        });
    } else {
      api.post('/users', user)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Usuário salvo com sucesso!"
          }).then(() => {
            navigate("/users");
          });
        }).catch(err => {
          Toast.fire({
            icon: "error",
            title: err.response.data.message
          });
        });
    }
  };

  const handleAccessChange = (event) => {
    setUser(prevState => ({
      ...prevState,
      accessLevel: event.target.value
    }));
  };

  
  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="name"
          label="Nome"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="username"
          label="Email"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.username}
          onChange={handleChange}
          error={emailError}
          helperText={emailError && 'Informe um email válido'}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="password"
          label="Senha"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <FormControl variant="outlined" size="small" margin="normal" style={{ width: '225px' }}>
          <InputLabel>Nível de acesso</InputLabel>
          <Select
            name="accessLevel"
            value={user.accessLevel}
            onChange={handleAccessChange}
            label="Nível de acesso"
          >
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="user">Usuário</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Loading...' : 'Salvar'}
      </Button>
      <Button
        variant="outlined"
        onClick={handleCancel}
        disabled={loading}
        style={{ marginTop: '1rem', color: '#ec2300' }}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default UserForm;
