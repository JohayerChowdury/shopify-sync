import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Container as RBContainer,
  Form as RBForm,
  FormGroup as RBFormGroup,
  FormControl,
  Button,
  Row as RBRow,
  Col,
  Nav,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../../../states';
import { useUserActions } from '../../../actions';
import ErrorMsg from '../../UI/ErrorMsg';

const Container = styled(RBContainer)`
  margin-top: 25px;
  margin-bottom: 3px;
  padding: 3px;
  background: white;
  box-shadow: 0px 2px 10px gray;
  width: 50%;
  @media (min-width: 992px) {
    width: 33.33%;
  }
`;

const Row = styled(RBRow)`
  margin-bottom: 3px;
  justify-content: center;
  text-align: center;
`;

const Form = styled(RBForm)`
  justify-content: center;
`;

const FormGroup = styled(RBFormGroup)`
  margin-bottom: 5px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const Login = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  const initialInputUserState = {
    email: '',
    password: '',
  };

  const [inputUser, setInputUser] = useState(initialInputUserState);
  const [errorMsg, setErrorMsg] = useState('');

  const userActions = useUserActions();

  useEffect(() => {
    //redirect to home if already logged in
    if (auth) {
      navigate('/');
    }
  }, []);
  //add auth in what needs to be changed in useEffect?

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
      password: inputUser.password,
    };

    userActions
      .login(user, '/login')
      .then((res) => {
        setErrorMsg(null);
        setInputUser({
          email: res.email,
          password: res.password,
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(
          'Email or password is incorrect, please enter valid credentials.'
        );
      });
  };

  return (
    <Container className='rounded'>
      <Form onSubmit={handleSubmit}>
        <Row className='mt-1'>
          <h2>Login</h2>
        </Row>
        <FormGroup controlId='formGridEmail'>
          <FormControl
            type='email'
            placeholder='Enter email'
            required
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='formGridPassword'>
          <FormControl
            type='password'
            placeholder='Enter password'
            required
            onChange={(e) => handleInputChange('password', e.target.value)}
          ></FormControl>
        </FormGroup>
        <Row>
          <Button
            variant='primary'
            type='submit'
            style={{ width: '45%', marginTop: '5px' }}
          >
            Login
          </Button>
        </Row>
        {errorMsg && (
          <Row>
            <ErrorMsg msg={errorMsg} />
          </Row>
        )}
        <RBRow className='mb-3'>
          <Col>
            <Nav className='justify-content-start'>
              <Nav.Link href='/register'>Sign Up</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav className='justify-content-end'>
              <Nav.Link href='/verify-user'>Forgot Password?</Nav.Link>
            </Nav>
          </Col>
        </RBRow>
      </Form>
    </Container>
  );
};

export default Login;
