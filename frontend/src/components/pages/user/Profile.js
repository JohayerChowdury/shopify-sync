import React from 'react';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';

// import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
// import { useUserActions } from '../../../actions/user_actions';

const Profile = () => {
  const auth = useRecoilValue(authAtom);

  return (
    <Container className="mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4">
      <h1 className="mb-4 text-center">Profile</h1>
      <Card className="flex-fill">
        <Card.Title>User ID</Card.Title>
        <Card.Subtitle className="mt-1">{auth.data.user._id}</Card.Subtitle>
      </Card>
      <br />
      <Card className="flex-fill">
        <Card.Title>Email</Card.Title>
        <Card.Subtitle className="mt-1">{auth.data.user.email}</Card.Subtitle>
      </Card>
      <br />
      <Card className="flex-fill">
        <Card.Title>Username</Card.Title>
        <Card.Subtitle className="mt-1">
          {auth.data.user.username}
        </Card.Subtitle>
      </Card>
      <br />
      <Card className="flex-fill">
        <Card.Title>Full Name</Card.Title>
        <Card.Subtitle className="mt-1">
          {auth.data.user.full_name}
        </Card.Subtitle>
      </Card>
      <br />
      <Row className="justify-content-center">
        <Button href="/change-password">Change Password</Button>
      </Row>
    </Container>
  );
};
export default Profile;
