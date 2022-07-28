import React, { useEffect, useState } from 'react';
import ErrorMsg from '../ErrorMsg';
import { Button } from 'react-bootstrap';
import './styles.css';

import { authAtom } from '../../states/authStates';
import { useRecoilValue } from 'recoil';
import { history } from '../../helpers/history';
import { useUserActions } from '../../actions/user_actions';

const Login = () => {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  useEffect(() => {
    //redirect to home if already logged in
    if (auth) {
      history.push('/');
    }
  }, []);

  const [user, setUser] = useState({
    // allows for the data to be changed
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents form from being submitted automatically

    try {
      const newUser = {
        //creates new mongodb user
        email: user.email,
        password: user.password,
      };

      return userActions.login(newUser.email, newUser.password).catch((err) => {
        setErrorMsg('apiError', { message: err });
      });
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg) // allows for error message to be displayed
        : setErrorMsg('We have an error!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target; //allows for user to input data
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
        <h1>Log In</h1>
      </div>
      <br />
      {errorMsg && <ErrorMsg msg={errorMsg} />}

      <form onSubmit={handleSubmit}>
        <div class="input">
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            required
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </div>
        <br />

        <div class="input">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </div>
        <br />

        <Button variant="success" type="submit">
          Log In!
        </Button>
      </form>
      <a href="users/forgot_password">Forgot Password?</a>
    </div>
  );
};

export default Login;
