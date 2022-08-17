import React, { useState, useEffect } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import { Button } from 'react-bootstrap';
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
    <div className="register-form-container">
      <div className="form-title">
        <h1>Register here</h1>
      </div>
      <br />
      {errorMsg && <ErrorMsg msg={errorMsg} />}

      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="email"
            name="email"
            value={inputUser.email}
            required
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="text"
            name="username"
            value={inputUser.username}
            required
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="text"
            name="full_name"
            value={inputUser.full_name}
            required
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="password"
            name="password"
            value={inputUser.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="password"
            name="confirmPassword"
            value={inputUser.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            placeholder="Confirm password"
          />
        </div>
        <br />
        <Button variant="info" type="submit" style = {{marginLeft: "35%", padding: 10}}>
          Register user
        </Button>
      </form>
    </div>
  );
};

export default Register;
