import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';

function Home() {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom);
  const userActions = useUserActions();


  return (
    <div className="welcome-banner">
      <div className="welcome-title">
        <h1>Welcome, {auth.data.user.full_name}</h1>
        <p>
          This is an application that allows users with Shopify stores to easily
          sync their products in MongoDB.
        </p>
        &nbsp;
        <div className="homepage-subheader">
          <h2>How This Product Works</h2>
        </div>
        <div className="row">
          &nbsp;
          <div className="instruction-widget">
            <div className="instruction-header">
              <a href="/stores" type = "info">
                See Your Shopify Stores
              </a>
            </div>
          </div>
          &nbsp;
        </div>
      </div>
    </div>
  );
}

export default Home;
