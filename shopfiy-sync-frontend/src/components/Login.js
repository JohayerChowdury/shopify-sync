import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { Button } from "react-bootstrap";

const Login = () => {
  const {userData, setUserData } = useContext(UserContext); // gets the context from the app.js file

  const [user, setUser] = useState({ // allows for the data to be changed 
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents form from being submitted automatically

    try {   
      const newUser = { //creates new mongodb user
        username: user.username,
        password: user.password,
      };

      const loginResponse = await axios.post("http://localhost:5000/shopify_api/users/login", newUser); // attemps to login
      console.log(loginResponse.data)
      setUserData({  // sends back jwt token and saves it in session data
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      setUser({ //resets the form
        username: "",
        password: "",
      });

      // window.location = "/stores"; //redirects back home
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg) // allows for error message to be displayed
        : setErrorMsg("We have an error!");
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
    <div>
      <h1>Log In</h1>
      <br />
      {errorMsg && <ErrorMsg msg={errorMsg} />}

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
      <a href = "users/forgot_password">
        Forgot Password?
      </a>
    </div>


  );
};

export default Login;