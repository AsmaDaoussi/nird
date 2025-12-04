import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

const ErrorMessage = ({ title = 'Erreur', message, onRetry }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <button onClick={onRetry} style={{ cursor: 'pointer' }}>
              Réessayer
            </button>
          )
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;