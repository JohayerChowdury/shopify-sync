import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Col, Row, Image } from 'react-bootstrap';

// import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useStoreActions } from '../../../actions';

import profilePicture from './anon.jpg';

const Profile = () => {
  const auth = useRecoilValue(authAtom);
  const storeActions = useStoreActions();
  const [numStores, setNumStores] = useState();

  useEffect(() => {
    retrieveNumStores();
  }, []);

  const retrieveNumStores = async () => {
    try {
      storeActions
        .getAllCount()
        .then((res) => {
          setNumStores(res.data);
          console.log('numStores in profile: ' + res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <div className="welcome-banner">
        <div className="welcome-title">
          <h1>Welcome, </h1>
        </div>
      </div> */}
      <Container>
        <Row className="justify-content-center">
          <Col className="mt-5 shadow p-3 mb-3 rounded">
            <Image src={profilePicture} thumbnail roundedCircle></Image>
          </Col>
          <Col className="col-2"></Col>
          <Col className="mt-5 shadow p-3 mb-3 rounded justify-content-start text-left">
            <h3 className="text-center mb-3">User Information</h3>
            <p>
              <b>User Id:</b> {auth.data.user._id}
            </p>
            <p>
              <b>Email:</b> {auth.data.user.email}
            </p>
            <p>
              <b>Username:</b> {auth.data.user.username}
            </p>
            <p>
              <b>Full Name: </b>
              {auth.data.user.full_name}
            </p>
            <Row className="justify-content-center">
              <Button href="/change-password" style={{ width: '75%' }}>
                Change Password
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Profile;
