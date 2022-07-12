import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            Home{' '}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="stores" className="nav-link">
                Stores
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
            </li> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
