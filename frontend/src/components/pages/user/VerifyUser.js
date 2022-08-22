import React, { useEffect, useState } from 'react';
import ErrorMsg from '../../UI/ErrorMsg';
import SuccessMsg from '../../UI/SuccessMsg';
import { Button, Form, Col, Row } from 'react-bootstrap';
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
            setSuccessMsg("Please check your email for a verification link")
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
            <Form onSubmit = {handleSubmit}>
                <Row className = "mb-3">
                <Form.Group as = {Col} controlId = "formGridEmail">
                    <Form.Label style = {{marginLeft: "10%"}}>Email</Form.Label>
                    <Form.Control name = "email" placeholder = "Enter email" required style = {{marginLeft: "10%" ,width: "80%"}}/>
                </Form.Group>
                </Row>
                <br />
                <Button type = "submit" variant = "primary" style = {{marginLeft: "10%" ,width: "80%"}} >
                    Submit
                </Button>
            </Form>
        </div>
        

    );

}
export default VerifyUser;