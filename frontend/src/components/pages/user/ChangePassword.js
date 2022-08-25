import React, { useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import axios from 'axios';
import { Container, Button, Row, Form, Col } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../../states';

const ChangePassword = () => {
  const auth = useRecoilValue(authAtom);
  const initialInputUserState = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [inputUser, setInputUser] = useState(initialInputUserState);
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputUser.newPassword != inputUser.newPasswordAgain) {
      setErrorMsg('Passwords must be the same');
      return;
    }

    try {
      const newUser = {
        email: inputUser.email,
        username: inputUser.username,
        password: inputUser.newPassword,
      };
      const updatesUser = await axios.post(
        'http://localhost:5000/shopify_api/users/change_password',
        newUser
      );
      console.log(updatesUser);
      window.location = '/profile';
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg('Please Try Again ');
    }
  };

  const handleInputChange = (field, value) => {
    setInputUser({
      ...inputUser,
      [field]: value,
    });
  };

  return (
    <Container className="mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4">
      <Row className="text-center mt-3 mb-3">
        <h1>Change Password</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              placeholder="Enter email"
              required
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="password"
              required
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="Repeat password"
              required
              onChange={(e) =>
                handleInputChange('confirmPassword', e.target.value)
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3"> {errorMsg && <ErrorMsg msg={errorMsg} />}</Row>
        <Row className="mb-3 justify-content-center">
          <Button variant="primary" type="submit" style={{ width: '75%' }}>
            Confirm
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default ChangePassword;
