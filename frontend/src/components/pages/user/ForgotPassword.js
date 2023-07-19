import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useUserActions } from '../../../actions';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: '',
    newPassword: '',
    newPasswordAgain: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userActions = useUserActions();

  const link = window.location.href;
  var parsedLink = link.split('/');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email: user.email,
        password: user.newPassword,
        link: parsedLink[4],
      };
      const updatesUser = await userActions.forgotPassword(newUser);
      navigate('/login');
    } catch (err) {
      toast.error(`Please try again as the following error occured. ${err}`);
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
    <Container className='mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4'>
      <Row className='text-center mt-3 mb-3'>
        <h1>Register</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              placeholder='Enter email'
              required
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              placeholder='password'
              required
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name='confirmPassword'
              placeholder='password'
              required
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Button variant='primary' type='submit' style={{ width: '75%' }}>
            Change your password
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
