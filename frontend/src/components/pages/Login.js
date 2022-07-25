import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import './styles.css';

const Login = () => {
  const {userData, setUserData } = useContext(UserContext); // gets the context from the app.js file
  let nav = useNavigate();

  const [user, setUser] = useState({ // allows for the data to be changed 
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents form from being submitted automatically

    try {   
      const newUser = { //creates new mongodb user
        email: user.email,
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
        email: "",
        password: "",
      });
      nav('/');




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
    <div className = "form-container">
      <div className = "form-title">
      <h1>Log In</h1>
      </div>
      <br />
      {errorMsg && <ErrorMsg msg={errorMsg} />}

      <form onSubmit={handleSubmit}>
        
        <div class = "input">
        <input
          type="email"
          id = "email"
          name="email"
          value={user.email}
          required
          onChange={handleChange}
          placeholder = "Enter Email"
        />
        </div>
        <br />
        
        <div class = "input">
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder = "Enter Password"
        />
        </div>
        <br />
        
        
        <Button variant="success" type="submit">
          Log In!
        </Button>
      </form>
      <a href = "users/forgot_password">
        Forgot Password?
      </a>
    </div>
    
    


  );
};

export default Login; 