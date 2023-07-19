import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

import { authAtom } from '../../../states';
import { useUserActions } from '../../../actions';

const VerifyUser = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  const userActions = useUserActions();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, []);
  const initialInputUserState = {
    email: '',
  };
  const [inputUser, setInputUser] = useState(initialInputUserState);

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
    try {
      setLoading(true);
      await userActions.verifyUser(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(`Please try again as the following error occured. ${error}`);
    }
  };
  return (
    <Container className='mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4'>
      <Row className='text-center'>
        <h1>Verify User</h1>
      </Row>
      <br />
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Control
              name='email'
              placeholder='Enter email'
              required
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className='mb-3 justify-content-center'>
          <Button type='submit' variant='primary' style={{ width: '75%' }}>
            Submit Account Email for Verification
          </Button>
        </Row>
        <Row className='mb-3 justify-content-center'>
          <Button
            href='/login'
            variant='secondary'
            type='button'
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
