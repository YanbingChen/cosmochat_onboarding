// src/LandingPage.jsx
import React from 'react';
import { Button } from '@mui/material';

const LandingPage = ({ onStartChat }) => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Chatbot</h1>
      <p>Your AI assistant is here to help you.</p>
      <Button variant="contained" color="primary" onClick={onStartChat}>
        Start Chat
      </Button>
    </div>
  );
};

export default LandingPage;
