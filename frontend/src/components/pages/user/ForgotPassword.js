import React, { useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import axios from 'axios';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: '',
    newPassword: '',
    newPasswordAgain: '',
  });
  const link = window.location.href;
  var parsedLink = link.split('/');
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email: user.email,
        password: user.newPassword,
        link: parsedLink[4],
      };
      const updatesUser = await axios.post(
        'http://localhost:5000/shopify_api/users/forgot_password',
        newUser
      );
      window.location = '/login';
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg('Please try again ');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  };

  return (
    <Container className="mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4">
      <Row className="text-center mt-3 mb-3">
        <h1>Register</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              placeholder="Enter email"
              required
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              placeholder="password"
              required
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              placeholder="password"
              required
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3"> {errorMsg && <ErrorMsg msg={errorMsg} />}</Row>
        <Row className="mb-3">
          <Button variant="primary" type="submit" style={{ width: '75%' }}>
            Change your password
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
