import React, { useState } from 'react';
import ErrorMsg from '../ErrorMsg';
import { Button } from 'react-bootstrap';

import { userAtom } from '../../states/userStates';
import { authAtom } from '../../states/authStates';
import { useUserActions } from '../../actions/user_actions';
import { history } from '../../helpers/history';
import { useRecoilValue } from 'recoil';

const Register = () => {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  const [user, setUser] = useState({
    // adapts to changing data
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents from being submitted until these actions have been run

    try {
      const newUser = {
        // inputs a new user into the mongoDb base
        email: user.email,
        username: user.username,
        password: user.password,
      };

      if (user.password !== user.confirmPassword) {
        // if the confirmed password is not the same as the initial
        setErrorMsg('Enter the same password twice!');
        return;
      } else {
        console.log(newUser);
      }
      if (
        user.password.length == 0 ||
        user.username.length == 0 ||
        user.confirmPassword.length == 0
      ) {
        setErrorMsg('Please enter in the missing field(s)');
        return;
      } else {
        console.log(newUser);
      }
      await userActions.register(
        newUser.email,
        newUser.username,
        newUser.password
      );
      const loginResponse = await userActions.login(
        newUser.email,
        newUser.password
      ); // gives us the login response so that you don't have to login after registering
      // localStorage.setItem('auth-token', loginResponse.data.token); // gives us an authtoken for private functions

      //window.location = "/"; // redirects back home after signing up
    } catch (err) {
      err.response.data.msg // catches an error with its respective message, if no message than just says we have an error
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg('We have an error!');
    }
  };

  const handleChange = (e) => {
    // this handles the form being changes with its respective inputted value
    const { name, value } = e.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  };

  return (
    <div className="form-container">
      <div className="form-title">
        <h1>Register Here</h1>
      </div>
      <br />
      {errorMsg && <ErrorMsg msg={errorMsg} />}

      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="email"
            name="email"
            value={user.email}
            required
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="text"
            name="username"
            value={user.username}
            required
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
        </div>
        <br />
        <Button variant="success" type="submit">
          Register User!
        </Button>
      </form>
    </div>
  );
};

export default Register;
