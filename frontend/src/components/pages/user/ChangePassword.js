import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Button, Row, Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';

// import { authAtom } from '../../../states';
import { useUserActions } from '../../../actions';

const ChangePassword = () => {
  const initialInputUserState = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [inputUser, setInputUser] = useState(initialInputUserState);

  const navigate = useNavigate();

  const userActions = useUserActions();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputUser.newPassword !== inputUser.newPasswordAgain) {
      toast.error('Passwords must be the same');
      return;
    }

    try {
      const newUser = {
        email: inputUser.email,
        username: inputUser.username,
        password: inputUser.newPassword,
      };
      await userActions.changePassword(newUser);
      navigate('/profile');
    } catch (err) {
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  };

  const handleInputChange = (field, value) => {
    setInputUser({
      ...inputUser,
      [field]: value,
    });
  };

  return (
    <Container className='mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4'>
      <Row className='text-center mt-3 mb-3'>
        <h1>Change Password</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              placeholder='Enter email'
              required
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder='password'
              required
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formGridConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder='Repeat password'
              required
              onChange={(e) =>
                handleInputChange('confirmPassword', e.target.value)
              }
            />
          </Form.Group>
        </Row>
        <Row className='mb-3 justify-content-center'>
          <Button variant='primary' type='submit' style={{ width: '75%' }}>
            Confirm
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default ChangePassword;
