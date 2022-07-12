import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { Button } from "react-bootstrap";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [ErrorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {   
      const newUser = {
        username: user.username,
        password: user.password,
      };

      const loginResponse = await axios.post("http://localhost:5000/shopify_api/users/login", newUser);
    //   console.log(loginResponse.data)
      setUserData({ 
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      setUser({
        username: "",
        password: "",
      });

      window.location = "/";
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg("We have an error!");
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
    <div>
      <h1>Log In</h1>
      <br />
      {ErrorMsg && <ErrorMsg msg={ErrorMsg} />}

      <form onSubmit={handleSubmit}>
        <label>User Name&nbsp; </label>
        <input
          type="text"
          id = "username"
          name="username"
          value={user.username}
          required
          onChange={handleChange}
        />
        <br />
        <label>Password&nbsp; </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <Button variant="success" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;