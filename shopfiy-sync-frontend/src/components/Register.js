import React, { useState, useContext } from "react";
import { UserContext } from "../App"; 
import ErrorMsg from "./ErrorMsg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const Register = () => {
  const { userData, setUserData } = useContext(UserContext); // this is imported from the context in the app.js file
  let nav = useNavigate();

  const [user, setUser] = useState({ // adapts to changing data
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => { 
    e.preventDefault(); //prevents from being submitted until these actions have been run

    try {
      const newUser = { // inputs a new user into the mongoDb base
        email: user.email,
        username: user.username,
        password: user.password,
      };

      if (user.password !== user.confirmPassword) { // if the confirmed password is not the same as the initial
        setErrorMsg("Enter the same password twice!");
        return;
      } else {
        console.log(newUser);
      }
      if(user.password.length == 0 || user.username.length == 0 || user.confirmPassword.length == 0) {
        setErrorMsg("Please enter in the missing field(s)")
        return;
      } else{
        console.log(newUser);
      }
      await axios.post("/shopify_api/users/register", newUser); //posts this to the register function

      const loginResponse = await axios.post("/shopify_api/users/login", newUser); // gives us the login response so that you don't have to login after registering
      setUserData({ // changes the user's session data to its credentials
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token); // gives us an authtoken for private functions

      setUser({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      nav('/')

      //window.location = "/"; // redirects back home after signing up
    } catch (err) {
      err.response.data.msg // catches an error with its respective message, if no message than just says we have an error
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg("We have an error!");
    }
  };

  const handleChange = (e) => { // this handles the form being changes with its respective inputted value
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
      <h1>Register Here</h1>
      <br/>
      {errorMsg && <ErrorMsg msg={errorMsg} />}

      <form onSubmit={handleSubmit}>
        <label>Email &nbsp;</label>
        <input
        type = "email"
        name = "email"
        value = {user.email}
        required
        onChange = {handleChange}
        />
        <br />
        <label>User Name&nbsp; </label>
        <input
          type="text"
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
        <label>Confirm Password&nbsp; </label>
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <Button variant="primary" type="submit">Register User!</Button>
      </form>
    </div>
  );
};

export default Register;