import React, { useEffect, useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import SuccessMsg from '../../UI/SuccessMsg';
import { Button } from 'react-bootstrap';
import '../landing/styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';

const VerifyUser = () => {
    const navigate = useNavigate();
    const auth = useRecoilValue(authAtom);

    useEffect(() => {
        if(auth) {
            navigate('/');

        }
    } , []);
    const userActions = useUserActions();
    const initialInputUserState = {
        email: '',
    };
    const [inputUser, setInputUser] = useState(initialInputUserState);
    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();

    const handleInputChange = (field,value) => {
        setInputUser({
            ...inputUser,
            [field]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            email: inputUser.email,
        };
        const verifyUser = await axios
        .post('http://localhost:5000/shopify_api/users/verify_user', 
        user)
        .then(
            setSuccessMsg("Please Check Your Email")
        )
        .catch(error => {
            setErrorMsg("Try a valid email ");
        });
    };
    return(
        <div className = "login-form-container">
            <div className = "form-title">
                <h1>Verify User</h1>
            </div>
            <br />
            {errorMsg && <ErrorMsg msg = {errorMsg} /> }
            {successMsg && <SuccessMsg msg = {successMsg} />}
            <form onSubmit = {handleSubmit}>
                <div className = "input">
                    <input
                    type = "email"
                    id = "email"
                    name = "email"
                    value = {inputUser.email}
                    required
                    onChange = {(e) => handleInputChange('email', e.target.value)}
                    placeholder = "Enter Email"
                    />
                    <Button variant = "info" type = "submit" style = {{marginLeft: "38%"}}>
                       Submit 
                    </Button>
                </div>
            </form>
        </div>
        

    );

}
export default VerifyUser;