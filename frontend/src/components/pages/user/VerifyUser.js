import React, { useEffect, useState } from 'react';
// import ErrorMsg from '../../UI/ErrorMsg';
// import SuccessMsg from '../../UI/SuccessMsg';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import '../landing/styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';

const VerifyUser = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, []);
  //   const userActions = useUserActions();
  const initialInputUserState = {
    email: '',
  };
  const [inputUser, setInputUser] = useState(initialInputUserState);
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const handleInputChange = (field, value) => {
    setInputUser({
      ...inputUser,
      [field]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      email: inputUser.email,
    };
    const verifyUser = await axios
      .post('http://localhost:5000/shopify_api/users/verify_user', user)
      .then(setSuccessMsg('Please check your email for a verification link'))
      .catch((error) => {
        setErrorMsg('Try a valid email ');
      });
  };
  return (
    <Container className="mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4">
      <Row className="text-center">
        <h1>Verify User</h1>
      </Row>
      <br />
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control
              name="email"
              placeholder="Enter email"
              required
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Button type="submit" variant="primary" style={{ width: '75%' }}>
            Submit Account Email for Verification
          </Button>
        </Row>
        <Row className="mb-3 justify-content-center">
          <Button
            href="/login"
            variant="secondary"
            type="button"
            style={{ width: '75%' }}
          >
            Have an Account? Login
          </Button>
        </Row>
      </Form>
    </Container>
  );
};
export default VerifyUser;
