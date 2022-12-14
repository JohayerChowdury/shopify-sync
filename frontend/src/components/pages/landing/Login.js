import React, { useEffect, useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import SuccessMsg from '../../UI/SuccessMsg';
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';

const Login = (props) => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  const initialInputUserState = {
    email: '',
    password: '',
  };

  const [inputUser, setInputUser] = useState(initialInputUserState);
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const userActions = useUserActions();

  useEffect(() => {
    //redirect to home if already logged in
    if (auth) {
      navigate('/');
    }
    if (props.success) {
      console.log(props.success);
      setSuccessMsg(props.success);
    }
  }, []);

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
      .login(user, '/login')
      .then((res) => {
        setInputUser({
          email: res.email,
          password: res.password,
        });
        // navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(
          'Email or password is incorrect, please enter valid credentials.'
        );
      });
  };

  return (
    <Container className="mt-5 shadow p-3 mb-3 bg-white rounded col-xs-6 col-lg-4">
      <Form onSubmit={handleSubmit} className="justify-content-center">
        <Row className="mb-3 text-center">
          <h2>Login</h2>
        </Row>
        <Form.Group className="mb-3 text-center" controlId="formGridEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </Form.Group>
        <Form.Group className="text-center" controlId="formGridPassword">
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => handleInputChange('password', e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className="mb-3 justify-content-center text-center">
          {errorMsg && <ErrorMsg msg={errorMsg} />}
        </Row>
        <Row className="mb-3 justify-content-center text-center">
          {successMsg && <SuccessMsg msg={successMsg} />}
        </Row>
        <Row className="mb-3 justify-content-center">
          <Button variant="primary" type="submit" style={{ width: '95%' }}>
            Login
          </Button>
        </Row>
        {/* <Row className="mb-3">
          <Col className="auto text-right">
            <a href="/register" className="text-left">
              Sign Up
            </a>
          </Col>
          <Col className="auto text-right">
            <a href="/verify-user" className="text-right">
              Forgot Password?
            </a>
          </Col>
        </Row> */}
        {/* <Row className="mb-3">
          <Col className="col-auto justify-content-start">
            <LinkContainer to="/register" className="text-left">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          </Col>
          <Col className="col-auto justify-content-end">
            <LinkContainer to="/verify-user" className="text-right">
              <Nav.Link>Forgot Password?</Nav.Link>
            </LinkContainer>
          </Col> */}
        <Row className="mb-3">
          <Col>
            <Nav className="justify-content-start">
              <Nav.Link href="/register">Sign Up</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav className="justify-content-end">
              <Nav.Link href="/verify-user">Forgot Password?</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
