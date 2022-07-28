import React, { useEffect } from 'react';
// import { Button } from 'react-bootstrap';

import { userAtom } from '../../states/userStates';
import { authAtom } from '../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../actions/user_actions';

const Profile = () => {
  const auth = useRecoilValue(authAtom);
  // const users = useRecoilValue(userAtom);
  const userActions = useUserActions();

  useEffect(() => {
    userActions.getAll();
  }, []);
  return (
    <div>
      <h1>Hello {auth?.username}</h1>
    </div>
  );
};
export default Profile;
