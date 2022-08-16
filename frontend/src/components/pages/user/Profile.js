import React, { useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';


const Profile = () => {
  const auth = useRecoilValue(authAtom);

  return (
    <div>
      <Card style = {{width: '18'}}>
        <Card.Title>Profile</Card.Title>
        <ListGroup variant = "flush">
          <ListGroup.Item>User ID: {auth.data.user._id}</ListGroup.Item>
          <ListGroup.Item>Username: {auth.data.user.username}</ListGroup.Item>
          <ListGroup.Item>Email: {auth.data.user.email}</ListGroup.Item>
          <ListGroup.Item>Full Name: {auth.data.user.full_name}</ListGroup.Item>
        </ListGroup>
        <Card.Link href = "/change-password">
          Change Password
        </Card.Link>
      </Card>
    </div>
  );
};
export default Profile;
