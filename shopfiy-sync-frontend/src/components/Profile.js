import React , {useContext, useState, useEffect} from "react";
import {UserContext} from "../App";
import {Button} from "react-bootstrap";

const Profile  = () => {
    const {userData, setUserData} = useContext(UserContext);
    return(
        <div>
            <h1>Hello {userData.user.username}</h1>
        </div>
    );
};
export default Profile;