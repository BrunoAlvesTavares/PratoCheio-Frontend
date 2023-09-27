import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';
import api from '../../utils/api';
import validator from 'validator';

const UserCreatedForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', username: '', accessLevel: 'user', password: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const validatePhoneNumber = (value) => {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'username') {
            setEmailError(!validator.isEmail(value));
        }

        if (name === 'phone') {
            // Remove non-numeric characters
            const numericValue = value.replace(/\D/g, '');
            setPhoneError(!validatePhoneNumber(numericValue));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validator.isEmail(user.username)) {
            setEmailError(true);
            return;
        }

        const numericPhone = user.phone.replace(/\D/g, '');

        if (!validatePhoneNumber(numericPhone)) {
            setPhoneError(true);
            return;
        }

        setLoading(true);
        api.post('/users', user)
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Usuário salvo com sucesso!"
                }).then(() => {
                    navigate("/");
                });
            }).catch(err => {
                Toast.fire({
                    icon: "error",
                    title: err.response.data.message
                });
            });
    };

    const handleCancel = () => {
        navigate("/");
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
                    name="phone"
                    label="Número"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    value={user.phone}
                    onChange={handleChange}
                    error={phoneError}
                    helperText={phoneError && 'Informe um número de celular válido (ex: 5587180247) sem o número 9 na frente'}
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
            <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
                {loading ? 'Loading...' : 'Criar Conta'}
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

export default UserCreatedForm;
