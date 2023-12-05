import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from '../../components/swal';
import api from '../../utils/api';

const InstitutionsMessage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [institutionName, setInstitutionName] = useState('');

  useEffect(() => {
    // Fetch institution details by ID
    api.get(`/institutions/${id}`)
      .then((response) => {
        setInstitutionName(response.data.name);
      })
      .catch((error) => {
        console.error('Erro instituição não encontrada', error);
      });
  }, [id]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const messageData = { message, institutionName };
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
          multiline
          rows={4}
          variant="outlined"
          label="Digite sua mensagem..."
          value={message}
          onChange={handleChange}
          fullWidth
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
