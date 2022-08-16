import React, { useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: '',
    newPassword: '',
    newPasswordAgain: '',
  });
  const link = window.location.href;
  var parsedLink = link.split('/')
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email: user.email,
        password: user.newPassword,
        link: parsedLink[4],
      };
      const updatesUser = await axios.post(
        'http://localhost:5000/shopify_api/users/forgot_password',
        newUser
      );
      window.location = '/login';
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg('Please try again ');
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
    <div className="register-form-container">
      <div className="form-title">
        <h1>Forgot password</h1>
      </div>
      <br />
      {errorMsg && <ErrorMsg msg={errorMsg} />}
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            required
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="password"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        <br />
        <div className="input">
          <input
            type="password"
            name="newPasswordAgain"
            value={user.newPasswordAgain}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>
        <br />
        <Button variant="info" type="submit" style = {{marginLeft: "35%"}}>
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
