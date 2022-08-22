import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { userAtom } from '../../../states/userStates';
import { authAtom } from '../../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../../actions/user_actions';
import {Card , Row} from 'react-bootstrap';

function Home() {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom);
  const userActions = useUserActions();


  return (
    <>
    <div className="welcome-banner">
      <div className="welcome-title">
        <h1>Welcome, {auth.data.user.full_name}</h1>
      </div>  
    </div>
    &nbsp;
    <Row className = "mb-3">
    <Card style = {{width: "16rem",marginLeft: "5%"}}>
      <Card.Title>
        Connects to MongoDB automatically
      </Card.Title>
      <Card.Text>
        Upon startup, this app connects to an instance of MongoDB to store information securely and efficiently
      </Card.Text>
      
    </Card>
    <Card style = {{width: "16rem", marginLeft: "5%"}}>
      <Card.Title>
        Add your shopify stores
      </Card.Title>
      <Card.Text>
        Seamlessly add your stores by clicking below
      </Card.Text>
      <Card.Link href = "/add-store">
        Click here to add stores
      </Card.Link>
    </Card>
    <Card style = {{width: "16rem", marginLeft: "5%"}}>
      <Card.Title>
        Sync your products
      </Card.Title>
      <Card.Text>
        Sync your products from your Shopify instance to the database to view all your products in one service
      </Card.Text>
    </Card>
    </Row>
    </>

  );
}

export default Home;
