import React, { useState, useEffect } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import { Button , Form, Col, Row} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import { authAtom } from '../../../states/authStates';
import { useUserActions } from '../../../actions/user_actions';
import { useRecoilValue } from 'recoil';

const Register = () => {
  const auth = useRecoilValue(authAtom);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //redirect to home if already logged in
    if (auth && location.state?.from) {
      navigate(location.state.from);
    }
  }, []);

  const initialInputUserState = {
    username: '',
    full_name: '',
    password: '',
    email: '',
    confirmPassword: '',
  };

  const userActions = useUserActions();
  const [inputUser, setInputUser] = useState(initialInputUserState);
  const [errorMsg, setErrorMsg] = useState();

  const handleInputChange = (field, value) => {
    setInputUser({
      ...inputUser,
      [field]: value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents from being submitted until these actions have been run

        let user = {
          // inputs a new user into the mongoDb base
          email: inputUser.email,
          username: inputUser.username,
          password: inputUser.password,
          full_name: inputUser.full_name,
        };

        if (inputUser.password !== inputUser.confirmPassword) {
          // if the confirmed password is not the same as the initial
          setErrorMsg('Enter the same password twice!');
          return;
        }
        if (
          inputUser.password.length == 0 ||
          inputUser.username.length == 0 ||
          inputUser.confirmPassword.length == 0
        ) {
          setErrorMsg('Please enter in the missing field(s)');
          return;
        };
        console.log(user);
        userActions
        .login(user, '/register').then((res) => {
          setInputUser({
            email: res.email,
            password: res.password,
          }); 
          navigate('/login');

        })
        .catch(error => {
          console.log("hi");
          setErrorMsg('User already exists');
        });

    
    
  };

  return (
    <div className = "register-form-container">
      <div className = "form-title">
        Register
      </div>
      <Form onSubmit = {handleSubmit}>
        <Row className='mb-3'>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name = "email" placeholder="Enter email" />
        </Form.Group>
          <Form.Group as={Col} controlId="formGridFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control  name = "full_name" placeholder="John Doe" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control name = "username" placeholder="JohnShyft" />
        </Form.Group>
        <Row className='mb-3'>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name = "password"  placeholder="password" />
        </Form.Group>
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control  name = "confirm_password" placeholder="password" />
          </Form.Group>
        </Row>
        <br />
        {errorMsg && <ErrorMsg msg={errorMsg} />}

        <Row className = "mb-3">
        
        <Button variant = "primary" type = "submit">
          Register
        </Button>
        </Row>
        <a href = "/login">
          Have an account? Login
        </a>
        <br />
        <br />
        

      </Form>
      
    </div>
  );
};

export default Register;
