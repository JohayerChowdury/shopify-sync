import React, { useState, useContext } from "react";
import { UserContext } from "../App"; 
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { Button } from "react-bootstrap";

const ForgotPassword = () => {
    const{userData, setUserData} = useContext(UserContext);
    const [user, setUser] = useState({
        email: "",
        username: "",
        newPassword: "",
        newPasswordAgain: ""

    });
    const [errorMsg, setErrorMsg] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {
                email: user.email,
                username: user.username,
                password: user.newPassword,
            };
            const updatesUser = await axios.post("http://localhost:5000/shopify_api/users/forgot_password", newUser);
            window.location = "/login";
       
       
        } catch(err) {
            err.response.data.msg
                ?setErrorMsg(err.response.data.msg)
                :setErrorMsg("Please Try Again ");
        }
    };

    const handleChange = (e) => {
        const{name, value} = e.target;
        setUser((oldUser) => {
            return {
            ...oldUser,
            [name]: value,
            };
        });
    };


    return(
        <div className = "form-container">
            <div className = "form-title">
            <h1>
                Forgot Password
            </h1>
            </div>
            <br />
            {errorMsg && <ErrorMsg msg = {errorMsg} />}
            <form onSubmit = {handleSubmit} >
                <div className = "input">
                <input 
                type = "email"
                id = "email"
                name = "email"
                value = {user.email}
                required
                onChange = {handleChange}
                placeholder = "Enter Email"
                />
                </div>
                <br />
                <div className = "input">
                <input
                type="text"
                id = "username"
                name="username"
                value={user.username}
                required
                onChange={handleChange}
                placeholder = "Enter Name"
                 />
                </div>
                <br />
                <div className = "input">
                <input
                type="password"
                name="newPassword"
                value={user.newPassword}
                onChange={handleChange}
                placeholder = "Enter New Password"
                />
                </div>
                <br />
                <div className = "input">
                <input
                type="password"
                name="newPasswordAgain"
                value={user.newPasswordAgain}
                onChange={handleChange}
                placeholder = "Confirm New Password"
                />
                </div>
                <br />
                <Button variant="success" type="submit">
                 Change Password
                </Button>
                </form>

        </div>
    );

};



export default ForgotPassword;