import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';
import UserCombo from '../../components/Combos/UsersCombo';
import api from '../../utils/api';
import { getCurrentUser } from '../../utils/auth';

const InstitutionsForm = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [institutions, setInstitutions] = useState({
    name: '',
    location: '',
    description: '',
    establishedYear: '',
    contactEmail: '',
    website: '',
    pix: '',
    UserInstituition: null,
  });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/institutions/${id}`)
        .then((response) => {
          setInstitutions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInstitutions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validations
    if (institutions.name.trim() === '') {
      Toast.fire({
        icon: 'error',
        title: 'Por favor, preencha o campo Nome.',
      });
      return;
    }

    const establishedYear = parseInt(institutions.establishedYear, 10);
    if (isNaN(establishedYear) || establishedYear < 0) {
      Toast.fire({
        icon: 'error',
        title: 'Por favor, insira um ano de fundação válido.',
      });
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(institutions.contactEmail)) {
      Toast.fire({
        icon: 'error',
        title: 'Por favor, insira um email de contato válido.',
      });
      return;
    }

    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/;
    if (!urlPattern.test(institutions.website)) {
      Toast.fire({
        icon: 'error',
        title: 'Por favor, insira uma URL de website válida.',
      });
      return;
    }

    if (institutions.pix.trim() === '') {
      Toast.fire({
        icon: 'error',
        title: 'Por favor, preencha o campo Chave PIX.',
      });
      return;
    }

    setLoading(true);
    if (id) {
      api
        .patch(`/institutions/${id}`, institutions)
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Instituição salva com sucesso!',
          }).then(() => {
            navigate('/institutions');
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    } else {
      api
        .post('/institutions', institutions)
        .then(() => {
          Toast.fire({
            icon: 'success',
            title: 'Instituição salva com sucesso!',
          }).then(() => {
            navigate('/institutions');
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    }
  };

  const handleUserChanged = (selectedUsers) => {
    const userId = selectedUsers.length > 0 ? selectedUsers[0].id : '';
    setInstitutions((prevState) => ({
      ...prevState,
      userId,
    }));
  };

  const handleCancel = () => {
    navigate('/institutions');
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
          value={institutions.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="location"
          label="Localização"
          variant="outlined"
          size="small"
          margin="normal"
          value={institutions.location}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="description"
          label="Descrição"
          variant="outlined"
          size="small"
          margin="normal"
          value={institutions.description}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="establishedYear"
          label="Ano de Fundação"
          variant="outlined"
          size="small"
          margin="normal"
          value={institutions.establishedYear}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="contactEmail"
          label="Email de Contato"
          variant="outlined"
          size="small"
          margin="normal"
          value={institutions.contactEmail}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="website"
          label="Website"
          variant="outlined"
          size="small"
          margin="normal"
          value={institutions.website}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="pix"
          label="Chave PIX"
          variant="outlined"
          size="small"
          margin="normal"
          value={institutions.pix}
          onChange={handleChange}
        />
      </Grid>
      {currentUser.accessLevel === 'admin' && (
        <Grid item md={12} sm={6} xs={6}>
          <UserCombo value={institutions.UserInstituition} onUserChanged={(value) => setInstitutions({ ...institutions, UserInstituition: value })} />
        </Grid>
      )}
      <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Loading...' : 'Salvar'}
      </Button>
      <Button variant="outlined" onClick={handleCancel} disabled={loading} style={{ marginTop: '1rem', color: '#ec2300' }}>
        Cancelar
      </Button>
    </form>
  );
};

export default InstitutionsForm;
