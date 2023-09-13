import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import api from '../../../utils/api';

function UserCombo({ onUserChanged, disabled, multiple = false }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/users').then(response => {
      setUsers(response.data);
      console.log(response.data)
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Autocomplete
      multiple={multiple}
      options={users}
      getOptionLabel={(option) => option.username}
      loading={loading}
      onChange={(event, newValue) => {
        onUserChanged(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={loading ? 'Carregando usuários...' : 'Selecione o usuário'}
          variant="outlined"
          disabled={disabled}
          fullWidth={true}
          sx={{ minWidth: '220px' }}
        />
      )}
    />
  );
}

export default UserCombo;
