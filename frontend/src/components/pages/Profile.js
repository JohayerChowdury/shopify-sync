import React, { useEffect } from 'react';
// import { Button } from 'react-bootstrap';

import { userAtom } from '../../states/userStates';
import { authAtom } from '../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../actions/user_actions';

const Profile = () => {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom);
  const userActions = useUserActions();


  // useEffect(() => {
  //   userActions.profile(auth.data.user.token);
  // }, []);
  // console.log(userActions.profile(auth.data.user.token));
  console.log(auth);
  return (
    <div className = "user-info-widget">
      <div className = "user-info-detail">
        Email : {auth.data.user.email}
      </div>
    </div>
  );
};
export default Profile;
