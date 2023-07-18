import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';
import { Container, Card, Row, Col } from 'react-bootstrap';

function Home() {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom);
  const userActions = useUserActions();

  return (
    <>
      <div className='welcome-banner mb-3'>
        <div className='welcome-title mb-3'>
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
          <Col className='col-3'>
            <Card>
              <Card.Title>Add your shopify stores</Card.Title>
              <Card.Text>
                Seamlessly add your stores by clicking below.
              </Card.Text>
              <Card.Link href='/add-store'>Click here to add stores</Card.Link>
            </Card>
          </Col>
          <Col className='col-3'>
            <Card>
              <Card.Title>Sync your products</Card.Title>
              <Card.Text>
                Sync your products from your Shopify instance to the database to
                view all your products in one service.
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
