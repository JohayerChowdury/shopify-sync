import React, { useEffect } from 'react';
// import { Button } from 'react-bootstrap';

import { userAtom } from '../../states/userStates';
import { authAtom } from '../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../actions/user_actions';
import { Button } from 'react-bootstrap';

const Profile = () => {
  


  // useEffect(() => {
  //   userActions.profile();
  // }, []);
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom);
  const userActions = useUserActions();
  // console.log(userActions.profile(auth.data.user.token));
  return (
      <div className = "user-info-widget">
        <div className = "profile-page-title">
          Profile
        </div>
        <div className = "user-info-detail">
          UserID: {auth.data.user._id}
        </div>
        <div className = "user-info-detail">
          Email : {auth.data.user.email}
        </div>
        <div className = "user-info-detail">
          Username: {auth.data.user.username}
        </div>
        <div className = "user-info-detail">
          Full Name: {auth.data.user.full_name}
        </div>
        <Button href= "/change-password" style = {{border: "none", outline: 0, display: "inline-block", padding: "8px", color: "white", backgroundColor: "#000", textAlign:"center", cursor: "pointer", width: "100%", fontSize: "18px"}}>
          Change Password
        </Button>
      </div>
    
  );
};
export default Profile;
