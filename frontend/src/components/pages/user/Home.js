import React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Container, Row, Col } from 'react-bootstrap';
import { CardContent, Card as MuiCard } from '@mui/material';

import { authAtom } from '../../../states/authStates';

const Card = styled(MuiCard)`
  height: 300px;
  width: 300px;
  margin: 20px;
`;

function Home() {
  const auth = useRecoilValue(authAtom);

  return (
    <>
      <div className='welcome-banner mb-3'>
        <div className='welcome-title mb-3 typewriter'>
          <h1>Welcome, {auth.data.user.full_name}</h1>
        </div>
      </div>
      <Container>
        <Row className='mt-10 p-4 mb-6 justify-content-center text-center'>
          {/* <Col className='col-3'>
            <Card>
              <Card.Title>Connects to MongoDB automatically</Card.Title>
              <Card.Text>
                Upon startup, this appplication connects to an instance of
                MongoDB to store information securely and efficiently.
              </Card.Text>
            </Card>
          </Col> */}
          {/* <Col className='col-3'> */}
          <Card>
            <CardContent>
              <h3>Add your shopify stores</h3>
              <p>Seamlessly add your stores by clicking below.</p>
              <a href='/add-store'>Click here to add stores</a>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3>Sync your products</h3>
              <p>
                Sync your products from your Shopify instance to the database to
                view all your products in one service.
              </p>
            </CardContent>
          </Card>
          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default Home;
