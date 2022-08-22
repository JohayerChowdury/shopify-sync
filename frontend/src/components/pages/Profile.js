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
  // console.log(auth.data);
  // console.log(auth.data.user);
  // console.log(userActions.profile(auth.data.user.token));
  // if(auth.data.user != undefined){
  return (
    <>
    <div className = "profile-page-title">
      Profile
    </div>
    <br />
    &nbsp;
    <Col className="col-6">
      <Card className="flex-fill">
        <Card.Title>
          User ID
        </Card.Title>
        <Card.Subtitle>
          {auth.data.user._id}
        </Card.Subtitle>
      </Card>
      <br />
      <Card className="flex-fill">
        <Card.Title>
          Email
        </Card.Title>
        <Card.Subtitle>
          {auth.data.user.email}
        </Card.Subtitle>
      </Card>
      <br />
    </Col><Col className="col-6">
        <Card className="flex-fill">
          <Card.Title>
            Username
          </Card.Title>
          <Card.Subtitle>
            {auth.data.user.username}
          </Card.Subtitle>
        </Card>
        <br />
        <Card className="flex-fill">
          <Card.Title>
            Full Name
          </Card.Title>
          <Card.Subtitle>
            {auth.data.user.full_name}
          </Card.Subtitle>
        </Card>
        <br />
          <Button href = "/change-password" >
            Change Password
          </Button>

      </Col></>
    
  );
}
// else {
  // return(
  // <div className = "user-info-widget">
  //       <div className = "profile-page-title">
  //         Profile
  //       </div>
  //       <div className = "user-info-detail">
  //         UserID: {auth.data._id}
  //       </div>
  //       <div className = "user-info-detail">
  //         Email : {auth.data.email}
  //       </div>
  //       <div className = "user-info-detail">
  //         Username: {auth.data.username}
  //       </div>
  //       <div className = "user-info-detail">
  //         Full Name: {auth.data.full_name}
  //       </div>
  //       <Button href= "/change-password" style = {{border: "none", outline: 0, display: "inline-block", padding: "8px", color: "white", backgroundColor: "#000", textAlign:"center", cursor: "pointer", width: "100%", fontSize: "18px"}}>
  //         Change Password
  //       </Button>
  //     </div>
  // );

export default Profile;
