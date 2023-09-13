import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import './styles.css';

function FloatButton({ url, loading = false }) {
    const navigate = useNavigate();

    const redirectToUrl = () => {
        if (url[0] === '/') {
            navigate(`${url}/new`);
        } else {
            navigate(`/${url}/new`);
        }
    }

    return (
        <Button
            id="float-button"
            variant="contained"
            color="primary"
            title="Adicionar novo"
            onClick={() => redirectToUrl()}
            disabled={loading}
        >
            <AddIcon size={40} />
        </Button>
    );
}

export default FloatButton;