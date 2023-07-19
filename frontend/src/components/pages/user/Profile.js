import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button, Col, Row as RBRow, Image } from 'react-bootstrap';

// import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useStoreActions } from '../../../actions';

import profilePicture from './anon.jpg';

const Row = styled(RBRow)`
  margin-bottom: 3px;
  justify-content: center;
`;

const Profile = () => {
  const auth = useRecoilValue(authAtom);
  const storeActions = useStoreActions();

  const [numStores, setNumStores] = useState();
  const [uploadProfile, setUploadProfile] = useState();

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

  const handleChange = (e) => {
    console.log(e.target.files);
    setUploadProfile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Container>
      <Row>
        <Col className='mt-5 shadow p-3 mb-3 rounded'>
          <Image
            src={uploadProfile || profilePicture}
            thumbnail
            roundedCircle
          />
          <h3>Add Profile Picture:</h3>
          <input type='file' onChange={handleChange} />
        </Col>
        <Col className='col-2'></Col>
        <Col className='mt-5 shadow p-3 mb-3 rounded justify-content-start text-left text-align-center'>
          <h3 className='text-center mb-3'>User Information</h3>
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
          <p>
            <b>Number of Stores: </b> {numStores}
          </p>
          <Row>
            <Button href='/change-password' style={{ width: '75%' }}>
              Change Password
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;
