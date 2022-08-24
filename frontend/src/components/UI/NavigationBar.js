import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { authAtom } from '../../states/authStates';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../../actions/user_actions';

const Navigation = () => {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shopify Sync</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {auth ? ( //This is what pops up when the user is logged in
              <Nav className="ml-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/stores">
                  <Nav.Link>Stores</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer to="/database">
                  <Nav.Link>Database</Nav.Link>
                </LinkContainer> */}
                <LinkContainer to="/login">
                  <Nav.Link onClick={userActions.logout}>Logout</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              // when the user isn't logged in
              <Nav className="ml-auto"></Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
