import React, { useEffect, useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import { Button, Row, Col, Form } from 'react-bootstrap';
import './styles.css';
import { useNavigate } from 'react-router-dom';

import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';

const Login = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    //redirect to home if already logged in
    if (auth) {
      navigate('/');
    }
  }, []);

  const userActions = useUserActions();

  const initialInputUserState = {
    email: '',
    password: '',
  };

  const [inputUser, setInputUser] = useState(initialInputUserState);
  const [errorMsg, setErrorMsg] = useState();

  const handleInputChange = (field, value) => {
    setInputUser({
      ...inputUser,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents form from being submitted automatically


      let user = {
        email: inputUser.email,
        password: inputUser.password,
      };
      userActions
        .login(user, '/login').then((res) => {
          setInputUser({
            email: res.email,
            password: res.password,
          });
          navigate('/');
        })
        .catch(error => {
          setErrorMsg('Email or password is incorrect, please enter valid credentials.');
        });
      

    
  };

  return (
    <div className = "login-form-container">
      <div className = "form-title">
        Login
      </div>
      <Form onSubmit = {handleSubmit}>
        <Row className = "mb-3">
          <Form.Group as = {Col} controlId = "formGridEmail">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control type = "email"  name = "email" placeholder = "Enter email" onChange={(e) => handleInputChange('email', e.target.value)}/>
          </Form.Group>
        </ Row>
        <Row className = "mb-3">
          <Form.Group as = {Col} controlId = "formGridPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type = "password"  name = "password" placeholder = "Enter password" onChange={(e) => handleInputChange('password', e.target.value)}></Form.Control>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          {errorMsg && <ErrorMsg msg = {errorMsg} /> }
        </Row>
        <Row className = "mb-3">
          <Button variant = "primary" type = "submit" style = {{marginLeft: "12%" , width: "25%"}}>
            Login
          </Button>
        </Row>
        <Row className = "mb-3">
          <a href = "/register" style = {{marginLeft: "10%"}}>
            Sign up
          </a>
          <a href = "/verify-user" style = {{marginLeft: "10%"}}>
            Forgot Password?
          </a>
        </Row>
      </Form>
      <br />
    </div>
  );
};

export default Login;
