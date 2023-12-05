import React from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate('/institutions');
  };

  return (
    <Container>
      <Typography variant="h2" align="center" style={{ marginTop: '20px' }}>
        Bem-vindo ao Nosso Projeto Beneficente
      </Typography>
      <animated.div style={props}>
        <Card style={{ marginTop: '20px', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Nosso Propósito
            </Typography>
            <Typography variant="body1" align="justify">
              Este é um projeto dedicado a promover a ligação entre usuários e instituições beneficentes.
              Nossa missão é facilitar a colaboração e o apoio àqueles que mais precisam.
            </Typography>
          </CardContent>
        </Card>
      </animated.div>
      <animated.div style={props}>
        <Card style={{ marginTop: '20px', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Criado por Bruno Alves e Rafael Alves
            </Typography>
            <Typography variant="body1" align="justify">
              Acreditamos no poder da comunidade para fazer a diferença. Junte-se a nós nesta jornada para tornar o mundo um lugar melhor.
            </Typography>
          </CardContent>
        </Card>
      </animated.div>
      <animated.div style={props}>
        <Card style={{ marginTop: '20px', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Saiba Mais
            </Typography>
            <Typography variant="body1" align="justify">
              Descubra como você pode se envolver e fazer parte deste projeto incrível. Sua contribuição pode fazer toda a diferença.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', display: 'block', margin: '0 auto' }}
              onClick={handleJoinUsClick}
            >
              Acompanhe a lista das instituições
            </Button>
          </CardContent>
        </Card>
      </animated.div>
    </Container>
  );
};

export default Home;
