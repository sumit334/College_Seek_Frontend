import React from "react";
import { styled, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Error from '../../web_images/error.jpg';

const Wrapper = styled(Box)`
  padding: 9rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Errors = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <img src={Error} alt="error" />
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </Wrapper>
  );
};

export default Errors;
