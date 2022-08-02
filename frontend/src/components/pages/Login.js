import React, { useEffect, useState } from 'react';
import ErrorMsg from '../ErrorMsg';
import { Button } from 'react-bootstrap';
import './styles.css';
import { useNavigate } from 'react-router-dom';

import { authAtom } from '../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../actions/user_actions';

const Login = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    //redirect to home if already logged in
    if (auth) {
      navigate('/');
      // if (location.state?.from) {
      //   navigate(location.state.from);
      // }
    }
  }, []);

  const userActions = useUserActions();

  const initialInputUserState = {
    email: '',
    password: '',
  };

  const [inputUser, setInputUser] = useState(initialInputUserState);
  // const[inputUserErrors, setInputUserErrors] = useState([])
  // const [errorMsg, setErrorMsg] = useState();

  const handleInputChange = (field, value) => {
    setInputUser({
      ...inputUser,
      [field]: value,
    });
    // if(!!inputUserErrors[field]){
    //   setInputUserErrors({
    //     ...inputUserErrors,
    //     [field]:null
    //   })
    // }
  };

  // const findInputUserErrors = ()=>{
  //   const{email, password} = inputUser
  //   const newErrors={}

  // }

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents form from being submitted automatically

    try {
      let user = {
        email: inputUser.email,
        password: inputUser.password,
      };
      // console.log(user);
      userActions
        .login(user, '/login')
        .then((res) => {
          console.log('Login component response: ' + res);
          setInputUser({
            email: res.email,
            password: res.password,
          });
          navigate('/');
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          // setErrorMsg(err);
          // err.response.data.msg
          //   ? setErrorMsg(err.response.data.msg) // allows for error message to be displayed
          //   : setErrorMsg('We have an error!');
        });
    } catch (err) {
      console.log(err);
      // setErrorMsg(err);
      // if (err.response.data.msg) {
      //   setErrorMsg(err.response.data.msg); // allows for error message to be displayed
      // } else {
      //   setErrorMsg(err);
      // }
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">
        <h1>Log In</h1>
      </div>
      <br />
      {/* {errorMsg && <ErrorMsg msg={errorMsg} />} */}

      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="email"
            id="email"
            name="email"
            value={inputUser.email}
            required
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <br />

        <div className="input">
          <input
            type="password"
            name="password"
            value={inputUser.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
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
