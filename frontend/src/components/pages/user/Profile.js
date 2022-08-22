import React, { useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';

import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';


const Profile = () => {
  const auth = useRecoilValue(authAtom);

  return (
    <>
    <div className = "profile-page-title">
      Profile
    </div>
    <br />
    &nbsp;
    <Col className="col-6">
      <Card className="flex-fill">
        <Card.Title>
          User ID
        </Card.Title>
        <Card.Subtitle>
          {auth.data.user._id}
        </Card.Subtitle>
      </Card>
      <br />
      <Card className="flex-fill">
        <Card.Title>
          Email
        </Card.Title>
        <Card.Subtitle>
          {auth.data.user.email}
        </Card.Subtitle>
      </Card>
      <br />
    </Col><Col className="col-6">
        <Card className="flex-fill">
          <Card.Title>
            Username
          </Card.Title>
          <Card.Subtitle>
            {auth.data.user.username}
          </Card.Subtitle>
        </Card>
        <br />
        <Card className="flex-fill">
          <Card.Title>
            Full Name
          </Card.Title>
          <Card.Subtitle>
            {auth.data.user.full_name}
          </Card.Subtitle>
        </Card>
        <br />
          <Button href = "/change-password" >
            Change Password
          </Button>

      </Col></>
  );
};
export default Profile;
