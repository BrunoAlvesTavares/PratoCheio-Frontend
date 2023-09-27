import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';
import api from '../../utils/api';

const InstitutionsMessage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const messageData = { message };
    api
      .post('/whatsapp/sendMessage', messageData)
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Mensagem enviada com sucesso!',
        }).then(() => {
          navigate('/institutions');
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate('/institutions');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="message"
          label="Mensagem"
          variant="outlined"
          size="small"
          margin="normal"
          value={message}
          onChange={handleChange}
        />
      </Grid>
      <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>
      <Button variant="outlined" onClick={handleCancel} disabled={loading} style={{ marginTop: '1rem', color: '#ec2300' }}>
        Cancelar
      </Button>
    </form>
  );
};

export default InstitutionsMessage;
